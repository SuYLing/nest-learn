import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  uploadFile(
    @UploadedFiles() files: Express.Multer.File,
    @Body() body: unknown,
  ) {
    console.log('body', body) // 其它参数该怎么拿怎么拿
    console.log('file', files)
  }

  @Post('/uploads')
  @UseInterceptors(
    FilesInterceptor('file', 4, {
      dest: 'uploads',
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: unknown,
  ) {
    console.log('body', body) // 其它参数该怎么拿怎么拿
    console.log('file', files)
  }

  @Post('/uploadfields')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'aaa', maxCount: 2 },
        { name: 'bbb', maxCount: 3 },
      ],
      {
        dest: 'uploads',
      },
    ),
  )
  uploadFileFields(
    @UploadedFiles()
    files: { aaa?: Express.Multer.File[]; bbb?: Express.Multer.File[] },
    @Body() body,
  ) {
    console.log('body', body)
    console.log('files', files)
  }

  @Post('uploadAny')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads',
    }),
  )
  uploadAnyFiles(@UploadedFiles() files: Express.Multer.File[], @Body() body) {
    console.log('body', body)
    console.log('files', files)
  }
}
