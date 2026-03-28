import { Module, Global, forwardRef } from '@nestjs/common';
import { MailService } from './mail.service';
import { SettingsModule } from '../settings/settings.module';

@Global()
@Module({
  imports: [forwardRef(() => SettingsModule)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
