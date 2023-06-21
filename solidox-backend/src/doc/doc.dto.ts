import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateDocDto {
  expiryDate: string;
  @IsNotEmpty()
  sdxId: string;
}

export class DownloadSdxDto {
  @IsMongoId()
  id: string;
}

export class VerifyDto {
  @IsNotEmpty()
  sdxId: string;
  @IsNotEmpty()
  secret: string;
}
