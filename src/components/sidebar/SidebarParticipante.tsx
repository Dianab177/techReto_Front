import {
  HomeIcon,
  ClipboardDocumentListIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function SidebarParticipante() {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menu = [
    { name: "Home", icon: HomeIcon, href: "/" },
    { name: "Retos disponibles", icon: BriefcaseIcon, href: "/retos" },
    { name: "Mis retos", icon: ClipboardDocumentListIcon, href: "/mis-retos" },
    { name: "Perfil", icon: Cog6ToothIcon, href: "/perfil" },
  ];

  return (
    <div className="flex flex-col h-full py-6 space-y-8">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        Participante
      </h2>

      {/* Menu */}
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

      {/* Cerrar sesión */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium 
        text-gray-100 hover:bg-red-100 dark:text-gray-100 dark:hover:bg-red-900/20"
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5" />
        Cerrar sesión
      </button>
    </div>
  );
}
