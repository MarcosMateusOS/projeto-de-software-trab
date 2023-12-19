import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Quiz } from '../../src/quiz.module/quiz.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  nm_user: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, unique: true })
  registration: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: Quiz.name,
  })
  @Type(() => Quiz)
  saved_quizes: Quiz[];

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;

  @Prop({ required: false })
  profile_picture: Buffer;
}

export const UserSchema = SchemaFactory.createForClass(User);
