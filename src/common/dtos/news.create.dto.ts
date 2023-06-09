import { IsString } from 'class-validator';
export class CreateGameNewsDTO {
  id: string;
  @IsString()
  title?: string;
  @IsString()
  link?: string;
  @IsString()
  text?: string;
  @IsString()
  imageUrl?: string;
}
