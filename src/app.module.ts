import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [UserModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
