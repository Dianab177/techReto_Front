export interface Reto {
  idReto: number; 
  titulo: string;
  descripcion: string;
  tipo: string;
  estado: string;
  recompensa: string;
  fechaInicio?: string;
  fechaFin?: string;
  empresa?: {
    idUsuario: number;
    nombre: string;
    email: string;
  };
}
