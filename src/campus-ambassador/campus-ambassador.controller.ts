import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CampusAmbassador } from './campus-ambassador.model';
import { uuid } from 'uuidv4';

@Controller('campus-ambassadors')
export class CampusAmbassadorController {
  private campusAmbassadors: CampusAmbassador[] = [];

  @Get()
  findAll(): CampusAmbassador[] {
    return this.campusAmbassadors;
  }

  @Get(':id')
  findOne(@Param('id') id: string): CampusAmbassador {
    return this.campusAmbassadors.find((ca) => ca.id === id);
  }

  @Post()
  create(@Body() campusAmbassador: CampusAmbassador): CampusAmbassador {
    // Generate a unique ID for the new campus ambassador (e.g., from a database)
    campusAmbassador.id = uuid();
    this.campusAmbassadors.push(campusAmbassador);
    return campusAmbassador;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() campusAmbassador: CampusAmbassador,
  ): CampusAmbassador {
    const index = this.campusAmbassadors.findIndex((ca) => ca.id === id);
    if (index !== -1) {
      this.campusAmbassadors[index] = {
        ...this.campusAmbassadors[index],
        ...campusAmbassador,
      };
      return this.campusAmbassadors[index];
    }
    return null;
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    const index = this.campusAmbassadors.findIndex((ca) => ca.id === id);
    if (index !== -1) {
      this.campusAmbassadors.splice(index, 1);
    }
  }
}
