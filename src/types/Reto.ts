import type { Usuario } from "./Usuario";

export interface Reto {
  idReto: number;
  titulo: string;
  descripcion: string;
  tipo: "INDIVIDUAL" | "EQUIPO";
  estado: "ABIERTO" | "EN_CURSO" | "CERRADO";
  recompensa?: string | null;
  fechaInicio: string;
  fechaFin?: string | null;
  bloqueado: boolean;
  empresa: Usuario;
}
