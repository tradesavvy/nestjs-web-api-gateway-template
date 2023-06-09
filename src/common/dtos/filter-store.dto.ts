import { IsString } from 'class-validator';
export class FilterStoreDTO {
  @IsString()
  search?: string;
  @IsString()
  name?: string;
}
