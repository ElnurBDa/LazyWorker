import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  sendMail(userEmail: string, otp: number): void {
    console.log('[MailService] sendMail',userEmail,otp);
    this.mailerService.sendMail({
      to: userEmail,
      from: 'LazyWorkerBHOS@gmail.com',
      subject: 'Confirm Your Email',
      text: otp.toString(),
    });
  }
}
