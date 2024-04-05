import { PeopleRepository } from "../../../adapters/repository/models/people.repository";
import { getPeopleSwapi } from "../../../adapters/swapi/swapi.adapter";
import { toPerson } from "../../../shared/mappers";
import { Person } from "../../entities/people.entity";

export class GetPeople {
  constructor(private peopleRepository: PeopleRepository) {}

  execute = async (id: number): Promise<Person> => {
    const personFindDb = await this.peopleRepository.getPeopleById(id);
    if (personFindDb) {
      console.info("Se encontraron resultados en la base de datos");
      return personFindDb;
    }

    const personSwapi = await getPeopleSwapi(id);
    console.info("Se encontraron resultados en Swapi para el id", id);
    return await this.peopleRepository.savePeople(toPerson(id, personSwapi));
  };
}
