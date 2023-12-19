import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreateDto } from './dto/userCreate.dto';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Quiz, QuizDocument } from '../../src/quiz.module/quiz.schema';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Quiz.name)
    private quizModel: Model<QuizDocument>,
    private jwtService: JwtService,
  ) {}

  async store(userDto: UserCreateDto): Promise<User | Error> {
    try {
      const { password } = userDto;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const createdUser = new this.userModel({
        ...userDto,
        password: hashedPassword,
      });
      return createdUser.save();
    } catch (error) {
      return error;
    }
  }

  async signIn(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialDto;

    const user = await this.userModel
      .findOne()
      .where('email')
      .equals(email)
      .exec();

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };

      const accessToken: string = await this.jwtService.sign(payload);

      const userReturn = {
        id: user._id,
        nm_user: user.nm_user,
        email: user.email,
        type: user.type,
        accessToken,
        profile_picture: user.profile_picture,
        saved_quizes: user.saved_quizes,
      };
      return userReturn;
    } else {
      throw new UnauthorizedException('Please chacke your login credentials');
    }
  }

  async save(id: string, id_quiz: string): Promise<true | Error> {
    try {
      const quiz = await this.quizModel.findById(id_quiz);
      const user = await this.userModel.findByIdAndUpdate(
        id,
        {
          $push: {
            saved_quizes: quiz,
          },
        },
        { new: true, useFindAndModify: false },
      );

      return true;
    } catch (error) {
      return error;
    }
  }

  async saveList(id: string): Promise<any | Error> {
    try {
      const user = await this.userModel
        .findOne({ _id: id })
        .populate('saved_quizes')
        .exec();

      return user;
    } catch (error) {
      return error;
    }
  }
}
