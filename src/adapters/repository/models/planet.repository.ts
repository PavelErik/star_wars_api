import AWS from "aws-sdk";
import { Planet } from "../../../domain/entities/planet.entity";
import dynamoDBClient from "../../../infraestructure/db/dynamodb";

export class PlanetRepository {
  private dynamoDb = dynamoDBClient();
  private tableName: string = "Planet";

  getPlanet = async (): Promise<Planet[]> => {
    const params = {
      TableName: this.tableName,
    };

    try {
      const data = await this.dynamoDb.scan(params).promise();
      return data.Items as Planet[];
    } catch (error) {
      console.error("Error al obtener planetas de DynamoDB:", error);
      throw new Error("Error al obtener planetas");
    }
  };

  getPlanetById = async (id: number): Promise<Planet | undefined> => {
    const params = {
      TableName: this.tableName,
      Key: {
        ["id"]: id,
      },
    };

    try {
      const data = await this.dynamoDb.get(params).promise();
      return data.Item as Planet | undefined;
    } catch (error) {
      console.error("Error al obtener planeta de DynamoDB:", error);
      throw new Error("Error al obtener planeta");
    }
  };

  savePlanet = async (planet: Planet): Promise<Planet> => {
    const params = {
      TableName: this.tableName,
      Item: { ...planet },
    };

    try {
      await this.dynamoDb.put(params).promise();
      console.log("Planeta creada con éxito:", planet);
      return planet;
    } catch (error) {
      console.error("Error al crear planeta en DynamoDB:", error);
      throw new Error("Error al crear planeta");
    }
  };
}
