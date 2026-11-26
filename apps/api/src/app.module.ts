import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), WebhooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
