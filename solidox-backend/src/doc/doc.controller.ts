import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateDocDto, DownloadSdxDto } from './doc.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocService } from './doc.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ExtendedRequest } from 'src/utils/extensions';
import { Response } from 'express';

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

  @Get('sdxFile/:id')
  @UseGuards(AuthGuard)
  async downloadSdxFile(@Param() data: DownloadSdxDto, @Res() res: Response) {
    const result = await this.docService.downloadSdxFile(data.id);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + result.name + '.sdx.id',
    );
    result.file.pipe(res);
  }

  @Get()
  @UseGuards(AuthGuard)
  async list(@Req() req: ExtendedRequest) {
    return this.docService.list(req.orgId);
  }
}
