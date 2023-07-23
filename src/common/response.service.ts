import { HttpStatus } from '@nestjs/common';
import { ResponseDto } from './dtos/response.dto';

export const handleSuccessResponse = (
  status = 'success',
  data: any,
  statusCode = HttpStatus.OK,
  message?: string,
) => {
  const responseDto = new ResponseDto();
  responseDto.status = status;
  responseDto.data = data;
  responseDto.message = message;
  responseDto.statusCode = statusCode;
  return responseDto;
};

export const handleErrorResponse = (message?: any, statusCode?: any) => {
  return handleSuccessResponse('error', null, statusCode, message);
};
