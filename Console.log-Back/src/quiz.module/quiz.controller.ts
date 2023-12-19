import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { QuizCreateDto } from './dto/quiz-create.dto';
import { Quiz } from './quiz.schema';
import { QuizService } from './quiz.service';

@Controller()
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('quiz')
  async store(@Body() quizDto: QuizCreateDto): Promise<Quiz | HttpException> {
    try {
      const result = await this.quizService.store(quizDto);

      if (result instanceof Error) {
        throw new Error('O correu um quiz de pedidos.');
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

  @Get('quiz')
  async list(@Query() filterDto: any): Promise<Quiz[] | HttpException> {
    try {
      const result = await this.quizService.list(filterDto);

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

  @Get('/quiz/:id')
  async show(@Param('id') id: string): Promise<Quiz | HttpException> {
    try {
      const result = await this.quizService.show(id);

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
