import { IsString } from 'class-validator';
export class FilterQuestDTO {
  @IsString()
  search?: string;
  @IsString()
  name?: string;
  username: string;
}
