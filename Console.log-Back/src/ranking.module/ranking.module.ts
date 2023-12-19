import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizSchema, Quiz } from '../../src/quiz.module/quiz.schema';
import { UserSchema, User } from '../../src/user.modules/user.schema';
import { RankingController } from './ranking.controller';
import { Ranking, RankingSchema } from './ranking.schema';
import { RankingService } from './ranking.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ranking.name, schema: RankingSchema },
      { name: User.name, schema: UserSchema },
      { name: Quiz.name, schema: QuizSchema },
    ]),
  ],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModules {}
