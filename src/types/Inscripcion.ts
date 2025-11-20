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
  };

  fechaInscripcion: string;

  estado: "PENDIENTE" | "ACEPTADA" | "RECHAZADA" | "COMPLETADA";

  estadoEntrega?: "PENDIENTE" | "ENTREGADO";
  estadoAprobacion?: "PENDIENTE" | "APROBADO" | "RECHAZADO";

  enlaceRepositorio?: string;
  enlaceFigma?: string;
  enlaceDemo?: string;

  reto?: {
    idReto: number;
    titulo: string;
    empresa?: { nombre: string };
    fechaInicio?: string;
    fechaFin?: string;
  };
}
