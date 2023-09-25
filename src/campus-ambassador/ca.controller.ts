import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CampusAmbassador } from './ca.model';
import { CampusAmbassadorDynamoDBService } from './ca-dynamodb.service';

@Controller('campus-ambassadors')
export class CampusAmbassadorController {
  constructor(
    private readonly campusAmbassadorService: CampusAmbassadorDynamoDBService,
  ) {}

  @Get()
  async findAll(): Promise<CampusAmbassador[]> {
    return this.campusAmbassadorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CampusAmbassador | null> {
    return this.campusAmbassadorService.findOne(id);
  }

  @Post()
  async create(
    @Body() campusAmbassador: CampusAmbassador,
  ): Promise<CampusAmbassador> {
    return this.campusAmbassadorService.create(campusAmbassador);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() campusAmbassador: Partial<CampusAmbassador>,
  ): Promise<CampusAmbassador | null> {
    return this.campusAmbassadorService.update(id, campusAmbassador);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.campusAmbassadorService.delete(id);
  }
}
