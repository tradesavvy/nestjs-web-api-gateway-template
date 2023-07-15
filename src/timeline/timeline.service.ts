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
    const mapping = {
      properties: {
        eventTime: {
          type: 'date',
          format: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
        },
      },
    };
    const queryBody = {
      indexName: 'timeline',
      body: {
        mappings: mapping,
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
        sort: [
          {
            eventTime: { order: 'asc' }, // Sorting by eventTime field in ascending order
          },
        ],
      },
    };

    return this.auditClient.send<any>(pattern, queryBody);
  }
}
