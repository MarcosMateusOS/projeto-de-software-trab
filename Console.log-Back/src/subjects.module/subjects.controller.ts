import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';

import { Subject } from './subjects.schema';
import { SubjectService } from './subjects.service';

@Controller()
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get('subjects')
  async list(): Promise<Subject[] | HttpException> {
    try {
      const result = await this.subjectService.list();

      if (result instanceof Error) {
        throw new Error('O correu na listagem.');
      }

      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
