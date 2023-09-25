import { Module } from '@nestjs/common';
import { CampusAmbassadorController } from './ca.controller';
import { CampusAmbassadorDynamoDBService } from './ca-dynamodb.service';

@Module({
  controllers: [CampusAmbassadorController],
  providers: [CampusAmbassadorDynamoDBService],
})
export class CampusAmbassadorModule {}
