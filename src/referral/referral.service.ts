import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Injectable()
export class ReferralService {
  private readonly logger = new Logger(ReferralService.name);

  constructor(
    @Inject('REFERRAL') private readonly referralClient: ClientProxy,
  ) {}
  ping(): any {
    this.logger.log('ping Check ');
    const pattern = { cmd: 'ping' };
    return this.referralClient.send<any>(pattern, {});
  }

  getRefferalByUsername(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'getReferralByUsername' };
    return this.referralClient.send<any>(pattern, payload);
  }

  getEarningListByUsername(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'getEarningListByUsername' };
    return this.referralClient.send<any>(pattern, payload);
  }

  getReferralFriendListByUsername(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'getReferralFriendListByUsername' };
    return this.referralClient.send<any>(pattern, payload);
  }

  referralEarning(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'referralEarning' };
    return this.referralClient.send<any>(pattern, payload);
  }

  create(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'createReferral' };
    return this.referralClient.send<any>(pattern, payload);
  }

  update(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'updateReferral' };
    return this.referralClient.send<any>(pattern, payload);
  }

  delete(payload: any): Observable<ResponseDto> {
    const pattern = { cmd: 'deleteReferral' };
    return this.referralClient.send<any>(pattern, payload);
  }

  getReferralByReferralCode(referralCode: string): Observable<ResponseDto> {
    this.logger.log('FIND REFERRAL BY REFERRAL CODE');
    const pattern = { cmd: 'getRefferalByReferralCode' };
    return this.referralClient.send<any>(pattern, { referralCode });
  }

  createUserReferral(
    referralCode: string,
    referUsername: string,
  ): Observable<ResponseDto> {
    this.logger.log('CREATE USER REFERRAL');
    const pattern = { cmd: 'createUserReferral' };
    return this.referralClient.send<any>(pattern, {
      referUsername,
      referralCode,
    });
  }
}
