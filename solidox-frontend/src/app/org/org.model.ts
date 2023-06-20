export class Org {
  constructor(
    public id: string,
    public name: string,
    public address: string,
    public usedStorage: number,
    public availableStorage: number
  ) {}

  static fromJson(json: any): Org {
    return new Org(
      json.id,
      json.name,
      json.address,
      json.usedStorage,
      json.availableStorage
    );
  }
}
