import { Module } from '@nestjs/common';
import { CampusAmbassadorModule } from './campus-ambassador/ca.module';

@Module({
  imports: [CampusAmbassadorModule],
})
export class AppModule {}
