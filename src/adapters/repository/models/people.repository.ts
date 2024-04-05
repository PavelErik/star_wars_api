import AWS from "aws-sdk";
import { Person } from "../../../domain/entities/people.entity";
import dynamoDBClient from "../../../infraestructure/db/dynamodb";

export class PeopleRepository {
  private dynamoDb = dynamoDBClient();
  private tableName: string = "People";

  getPeople = async (): Promise<Person[]> => {
    const params = {
      TableName: this.tableName,
    };

    try {
      const data = await this.dynamoDb.scan(params).promise();
      return data.Items as Person[];
    } catch (error) {
      console.error("Error al obtener personas de DynamoDB:", error);
      throw new Error("Error al obtener personas");
    }
  };

  getPeopleById = async (id: number): Promise<Person | undefined> => {
    const params = {
      TableName: this.tableName,
      Key: {
        ["id"]: id,
      },
    };

    try {
      const data = await this.dynamoDb.get(params).promise();
      return data.Item as Person | undefined;
    } catch (error) {
      console.error("Error al obtener personas de DynamoDB:", error);
      throw new Error("Error al obtener personas");
    }
  };

  savePeople = async (person: Person): Promise<Person> => {
    const params = {
      TableName: this.tableName,
      Item: { ...person },
    };

    try {
      await this.dynamoDb.put(params).promise();
      console.log("Persona creada con éxito:", person);
      return person;
    } catch (error) {
      console.error("Error al crear persona en DynamoDB:", error);
      throw new Error("Error al crear persona");
    }
  };
}
