import { Module } from '@nestjs/common';
import { CampusAmbassadorController } from './campus-ambassador.controller';

@Module({
  controllers: [CampusAmbassadorController],
})
export class CampusAmbassadorModule {}
