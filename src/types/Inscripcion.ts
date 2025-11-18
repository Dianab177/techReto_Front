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

  estado: "PENDIENTE" | "ACEPTADA" | "RECHAZADA" | "COMPLETADA";

  estadoEntrega?: "PENDIENTE" | "ENTREGADO";

  estadoAprobacion?: "APROBADO" | "RECHAZADO";

  reto?: {
    idReto: number;
    titulo: string;
    empresa?: { nombre: string };
    fechaInicio?: string;
    fechaFin?: string;
  };
}
