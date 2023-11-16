import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoveisModule } from './moveis/moveis.module';

@Module({
  imports: [MoveisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
