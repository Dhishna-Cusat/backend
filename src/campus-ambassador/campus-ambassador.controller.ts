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

  @Get(':ID')
  findOne(@Param('ID') ID: string): CampusAmbassador {
    return this.campusAmbassadors.find((ca) => ca.ID === ID);
  }

  @Post()
  create(@Body() campusAmbassador: CampusAmbassador): CampusAmbassador {
    campusAmbassador.ID = uuid();
    campusAmbassador.entityType = 'campusAmbassador';
    this.campusAmbassadors.push(campusAmbassador);
    return campusAmbassador;
  }

  @Put(':ID')
  update(
    @Param('ID') ID: string,
    @Body() campusAmbassador: CampusAmbassador,
  ): CampusAmbassador {
    const index = this.campusAmbassadors.findIndex((ca) => ca.ID === ID);
    if (index !== -1) {
      this.campusAmbassadors[index] = {
        ...this.campusAmbassadors[index],
        ...campusAmbassador,
      };
      return this.campusAmbassadors[index];
    }
    return null;
  }

  @Delete(':ID')
  remove(@Param('ID') ID: string): void {
    const index = this.campusAmbassadors.findIndex((ca) => ca.ID === ID);
    if (index !== -1) {
      this.campusAmbassadors.splice(index, 1);
    }
  }
}
