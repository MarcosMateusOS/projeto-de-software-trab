import { ApiProperty } from "@nestjs/swagger";

import { IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  nm_user: string;
  @ApiProperty()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  type: string;
  @ApiProperty()
  @IsNotEmpty()
  registration: string;
}
