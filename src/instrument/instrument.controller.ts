import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    Post,
    Query,
    Res,
    UseGuards,
  } from '@nestjs/common';
  import { Observable, lastValueFrom } from 'rxjs';
  import { Response } from 'express';
import { InstruementService } from './instrument.service';
  
  @Controller('instrument')
  export class InstrumentController {
    private readonly logger = new Logger(InstrumentController.name);
  
    constructor(private readonly instrumentService: InstruementService) {}
  
    @Get('health-check')
    healthCheck(): any {
      return this.instrumentService.healthCheck();
    }
  }
  