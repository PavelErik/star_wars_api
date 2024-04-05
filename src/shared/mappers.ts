import { Persona } from "../adapters/swapi/swapi.adapter";
import { Person } from "../domain/entities/people.entity";
import { Planet } from "../domain/entities/planet.entity";
import { PlanetDto } from "./dtos/planet.dto";

export const toPerson = (id: number, person: Persona): Person => {
  return new Person(
    id,
    person.nombre,
    person.altura,
    person.peso,
    person.colorDePelo,
    person.colorDePiel,
    person.colorDeOjos,
    person.fechaDeNacimiento,
    person.genero
  );
};

export const toPlanet = (id: string, planet: PlanetDto): Planet => {
  return new Planet(
    id,
    planet.clima,
    planet.diametro,
    planet.gravedad,
    planet.nombre,
    planet.periodoOrbital,
    planet.poblacion,
    planet.residentes,
    planet.periodoRotacion,
    planet.aguaSuperficial,
    planet.terreno,
    planet.url
  );
};
