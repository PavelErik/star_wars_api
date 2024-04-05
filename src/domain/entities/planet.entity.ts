export class Planet {
  constructor(
    public id: string,
    public clima: string,
    public diametro: string,
    public gravedad: string,
    public nombre: string,
    public periodoOrbital: string,
    public poblacion: string,
    public residentes: string[],
    public periodoRotacion: string,
    public aguaSuperficial: string,
    public terreno: string,
    public url: string
  ) {}
}
