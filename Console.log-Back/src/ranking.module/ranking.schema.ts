import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Quiz } from '../../src/quiz.module/quiz.schema';
import { User } from '../../src/user.modules/user.schema';
import { Type } from 'class-transformer';

export type RankingDocument = Ranking & Document;

@Schema()
export class Ranking {
  @Prop({ required: true })
  points: number;

  @Prop({ required: true })
  user: string;

  @Prop({ type: Quiz, required: true })
  @Type(() => Quiz)
  quiz: Quiz;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const RankingSchema = SchemaFactory.createForClass(Ranking);
