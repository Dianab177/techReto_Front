import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  //HomeIcon,
  RectangleGroupIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../hooks/useAuth";

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
}

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) return null; // por seguridad

  const rol = user.rol; // "USER" | "EMPRESA" | "ADMIN"

  // Navegación base común a casi todos
  const baseItems: NavItem[] = [
    { label: "Retos", to: "/retos", icon: RectangleGroupIcon },
    { label: "Mis retos", to: "/mis-retos", icon: ClipboardDocumentListIcon },
    { label: "Perfil", to: "/perfil", icon: UserIcon },
  ];

  const adminItem: NavItem = {
    label: "Panel admin",
    to: "/admin",
    icon: ShieldCheckIcon,
  };

  const empresaItem: NavItem = {
    label: "Panel empresa",
    to: "/admin", // ahora mismo tu panel está en /admin para EMPRESA y ADMIN
    icon: ShieldCheckIcon,
  };

  let navItems: NavItem[] = [...baseItems];

  if (rol === "EMPRESA") {
    navItems = [empresaItem, ...baseItems];
  } else if (rol === "ADMIN") {
    navItems = [adminItem, ...baseItems];
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 lg:w-72 border-r border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-white/10">
      <div className="flex flex-col h-full p-6 gap-8">
        {/* Logo + rol */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            TechReto
          </p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            Sesión iniciada como{" "}
            <span className="font-semibold">{user.nombre}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Rol: <span className="uppercase">{rol}</span>
          </p>
        </div>

        {/* Navegación principal */}
        <nav className="flex-1">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.to;

              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                      ${
                        active
                          ? "bg-gray-200 text-indigo-600 dark:bg-white/10 dark:text-white"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                      }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer de la sidebar: logout */}
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
    </aside>
  );
}
