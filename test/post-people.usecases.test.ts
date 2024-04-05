import { PeopleRepository } from "../src/adapters/repository/models/people.repository";
import { GetPeople } from "../src/domain/usecases/people/get-people.usecase";
import { PlanetRepository } from "../src/adapters/repository/models/planet.repository";
import { CreatePlanet } from "../src/domain/usecases/planet/create-planet.usecase";

describe("savePlanetUseCase", () => {
  it("should save a planet successfully", async () => {
    const mockModel = {
      clima: "Árido",
      diametro: "10465",
      gravedad: "1 estándar",
      nombre: "Tatooine",
      periodoOrbital: "304",
      poblacion: "200000",
      residentes: [
        "https://swapi.py4e.com/api/people/1/",
        "https://swapi.py4e.com/api/people/2/",
      ],
      periodoRotacion: "23",
      aguaSuperficial: "1",
      terreno: "Desierto",
      url: "https://swapi.py4e.com/api/planets/1/",
    };

    const planetRepositoryMock = new PlanetRepository();

    planetRepositoryMock.savePlanet = jest.fn().mockResolvedValue(mockModel);

    const createPlanetUseCase = new CreatePlanet(planetRepositoryMock);

    const result = await createPlanetUseCase.execute(mockModel);

    expect(result).toBeDefined();
  });
});
