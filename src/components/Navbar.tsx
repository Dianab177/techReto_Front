import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo-yellow.svg";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full border-b border-[#FFD200] p-3 mb-8">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold">
            <img
              src={logo}
              alt="techReto Logo"
              className="h-8"
              id="logo-yellow"
            />
          </Link>
          <Link
            to="/retos"
            className="text-sm hover:text-[#d1aa0c] transition-colors"
          >
            Retos
          </Link>
          {(user?.rol === "ADMIN" || user?.rol === "EMPRESA") && (
            <Link
              to="/admin"
              className="text-sm hover:text-[#d1aa0c] transition-colors"
            >
              Panel
            </Link>
          )}
        </div>

        {/* Usuario y acciones */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/perfil"
                className="text-sm hover:text-[#d1aa0c] transition-colors"
              >
                {user.nombre}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded-lg bg-[#d1aa0c] hover:bg-[#b89a0a] text-white transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm hover:text-[#d1aa0c] transition-colors"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="text-sm px-4 py-2 rounded-lg bg-[#d1aa0c] hover:bg-[#b89a0a] text-white transition-colors"
              >
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
