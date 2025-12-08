import {
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function SidebarAdmin() {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menu = [
    { name: "Dashboard", icon: HomeIcon, href: "/dashboard" },
    { name: "Usuarios", icon: UsersIcon, href: "/admin/usuarios" },
    { name: "Retos", icon: BriefcaseIcon, href: "/admin" },
    {
      name: "Evaluaciones",
      icon: ClipboardDocumentListIcon,
      href: "/admin/evaluaciones",
    },
    { name: "Ajustes", icon: Cog6ToothIcon, href: "/perfil" },
  ];

  return (
    <div className="flex flex-col h-full py-6 space-y-8">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        Administrador
      </h2>

      {/* Menú */}
      <ul className="space-y-1 flex-1">
        {menu.map((item) => {
          const active = location.pathname === item.href;

          return (
            <li key={item.name}>
              <Link
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                  ${
                    active
                      ? "bg-gray-200 text-indigo-600 dark:bg-white/10 dark:text-white"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                  }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Botón cerrar sesión */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                     text-white hover:bg-red-500/20 dark:text-white dark:hover:bg-red-500/20"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 text-white" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
