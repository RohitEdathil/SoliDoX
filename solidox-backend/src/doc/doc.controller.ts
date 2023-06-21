import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateDocDto, DownloadSdxDto, VerifyDto } from './doc.dto';
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

  @Get('sdx/:id')
  @UseGuards(AuthGuard)
  async downloadSdx(@Param() data: DownloadSdxDto, @Res() res: Response) {
    const result = await this.docService.downloadSdx(data.id);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + result.name + '.sdx.id',
    );
    result.file.pipe(res);
  }

  @Get('file/:id')
  @UseGuards(AuthGuard)
  async downloadFile(@Param() data: DownloadSdxDto, @Res() res: Response) {
    const result = await this.docService.downloadFile(data.id);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=' + result.name);
    result.file.pipe(res);
  }

  @Get()
  @UseGuards(AuthGuard)
  async list(@Req() req: ExtendedRequest) {
    return this.docService.list(req.orgId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string, @Req() req: ExtendedRequest) {
    return this.docService.delete(id);
  }

  @Post('verify')
  async verify(@Body() data: VerifyDto) {
    return this.docService.verify(data.sdxId, data.secret);
  }
}
