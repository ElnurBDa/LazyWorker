import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
