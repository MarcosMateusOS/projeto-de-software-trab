import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Subject,
  SubjectSchema,
} from '../../src/subjects.module/subjects.schema';
import { QuizController } from './quiz.controller';
import { Quiz, QuizSchema } from './quiz.schema';
import { QuizService } from './quiz.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: Subject.name, schema: SubjectSchema },
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModules {}
