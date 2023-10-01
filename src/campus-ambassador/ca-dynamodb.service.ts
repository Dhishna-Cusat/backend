import { Injectable } from '@nestjs/common';
import { CampusAmbassador } from './ca.model';
import { DynamoDB } from 'aws-sdk';
import { uuid } from 'uuidv4';

@Injectable()
export class CampusAmbassadorDynamoDBService {
  private readonly dynamoDB = new DynamoDB.DocumentClient();
  private readonly tableName = 'Dhishna-Campus-Ambassador-multimodel-table';

  async findAll(): Promise<CampusAmbassador[]> {
    const params = {
      TableName: this.tableName,
    };

    try {
      const result = await this.dynamoDB.scan(params).promise();
      return result.Items as CampusAmbassador[];
    } catch (error) {
      console.error('Error in findAll: ', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<CampusAmbassador | null> {
    const params = {
      TableName: this.tableName,
      Key: {
        ID: id,
        entityType: 'campusAmbassador',
      },
    };

    try {
      const result = await this.dynamoDB.get(params).promise();
      return result.Item as CampusAmbassador | null;
    } catch (error) {
      console.error('Error in findOne: ', error);
      throw error;
    }
  }

  async findByEmail(emailID: string): Promise<CampusAmbassador | null> {
    const params = {
      TableName: this.tableName,
      FilterExpression: '#emailID = :emailID',
      ExpressionAttributeNames: {
        '#emailID': 'emailID',
      },
      ExpressionAttributeValues: {
        ':emailID': emailID,
      },
    };

    try {
      const result = await this.dynamoDB.scan(params).promise();

      if (result.Items && result.Items.length > 0) {
        return result.Items[0] as CampusAmbassador;
      }

      return null;
    } catch (error) {
      console.error('Error in findByEmail: ', error);
      throw error;
    }
  }

  async create(campusAmbassador: CampusAmbassador): Promise<CampusAmbassador> {
    const params = {
      TableName: this.tableName,
      Item: campusAmbassador,
    };

    try {
      campusAmbassador.entityType = 'campusAmbassador';
      campusAmbassador.ID = uuid();
      await this.dynamoDB.put(params).promise();
      return campusAmbassador;
    } catch (error) {
      console.error('Error in create: ', error);
      throw error;
    }
  }

  async update(
    id: string,
    campusAmbassador: Partial<CampusAmbassador>,
  ): Promise<CampusAmbassador | null> {
    const params = {
      TableName: this.tableName,
      Key: {
        ID: id,
        entityType: 'campusAmbassador', // Provide the correct entityType value
      },
      UpdateExpression:
        'SET #name = :name, #emailID = :emailID, #phoneNumber = :phoneNumber, #collegeName = :collegeName, #academicYear = :academicYear, #collegeIDLink = :collegeIDLink',
      ExpressionAttributeValues: {
        ':name': campusAmbassador.name,
        ':emailID': campusAmbassador.emailID,
        ':phoneNumber': campusAmbassador.phoneNumber,
        ':collegeName': campusAmbassador.collegeName,
        ':academicYear': campusAmbassador.academicYear,
        ':collegeIDLink': campusAmbassador.collegeIDLink,
      },
      ExpressionAttributeNames: {
        '#name': 'name',
        '#emailID': 'emailID',
        '#phoneNumber': 'phoneNumber',
        '#collegeName': 'collegeName',
        '#academicYear': 'academicYear',
        '#collegeIDLink': 'collegeIDLink',
      },
      ReturnValues: 'ALL_NEW',
    };

    try {
      const result = await this.dynamoDB.update(params).promise();
      return result.Attributes as CampusAmbassador | null;
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        ID: id,
        entityType: 'campusAmbassador',
      },
    };

    try {
      await this.dynamoDB.delete(params).promise();
    } catch (error) {
      console.error('Error in delete: ', error);
      throw error;
    }
  }
}
