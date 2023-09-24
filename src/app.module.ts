import { Module } from '@nestjs/common';
import { CampusAmbassadorModule } from './campus-ambassador/campus-ambassador.module';

@Module({
  imports: [CampusAmbassadorModule],
})
export class AppModule {}
