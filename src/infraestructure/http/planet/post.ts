import type {
  Context,
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
  Handler,
} from "aws-lambda";
import { CreatePlanet } from "../../../domain/usecases/planet/create-planet.usecase";
import { PlanetDto } from "../../../shared/dtos/planet.dto";
import { PlanetRepository } from "../../../adapters/repository/models/planet.repository";

const planetRepository = new PlanetRepository();
const createPlanetUseCase = new CreatePlanet(planetRepository);

export const handler: Handler = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
  console.log("Body params", _event.body);

  if (!_event.body)
    return {
      statusCode: 400,
      body: "La solicitud no contiene un cuerpo",
    };

  try {
    const planet: PlanetDto = JSON.parse(_event.body);
    const response = await createPlanetUseCase.execute(planet);

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error as string,
    };
  }
};
