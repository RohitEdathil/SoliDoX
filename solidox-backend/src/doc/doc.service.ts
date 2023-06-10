import {
  BadRequestException,
  Injectable,
  NotFoundException,
  StreamableFile,
  UnauthorizedException,
} from '@nestjs/common';
import { db } from 'src/utils/db.instance';
import { ConfigService } from '@nestjs/config';
import { verifyMessage } from 'ethers';
import { success } from 'src/utils/responses';
import { JwtService } from '@nestjs/jwt';
import { StorageService } from 'src/utils/storage.service';
import { randomString } from 'src/utils/functions';
import { Readable } from 'stream';
import { Document } from '@prisma/client';

@Injectable()
export class DocService {
  constructor(private storageService: StorageService) {}

  async issue(
    expiryDate: string,
    doc: Express.Multer.File,
    orgId: string,
    sdxId: string,
  ) {
    // Ensure doc is not empty
    if (!doc) {
      throw new BadRequestException('No document provided');
    }

    // Fetch the org from the database
    const org = await db.organization.findFirst({
      where: {
        id: orgId,
      },
    });

    // Check if the org exists
    if (!org) {
      throw new NotFoundException('Invalid organization');
    }

    const fileSize = doc.size;

    // Check if the org has enough storage available
    if (org.usedStorage + fileSize > org.availableStorage) {
      throw new UnauthorizedException('Not enough storage available');
    }

    // Update the used storage
    await db.organization.update({
      where: {
        id: orgId,
      },
      data: {
        usedStorage: {
          increment: fileSize,
        },
      },
    });

    const path = `${orgId}/${Date.now()}-${doc.originalname}`;
    // Save the file
    await this.storageService.save(doc, path);

    // Create the doc
    const newDoc = await db.document.create({
      data: {
        validTill: new Date(expiryDate),
        localPath: path,
        issuedOn: new Date(),
        name: doc.originalname,
        secret: randomString(10),
        fileSize,
        sdxId,
        issuedBy: {
          connect: {
            id: orgId,
          },
        },
      },
    });

    return {
      ...success('Document issued successfully'),
      data: {
        id: newDoc.id,
      },
    };
  }

  async downloadSdx(id: string) {
    id = id.split('.')[0];

    // Fetch doc
    const doc = await db.document.findFirst({
      where: {
        id,
      },
    });

    // Ensure doc exists
    if (!doc) {
      throw new NotFoundException('Invalid document');
    }

    const sdxFile = new Readable();
    sdxFile.push(
      JSON.stringify({
        sdxId: doc.sdxId,
        secret: doc.secret,
        name: doc.name,
        validTill: doc.validTill,
        issuedOn: doc.issuedOn,
      }),
    );

    sdxFile.push(null);

    return {
      name: doc.name,
      file: sdxFile,
    };
  }
  async downloadFile(id: string) {
    id = id.split('.')[0];

    // Fetch doc
    const doc = await db.document.findFirst({
      where: {
        id,
      },
    });

    // Ensure doc exists
    if (!doc) {
      throw new NotFoundException('Invalid document');
    }

    const file = await this.storageService.get(doc.localPath);

    return {
      name: doc.name,
      file,
    };
  }

  async list(orgId: string) {
    // Fetch the org from the database
    const org = await db.organization.findFirst({
      where: {
        id: orgId,
      },
    });

    // Check if the org exists
    if (!org) {
      throw new NotFoundException('Invalid organization');
    }

    // Fetch the docs
    const docs = await db.document.findMany({
      where: {
        issuedBy: {
          id: orgId,
        },
      },
      select: {
        id: true,
        sdxId: true,
        name: true,
        issuedOn: true,
        validTill: true,
        fileSize: true,
      },
    });

    return {
      ...success('Documents fetched successfully'),
      data: docs,
    };
  }
}
