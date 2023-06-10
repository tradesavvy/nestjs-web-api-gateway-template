import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AxiosQuestService {
  private readonly logger = new Logger(AxiosQuestService.name);
  constructor(private readonly httpService: HttpService) {}

  // async questClaimByUserClickLink(
  //   username: string,
  //   event: string,
  // ): Promise<any> {
  //   const url = `${process.env.APP_BACKEND_URL}/quests/users/${username}/Gamepay/login/claim`;
  //   this.logger.log('user quest claimed url: ' + url);
  //   const { data } = await firstValueFrom(
  //     this.httpService.get<any>(url).pipe(
  //       catchError((error: AxiosError) => {
  //         this.logger.error(error);
  //         throw 'An error happened!';
  //       }),
  //     ),
  //   );
  //   return data;
  // }

  // async getQuestByUser(username: string): Promise<any> {
  //   const url = `${process.env.APP_BACKEND_URL}/quests/users/${username}`;
  //   this.logger.log('user quest claimed url: ' + url);
  //   const { data } = await firstValueFrom(
  //     this.httpService.get<any>(url).pipe(
  //       catchError((error: AxiosError) => {
  //         this.logger.error(error?.response?.data);
  //         throw 'An error happened!';
  //       }),
  //     ),
  //   );
  //   return data;
  // }
}
