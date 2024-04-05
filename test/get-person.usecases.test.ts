import { PeopleRepository } from "../src/adapters/repository/models/people.repository";
import { GetPeople } from "../src/domain/usecases/people/get-people.usecase";

describe("getPersonUseCase", () => {
  it("should get a person swapi successfully", async () => {
    const peopleRepositoryMock = new PeopleRepository();
    peopleRepositoryMock.getPeopleById = jest.fn().mockResolvedValue(undefined);
    peopleRepositoryMock.savePeople = jest.fn().mockResolvedValue({
      id: 20,
      nombre: "Yoda",
      altura: "66",
      peso: "17",
      colorDePelo: "white",
      colorDePiel: "green",
      colorDeOjos: "brown",
      fechaDeNacimiento: "896BBY",
      genero: "male",
    });

    const createPersonUseCase = new GetPeople(peopleRepositoryMock);

    const result = await createPersonUseCase.execute(1);
    expect(result).toBeDefined();
  });
  it("should get a person successfully", async () => {
    const peopleRepositoryMock = new PeopleRepository();
    peopleRepositoryMock.getPeopleById = jest.fn().mockResolvedValue({
      id: 20,
      nombre: "Yoda",
      altura: "66",
      peso: "17",
      colorDePelo: "white",
      colorDePiel: "green",
      colorDeOjos: "brown",
      fechaDeNacimiento: "896BBY",
      genero: "male",
    });
    peopleRepositoryMock.savePeople = jest.fn().mockResolvedValue({
      id: 20,
      nombre: "Yoda",
      altura: "66",
      peso: "17",
      colorDePelo: "white",
      colorDePiel: "green",
      colorDeOjos: "brown",
      fechaDeNacimiento: "896BBY",
      genero: "male",
    });

    const createPersonUseCase = new GetPeople(peopleRepositoryMock);

    const result = await createPersonUseCase.execute(1);
    expect(result).toBeDefined();
  });
});
