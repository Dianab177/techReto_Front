export interface Inscripcion {
  idInscripcion: number;
  usuario?: {
    idUsuario: number;
    nombre: string;
    email: string;
  };
  equipo?: {
    idEquipo: number;
    nombre: string;
    miembros?: { nombre: string; rol?: string; entrega?: string }[];
  };
  fechaInscripcion: string;
  estadoEntrega?: string;
  estadoAprobacion?: string;
}
