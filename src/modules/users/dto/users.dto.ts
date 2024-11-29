import {
  IsEmail,
  IsString,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  firstName?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  lastName?: string;

  @IsString()
  @IsOptional()
  @Length(1, 20)
  @Matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, {
    message: 'Phone number is not valid',
  })
  phoneNumber?: string;

  @IsString()
  @Length(8, 255)
  password: string;
}
