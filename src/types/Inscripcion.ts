export interface Inscripcion {
  idInscripcion: number;

  usuario: {
    idUsuario: number;
    nombre: string;
    email: string;
    password: string;
    rol: "ADMIN" | "EMPRESA" | "PARTICIPANTE";
    competencias: string | null;
  };

  equipo: {
    idEquipo: number;
    nombre: string;
    descripcion: string;
  } | null;

  fechaInscripcion: string;

  estado: "PENDIENTE" | "ACEPTADA" | "RECHAZADA" | "COMPLETADA";

  oculto: boolean;

  enlaceRepositorio: string | null;
  enlaceFigma: string | null;
  enlaceDemo: string | null;

  estadoEntrega: string | null;
  estadoAprobacion: string | null;

  reto: {
    idReto: number;
    titulo: string;
    descripcion: string;
    tipo: "INDIVIDUAL" | "EQUIPO";
    estado: "ABIERTO" | "EN_CURSO" | "CERRADO";
    recompensa: string | null;
    fechaInicio: string;
    fechaFin: string | null;
    bloqueado: boolean;
    empresa: {
      idUsuario: number;
      nombre: string;
      email: string;
      password: string;
      rol: "EMPRESA";
      competencias: string | null;
    };
  };
}
