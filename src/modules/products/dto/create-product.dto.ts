import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @Length(10, 50)
  description: string;
}
