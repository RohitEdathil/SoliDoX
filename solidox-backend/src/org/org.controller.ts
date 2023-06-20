import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrgService } from './org.service';

@Controller('org')
export class OrgController {
  constructor(private orgService: OrgService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  async get(@Param('id') id: string) {
    return await this.orgService.get(id);
  }
}
