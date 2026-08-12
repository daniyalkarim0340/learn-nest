import { Module } from '@nestjs/common';
import { CategeoryService } from './categeory.service';
import { CategeoryController } from './categeory.controller';

@Module({
  controllers: [CategeoryController],
  providers: [CategeoryService],
})
export class CategeoryModule {}
