export class Doc {
  constructor(
    public name: string,
    public id: string,
    public sdxId: string,
    public issuedOn: string,
    public validTill: string,
    public fileSize: number,
    public isValid?: Promise<string>
  ) {}

  static fromJson(json: any): Doc {
    return new Doc(
      json.name,
      json.id,
      json.sdxId,
      json.issuedOn,
      json.validTill,
      json.fileSize,
      json.validity
    );
  }
}
