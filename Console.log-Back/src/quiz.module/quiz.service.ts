import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Quiz, QuizDocument } from './quiz.schema';
import { QuizCreateDto } from './dto/quiz-create.dto';
import {
  Subject,
  SubjectDocument,
} from '../../src/subjects.module/subjects.schema';
@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name)
    private quizModel: Model<QuizDocument>,
    @InjectModel(Subject.name)
    private subjectModel: Model<SubjectDocument>,
  ) {}

  async store(quizDto: QuizCreateDto): Promise<Quiz | Error> {
    try {
      const { title, questions, subject } = quizDto;

      const searchSubject = await this.subjectModel.findById(subject);
      const createdQuiz = new this.quizModel({
        title,
        questions,
        subject: searchSubject,
      });
      return createdQuiz.save();
    } catch (error) {
      return error;
    }
  }

  async list(filter: any): Promise<Quiz[] | Error> {
    try {
      const { subject } = filter;

      const query = this.quizModel.find();
      let result = [];
      if (subject) {
        query.where('subject._id').equals(subject);
        result = await query.exec();
      }

      return result;
    } catch (error) {
      return error;
    }
  }

  async show(id: string): Promise<Quiz | Error> {
    try {
      const query = this.quizModel.findById(id).exec();

      return query;
    } catch (error) {
      return error;
    }
  }
}
