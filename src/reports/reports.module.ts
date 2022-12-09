import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { Reports } from './reports.entity';
import { ReportsService } from './reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reports])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
