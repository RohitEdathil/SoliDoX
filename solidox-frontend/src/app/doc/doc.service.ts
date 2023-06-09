import { Injectable } from '@angular/core';
import { NotifService } from '../notif/notif.service';
import { UserService } from '../user/user.service';
import { Contract } from 'ethers';
import { sdxAbi, sdxAddress } from './doc.contract';
import { ethers } from 'ethers';
import { ApiService } from '../api/api.service';
import { Doc } from './doc.model';
@Injectable({
  providedIn: 'root',
})
export class DocService {
  sdx: Contract;
  constructor(
    private notifService: NotifService,
    private userService: UserService,
    private apiService: ApiService
  ) {
    this.sdx = new Contract(sdxAddress, sdxAbi, this.userService.signer);
  }
  async issue(file: File, expiryDate: Date | null) {
    this.notifService.start('Issuing document');

    const expiryTimeStamp = expiryDate?.getTime();
    const hash = ethers.utils.hashMessage(await file.text());
    const timestamp = Date.now();
    const data = hash + (expiryTimeStamp == null ? '' : '-' + expiryTimeStamp);

    // @ts-ignore
    const result = await this.sdx.issueDocument(data, timestamp);
    await result.wait();

    const formData = new FormData();
    formData.append('doc', file);
    formData.append('sdxId', timestamp.toString());

    if (expiryDate)
      formData.append('expiryDate', expiryDate?.toISOString() ?? '');

    const response = await this.apiService.postFormData('/doc', formData);

    this.notifService.end('Document issued');

    return response.data.id;
  }

  async verify(sdxFile: File | null) {
    if (!sdxFile) {
      this.notifService.error('Please select an SDX file');
      return;
    }

    this.notifService.start('Checking');

    const content = JSON.parse(await sdxFile.text());

    const sdxId = content.sdxId;
    const secret = content.secret;

    const serverResult = await this.apiService.post('/doc/verify', {
      sdxId,
      secret,
    });
    const validity = await this.getValidity(sdxId);

    this.notifService.end('Ready');

    return {
      doc: Doc.fromJson(serverResult.data),
      validity,
      orgName: serverResult.data.issuerName,
    };
  }

  async list() {
    const docsData = await this.apiService.get('/doc');
    const docs = docsData.data.map((docData: any) => {
      const doc = Doc.fromJson(docData);
      doc.isValid = this.getValidity(doc.sdxId);
      return doc;
    });
    return docs;
  }

  async getValidity(sdxId: string): Promise<string> {
    let validity = 'invalid';
    try {
      // @ts-ignore
      const result = await this.sdx.getDocumentData(sdxId);
      const [_, expiryTimeStamp] = result.split('-');

      validity =
        expiryTimeStamp == undefined
          ? 'valid'
          : parseInt(expiryTimeStamp) > Date.now()
          ? 'valid'
          : 'expired';
    } catch (e) {}
    return validity;
  }

  getDownloadSdxUrl(id: string) {
    return `${this.apiService.baseUrl}/doc/sdx/${id}?access_token=${this.apiService.token}`;
  }

  getDownloadFileUrl(id: string) {
    return `${this.apiService.baseUrl}/doc/file/${id}?access_token=${this.apiService.token}`;
  }

  async invalidate(doc: Doc) {
    this.notifService.start('Invalidating');

    // @ts-ignore
    const result = await this.sdx.revokeDocument(doc.sdxId);
    await result.wait();

    this.notifService.end('Invalidated');
  }

  async delete(doc: Doc) {
    this.notifService.start('Deleting');

    await this.apiService.delete(`/doc/${doc.id}`);

    this.notifService.end('Deleted');
  }
}
