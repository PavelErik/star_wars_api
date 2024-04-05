import { PlanetRepository } from "../../../adapters/repository/models/planet.repository";
import { PlanetDto } from "../../../shared/dtos/planet.dto";
import { toPlanet } from "../../../shared/mappers";
import { Planet } from "../../entities/planet.entity";
import { v4 as uuidv4 } from "uuid";

export class CreatePlanet {
  constructor(private planetRepository: PlanetRepository) {}

  execute = async (planet: PlanetDto): Promise<Planet> => {
    return await this.planetRepository.savePlanet(toPlanet(uuidv4(), planet));
  };
}
