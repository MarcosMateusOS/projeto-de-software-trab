import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from '../../src/quiz.module/quiz.schema';
import { User, UserDocument } from '../../src/user.modules/user.schema';
import { RankingDto } from './dto/ranking.dto';

import { Ranking, RankingDocument } from './ranking.schema';

@Injectable()
export class RankingService {
  constructor(
    @InjectModel(Ranking.name)
    private rankingModel: Model<RankingDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Quiz.name)
    private quizModel: Model<QuizDocument>,
  ) {}

  async store(ranking: RankingDto): Promise<Ranking> {
    try {
      const userSubject = await this.userModel.findById(ranking.id_user);

      const quizSubject = await this.quizModel.findById(ranking.id_quiz);

      const createRanking = new this.rankingModel({
        quiz: quizSubject,
        user: userSubject.nm_user,
        points: ranking.points,
      });

      return createRanking.save({ validateBeforeSave: false });
    } catch (error) {
      return error;
    }
  }

  async list(id: string): Promise<Ranking[]> {
    try {
      const query = this.rankingModel.where('quiz._id').equals(id);
      let result = [];

      query.sort({ points: -1 });
      result = await query.exec();

      return result;
    } catch (error) {
      return error;
    }
  }
}
