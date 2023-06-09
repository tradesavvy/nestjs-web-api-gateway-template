import { IsString } from 'class-validator';
export class CreateGameAdvertismentDTO {
  id: string;
  @IsString()
  title?: string;
  @IsString()
  url?: string;
  @IsString()
  description?: string;
  @IsString()
  actionUrl?: string;
}
