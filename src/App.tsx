import { Route, Routes } from "react-router-dom";
import PublicLayout from "./layout/PublicLayout";
import DashboardLayout from "./layout/Dashboardlayout";

import HomePage from "./pages/LandinPage";
import LoginPage from "./pages/LoginPages";
import RegisterPage from "./pages/RegisterPage";
import RetosPage from "./pages/RetosPage";
import RetoDetailPage from "./pages/RetoDetailPage";
import PerfilPage from "./pages/PerfilPages";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MisRetosPage from "./components/MisRetos";
import UsuariosPage from "./pages/UsuariosPage";
import EvaluacionesPage from "./pages/EvaluacionesPage";
import CrearRetoPage from "./pages/CrearRetoPage";
import EmpresaRetosPage from "./pages/EmpresaRetosPage";

export default function App() {
  return (
    <Routes>
      {/* PÚBLICO */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* PRIVADO */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<RetosPage />} />
          <Route path="/retos" element={<RetosPage />} />
          <Route path="/retos/:id" element={<RetoDetailPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/mis-retos" element={<MisRetosPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/usuarios" element={<UsuariosPage />} />
          <Route path="/admin/evaluaciones" element={<EvaluacionesPage />} />
          <Route path="/empresa/retos" element={<EmpresaRetosPage />} />
          <Route path="/empresa/crear" element={<CrearRetoPage />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
