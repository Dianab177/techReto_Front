import {
  HomeIcon,
  BriefcaseIcon,
  PlusCircleIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function SidebarEmpresa() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (href: string) => location.pathname === href;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menu = [
    { name: "Home", icon: HomeIcon, href: "/" },
    {
      name: "Mis retos publicados",
      icon: BriefcaseIcon,
      href: "/empresa/retos",
    },
    { name: "Crear reto", icon: PlusCircleIcon, href: "/empresa/crear" },
    {
      name: "Inscripciones",
      icon: ClipboardDocumentListIcon,
      href: "/empresa/inscripciones",
    },
    { name: "Perfil empresa", icon: Cog6ToothIcon, href: "/empresa/perfil" },
  ];

  return (
    <div className="flex flex-col h-full py-6 space-y-8">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        Empresa
      </h2>

      <ul className="space-y-1">
        {menu.map((item) => (
          <li key={item.name}>
            <Link
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                ${
                  isActive(item.href)
                    ? "bg-gray-200 text-indigo-600 dark:bg-white/10 dark:text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="border-t border-gray-200 pt-4 dark:border-white/10">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-white/10"
        >
          <span>Cerrar sesión</span>
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
