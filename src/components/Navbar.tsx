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
    <header className="border-b border-[#FFD200] w-full mb-8">
      <nav className="mx-auto flex items-center gap-4 justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold">
            <img
              src={logo}
              alt="techReto Logo"
              className="h-8"
              id="logo-yellow"
            />
          </Link>
          <Link to="/retos" className="logo text-sm">
            Retos
          </Link>
          {(user?.rol === "ADMIN" || user?.rol === "EMPRESA") && (
            <Link to="/admin" className="text-sm">
              Panel
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/perfil" className="text-sm">
                {user.nombre}
              </Link>
              <button type="button" onClick={handleLogout}>
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">
                Entrar
              </Link>
              <Link
                to="/register"
                className="text-sm px-3 py-1 rounded bg-slate-900 text-white"
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
