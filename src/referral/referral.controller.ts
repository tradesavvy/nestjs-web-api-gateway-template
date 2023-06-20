import { Body, Controller, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { ReferralService } from './referral.service';
import { lastValueFrom } from 'rxjs';
import { Response } from 'express';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { CreateReferralDto } from 'src/common/dtos/create-referral.dto';

@Controller('referral')
export class ReferralController {
  private readonly logger = new Logger(ReferralController.name);

  constructor(private readonly referralService: ReferralService) {}

  @Get('/:username')
  async getReferralByUsername(@Param('username')username:string, @Res() res:Response):Promise<any> {
    this.logger.log("GET REFERRAL BY USERNAME")
    const result$ = this.referralService.getRefferalByUsername({username});
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Post()
  async createReferral(@Body() createRefferalDto: CreateReferralDto, @Res() res: Response){
    this.logger.log("CREATE REFERRAL")
    this.logger.log(`payload: ${JSON.stringify(createRefferalDto)}`);
    const result$ = this.referralService.create(createRefferalDto);
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    }); 
  }
  @Get('ping')
  ping(): any {
    return this.referralService.ping();
  }
}
