import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Subject, SubjectDocument } from './subjects.schema';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name)
    private subjectModel: Model<SubjectDocument>,
  ) {}

  async list(): Promise<Subject[] | Error> {
    try {
      const subjects = await this.subjectModel.find().exec();
      return subjects;
    } catch (error) {
      return error;
    }
  }
}
