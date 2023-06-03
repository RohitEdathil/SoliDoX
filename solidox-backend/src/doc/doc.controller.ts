import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateDocDto } from './doc.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocService } from './doc.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ExtendedRequest } from 'src/utils/extensions';
@Controller('doc')
export class DocController {
  constructor(private docService: DocService) {}

  @Post()
  @UseInterceptors(FileInterceptor('doc'))
  @UseGuards(AuthGuard)
  async issue(
    @UploadedFile() doc: Express.Multer.File,
    @Body() createDocDto: CreateDocDto,
    @Req() req: ExtendedRequest,
  ) {
    return this.docService.issue(
      createDocDto.expiryDate,
      doc,
      req.orgId,
      createDocDto.sdxId,
    );
  }
}
