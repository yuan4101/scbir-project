// Entidad base de un carro de la base de datos
export interface Carro {
  id: number;
  marca: string;
  modelo: string;
  año: string;
  precio: string;
  imagen: string;
  vector_caracteristicas_v1: number[];
  vector_caracteristicas_v2: number[];
  url: string;
}
