import { IsMongoId } from 'class-validator';

export class CreateDocDto {
  expiryDate: string;
  sdxId: string;
}

export class DownloadSdxDto {
  @IsMongoId()
  id: string;
}
