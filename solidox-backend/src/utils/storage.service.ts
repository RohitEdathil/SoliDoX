import { Injectable } from '@nestjs/common';
import { outputFile } from 'fs-extra';

@Injectable()
export class StorageService {
  constructor() {}

  async save(file: Express.Multer.File, path: string) {
    const location = `storage/${path}`;

    // Store to local file system
    await outputFile(location, file.buffer);
  }
}
