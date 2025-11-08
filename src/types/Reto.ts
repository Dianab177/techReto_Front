export interface Reto {
  id_reto: number;
  titulo: string;
  descripcion: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  estado?: string; // ACTIVO, CERRADO, etc.
}
