import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuditService } from './audit.service';

@Controller('audit')
@ApiTags('Audit')
export class AuditController {
  private readonly logger = new Logger(AuditController.name);

  constructor(private readonly auditService: AuditService) {}

  @Get('ping')
  ping(): any {
    this.logger.log('ping...');
    return this.auditService.ping();
  }

}
