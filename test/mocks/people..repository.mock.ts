export const PeopleRepository = jest.mock(
  "../src/adapters/repository/models/people.repository",
  () => {
    return {
      PeopleRepository: jest.fn().mockImplementation(() => {
        return {
          getPeopleById: jest.fn().mockResolvedValue({
            id: 20,
            nombre: "Yoda",
            altura: "66",
            peso: "17",
            colorDePelo: "white",
            colorDePiel: "green",
            colorDeOjos: "brown",
            fechaDeNacimiento: "896BBY",
            genero: "male",
          }),
          savePeople: jest.fn().mockResolvedValue({
            id: 20,
            nombre: "Yoda",
            altura: "66",
            peso: "17",
            colorDePelo: "white",
            colorDePiel: "green",
            colorDeOjos: "brown",
            fechaDeNacimiento: "896BBY",
            genero: "male",
          }),
        };
      }),
    };
  }
);
