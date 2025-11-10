import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPages";
import RegisterPage from "./pages/RegisterPage";
import RetosPage from "./pages/RetosPage";
import RetoDetailPage from "./pages/RetoDetailPage";
import PerfilPage from "./pages/PerfilPages";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MisRetosPage from "./components/MisRetos";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas privadas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/retos" element={<RetosPage />} />
            <Route path="/retos/:id" element={<RetoDetailPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/mis-retos" element={<MisRetosPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}
