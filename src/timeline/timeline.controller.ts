import { Controller, Get, Logger, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TimelineService } from './timeline.service';
import { AbstractJwtController } from 'src/user/abstract.jwt.controller';

@Controller('timeline')
@ApiTags('Timeline')
export class TimelineController extends AbstractJwtController {
  getLogger(): Logger {
    return this.logger;
  }
  private readonly logger = new Logger(TimelineController.name);

  constructor(private readonly timelineService: TimelineService) {
    super();
  }

  @Get()
  async search(@Req() req: any) {
    return await this.timelineService.getTimeline({
      username: req.user.username,
    });
  }
}
