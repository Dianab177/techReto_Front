export interface Inscripcion {
  idInscripcion: number;

  fechaInscripcion: string;

  // Estado enviado por backend
  estado: string;                 // PENDIENTE | ACEPTADA | RECHAZADA | COMPLETADA

  estadoEntrega?: string;         // ENTREGADO | PENDIENTE | APROBADO | RECHAZADO
  estadoAprobacion?: string;      // APROBADO | RECHAZADO

  usuario?: {
    idUsuario: number;
    nombre: string;
    email: string;
  };

  equipo?: {
    idEquipo: number;
    nombre: string;
    miembros?: Array<{
      nombre: string;
      rol?: string;
      entrega?: string;
    }>;
  };

  reto?: {
    idReto: number;
    titulo: string;
    fechaInicio?: string;
    fechaFin?: string;
    empresa?: { nombre: string };
  };
}
