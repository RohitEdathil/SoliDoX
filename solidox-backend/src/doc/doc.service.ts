import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { db } from 'src/utils/db.instance';
import { ConfigService } from '@nestjs/config';
import { verifyMessage } from 'ethers';
import { success } from 'src/utils/responses';
import { JwtService } from '@nestjs/jwt';
import { StorageService } from 'src/utils/storage.service';

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
}
