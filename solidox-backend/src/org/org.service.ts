import { Injectable } from '@nestjs/common';
import { db } from 'src/utils/db.instance';
import { success } from 'src/utils/responses';

@Injectable()
export class OrgService {
  async get(id: string): Promise<any> {
    // Fetch org from database
    const org = await db.organization.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        address: true,
        availableStorage: true,
        usedStorage: true,
      },
    });

    // Ensure org exists
    if (!org) {
      throw new Error('Org not found');
    }

    return {
      ...success('Oranization fetched successfully'),
      data: org,
    };
  }
}
