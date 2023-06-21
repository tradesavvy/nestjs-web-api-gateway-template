import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Injectable()
export class ReferralService {
  private readonly logger = new Logger(ReferralService.name);

  constructor(@Inject('REFERRAL') private readonly referralClient: ClientProxy) {}
  ping(): any {
    this.logger.log('ping Check ');
    const pattern = { cmd: 'ping' };
    return this.referralClient.send<any>(pattern, {});
  }

  getRefferalByUsername(payload:any):Observable<ResponseDto>{
    const pattern = { cmd : 'getReferralByUsername'};
    return this.referralClient.send<any>(pattern,payload);
  }

  create(payload:any):Observable<ResponseDto>{
    const pattern = { cmd : 'createReferral'};
    return this.referralClient.send<any>(pattern,payload);
  }

  update(payload:any):Observable<ResponseDto>{
    const pattern = { cmd : 'updateReferral'};
    return this.referralClient.send<any>(pattern,payload);
  }

}
