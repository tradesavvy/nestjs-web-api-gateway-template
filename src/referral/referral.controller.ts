import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ReferralService } from './referral.service';
import { lastValueFrom } from 'rxjs';
import { Response } from 'express';
import { CreateOrUpdateReferralDto } from 'src/common/dtos/create-referral.dto';

@Controller('referral')
export class ReferralController {
  private readonly logger = new Logger(ReferralController.name);

  constructor(private readonly referralService: ReferralService) {}

  @Get('/:username')
  async getReferralByUsername(
    @Param('username') username: string,
    @Res() res: Response,
  ): Promise<any> {
    this.logger.log('GET REFERRAL BY USERNAME');
    const result$ = this.referralService.getRefferalByUsername({ username });
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Post()
  async createReferral(
    @Body() createRefferalDto: CreateOrUpdateReferralDto,
    @Res() res: Response,
  ) {
    this.logger.log('CREATE REFERRAL');
    this.logger.log(`payload: ${JSON.stringify(createRefferalDto)}`);
    const result$ = this.referralService.create(createRefferalDto);
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Patch()
  async updateReferral(
    @Body() updateRefferalDto: CreateOrUpdateReferralDto,
    @Res() res: Response,
  ) {
    this.logger.log('UPDATE REFERRAL');
    this.logger.log(`payload: ${JSON.stringify(updateRefferalDto)}`);
    const result$ = this.referralService.update(updateRefferalDto);
    const result = await lastValueFrom(result$);
    return res.status(result.statusCode || 400).json({
      status: result.status,
      data: result.data,
      message: result.message,
    });
  }

  @Delete(':id')
  async deletReferral(@Param('id') id: string, @Res() res: Response) {
    this.logger.log('UPDATE REFERRAL');
    this.logger.log(`payload: ${JSON.stringify(id)}`);
    const result$ = this.referralService.delete({ id });
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
