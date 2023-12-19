import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document } from 'mongoose';
import { Subject } from '../../src/subjects.module/subjects.schema';
import { IQuestions } from './dto/questions.interface';

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Subject })
  @Type(() => Subject)
  subject: Subject;

  @Prop({ required: true })
  questions: IQuestions[];

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
