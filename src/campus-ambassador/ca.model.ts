import { uuid } from 'uuidv4';

export class CampusAmbassador {
  entityType: string;
  ID: string = uuid();
  name: string;
  emailID: string;
  phoneNumber: string;
  collegeName: string;
  academicYear: string;
  collegeIDLink: string;
}
