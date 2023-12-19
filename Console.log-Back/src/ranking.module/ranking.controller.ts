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
import { RankingDto } from './dto/ranking.dto';
import { Ranking } from './ranking.schema';
import { RankingService } from './ranking.service';

@Controller()
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Post('ranking')
  async store(@Body() ranking: RankingDto): Promise<Ranking | HttpException> {
    try {
      const result = await this.rankingService.store(ranking);

      if (result instanceof Error) {
        throw new Error(
          'O correu um erro ao enviar sua resposta.Tente mais tarde.',
        );
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

  @Get('ranking/:id')
  async list(@Param('id') id: string): Promise<Ranking[] | HttpException> {
    try {
      const result = await this.rankingService.list(id);

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
