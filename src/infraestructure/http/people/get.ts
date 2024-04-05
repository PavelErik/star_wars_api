import type {
  Context,
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
  Handler,
} from "aws-lambda";
import { PeopleRepository } from "../../../adapters/repository/models/people.repository";
import { GetPeople } from "../../../domain/usecases/people/get-people.usecase";

const peopleRepository = new PeopleRepository();
const createPersonUseCase = new GetPeople(peopleRepository);

export const handler: Handler = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
  console.log("Params: ", _event);
  console.log("Params: ", _event.pathParameters);

  const id = _event.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "Ingrese un id correcto" }),
    };
  }

  try {
    const response = await createPersonUseCase.execute(parseInt(id));
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
