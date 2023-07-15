import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { format } from 'date-fns';
@Injectable()
export class TimelineService {
  constructor(@Inject('AUDIT') private readonly auditClient: ClientProxy) {}
  getTimeline(payload: { username: string }) {
    const pattern = { cmd: 'search' };
    const today = new Date();
    const formattedToday = format(today, 'yyyy-MM-dd');
    const queryBody = {
      indexName: 'timeline',
      body: {
        query: {
          bool: {
            must: [
              {
                match: {
                  userName: payload.username,
                },
              },
              {
                range: {
                  eventTime: {
                    gte: formattedToday,
                    lte: formattedToday,
                  },
                },
              },
            ],
          },
        },
      },
    };

    return this.auditClient.send<any>(pattern, queryBody);
  }
}
