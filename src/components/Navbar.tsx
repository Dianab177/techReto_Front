import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b">
      <nav className="max-w-6xl mx-auto p-4 flex items-center gap-4 justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold">techReto</Link>
          <Link to="/retos" className="text-sm">Retos</Link>
          {(user?.rol === "ADMIN" || user?.rol === "EMPRESA") && (
            <Link to="/admin" className="text-sm">Panel</Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/perfil" className="text-sm">{user.nombre}</Link>
              <button onClick={handleLogout} className="text-sm px-3 py-1 rounded bg-slate-900 text-white">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">Entrar</Link>
              <Link to="/register" className="text-sm px-3 py-1 rounded bg-slate-900 text-white">
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
