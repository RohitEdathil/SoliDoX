import { Injectable } from '@angular/core';
import { NotifService } from '../notif/notif.service';
import { UserService } from '../user/user.service';
import { Contract } from 'ethers';
import { sdxAbi, sdxAddress } from './doc.contract';
import { ethers } from 'ethers';
import { ApiService } from '../api/api.service';
@Injectable({
  providedIn: 'root',
})
export class DocService {
  constructor(
    private notifService: NotifService,
    private userService: UserService,
    private apiService: ApiService
  ) {}
  async issue(file: File, expiryDate: Date | null) {
    this.notifService.start('Issuing document');

    const sdx = new Contract(sdxAddress, sdxAbi, this.userService.signer);

    const expiryTimeStamp = expiryDate?.getTime();
    const hash = ethers.utils.hashMessage(await file.text());
    const timestamp = Date.now();
    const data = hash + (expiryTimeStamp == null ? '' : '-' + expiryTimeStamp);

    // @ts-ignore
    const result = await sdx.issueDocument(data, timestamp);
    await result.wait();

    const formData = new FormData();
    formData.append('doc', file);
    formData.append('sdxId', timestamp.toString());

    if (expiryDate)
      formData.append('expiryDate', expiryDate?.toISOString() ?? '');

    await this.apiService.postFormData('/doc', formData);

    this.notifService.end('Document issued');
  }
}
