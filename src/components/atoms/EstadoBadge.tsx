interface Props {
  estado: string;
}

export default function EstadoBadge({ estado }: Props) {
  const color =
    estado === "APROBADO"
      ? "bg-green-600"
      : estado === "ENTREGADO"
      ? "bg-blue-600"
      : estado === "RECHAZADO"
      ? "bg-red-600"
      : estado === "PENDIENTE"
      ? "bg-yellow-500"
      : "bg-slate-500";

  return (
    <span className={`px-2 py-1 rounded text-xs text-white ${color}`}>
      {estado}
    </span>
  );
}
