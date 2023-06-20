import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { outputFile, remove } from 'fs-extra';
import { Readable } from 'stream';

@Injectable()
export class StorageService {
  constructor() {}

  async save(file: Express.Multer.File, path: string) {
    const location = `storage/${path}`;

    // Store to local file system
    await outputFile(location, file.buffer);
  }

  async get(path: string): Promise<Readable> {
    const fileReadable = createReadStream(`storage/${path}`);
    return fileReadable;
  }

  async delete(path: string) {
    // Delete from local file system
    await remove(`storage/${path}`);
  }
}
