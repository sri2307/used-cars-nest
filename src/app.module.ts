import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'sqlite',
      database:'db.sqlite',
      entities:[User],
      synchronize:true
    }),
    UserModule,
    ReportsModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
