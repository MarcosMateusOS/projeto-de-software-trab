import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { SaveDTO } from './dto/save.dto';
import { UserCreateDto } from './dto/userCreate.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async store(@Body() usersDto: UserCreateDto): Promise<User | HttpException> {
    try {
      const result = await this.userService.store(usersDto);

      if (result instanceof Error) {
        throw new Error('O correu ao criar um usuario.');
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

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(authCredentialsDto);
  }

  @Post('/save/:id')
  saveQuiz(
    @Param('id') id: string,
    @Body() data: SaveDTO,
  ): Promise<true | Error> {
    const { id_quiz } = data;

    return this.userService.save(id, id_quiz);
  }

  @Get('/save/:id')
  saveList(@Param('id') id: string): Promise<true | Error> {
    return this.userService.saveList(id.toString());
  }
}
