import axios from "axios";

const BASE_URL = "https://swapi.py4e.com/api";

export interface Persona {
  nombre: string;
  altura: string;
  peso: string;
  colorDePelo: string;
  colorDePiel: string;
  colorDeOjos: string;
  fechaDeNacimiento: string;
  genero: string;
}

const peopleMapper = (person: any): Persona => ({
  nombre: person.name,
  altura: person.height,
  peso: person.mass,
  colorDePelo: person.hair_color,
  colorDePiel: person.skin_color,
  colorDeOjos: person.eye_color,
  fechaDeNacimiento: person.birth_year,
  genero: person.gender,
});

export const getPeopleSwapi = async (id: number): Promise<Persona> => {
  try {
    const response = await axios.get(`${BASE_URL}/people/${id}`);
    return peopleMapper(response.data);
  } catch (error) {
    console.error("Error al obtener persona de Star Wars API:", error);
    throw new Error("Error al obtener datos de la API de Star Wars");
  }
};
