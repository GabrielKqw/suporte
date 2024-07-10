import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { SupportModule } from './support/support.module';
import { TicketModule } from './ticket/ticket.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, CompanyModule, SupportModule, TicketModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
