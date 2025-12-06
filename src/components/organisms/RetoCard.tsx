import { Link } from "react-router-dom";
import type { Reto } from "../../types/Reto";

// Iconos con tamaño correcto (no gigantes)
const DatabaseIcon = () => (
  <svg
    className="h-12 w-12 text-yellow-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    />
  </svg>
);

const CodeIcon = () => (
  <svg
    className="h-12 w-12 text-yellow-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const DesignIcon = () => (
  <svg
    className="h-12 w-12 text-yellow-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    />
  </svg>
);

const WebIcon = () => (
  <svg
    className="h-12 w-12 text-yellow-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
    />
  </svg>
);

const MobileIcon = () => (
  <svg
    className="h-12 w-12 text-yellow-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

const ApiIcon = () => (
  <svg
    className="h-12 w-12 text-yellow-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const DefaultIcon = () => (
  <svg
    className="h-12 w-12 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

// Detectar icono según contenido
function getRetoIcon(reto: Reto) {
  const texto = (reto.titulo + " " + reto.descripcion).toLowerCase();

  if (
    texto.includes("base de datos") ||
    texto.includes("database") ||
    texto.includes("sql") ||
    texto.includes("mysql") ||
    texto.includes("mongodb")
  ) {
    return <DatabaseIcon />;
  }
  if (
    texto.includes("api") ||
    texto.includes("rest") ||
    texto.includes("backend") ||
    texto.includes("servidor")
  ) {
    return <ApiIcon />;
  }
  if (
    texto.includes("diseño") ||
    texto.includes("ui") ||
    texto.includes("ux") ||
    texto.includes("interfaz") ||
    texto.includes("figma")
  ) {
    return <DesignIcon />;
  }
  if (
    texto.includes("web") ||
    texto.includes("frontend") ||
    texto.includes("react") ||
    texto.includes("vue") ||
    texto.includes("angular")
  ) {
    return <WebIcon />;
  }
  if (
    texto.includes("móvil") ||
    texto.includes("mobile") ||
    texto.includes("app") ||
    texto.includes("android") ||
    texto.includes("ios")
  ) {
    return <MobileIcon />;
  }
  if (
    texto.includes("código") ||
    texto.includes("algoritmo") ||
    texto.includes("programación") ||
    texto.includes("fullstack")
  ) {
    return <CodeIcon />;
  }

  return <DefaultIcon />;
}

export default function RetoCard({ reto }: { reto: Reto }) {
  return (
    // Card contenedor con bordes y fondo
    <div className="bg-slate-800/80 border border-slate-700 rounded-lg overflow-hidden hover:border-yellow-500/50 transition-all shadow-lg hover:shadow-xl max-w-5xl mx-auto">
      <div className="md:flex">
        {/* Lado izquierdo - Icono */}
        <div className="md:w-40 bg-slate-900/50 flex items-center justify-center p-6">
          {getRetoIcon(reto)}
        </div>

        {/* Lado derecho - Contenido */}
        <div className="flex-1 p-6">
          {/* Título */}
          <h3 className="text-xl font-bold text-white mb-2">{reto.titulo}</h3>

          {/* Info básica */}
          <div className="space-y-1 text-gray-300 text-sm mb-4">
            <p>Tipo: {reto.tipo || "INDIVIDUAL"}</p>
            <p>Estado: {reto.estado || "ABIERTO"}</p>
            {reto.recompensa && <p>Recompensa: {reto.recompensa}</p>}
          </div>

          {/* Botón ver descripción - Amarillo dorado como el logo */}
          <Link
            to={`/retos/${reto.idReto}`}
            className="inline-block px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold rounded transition-colors"
          >
            Ver descripción
          </Link>
        </div>
      </div>
    </div>
  );
}
