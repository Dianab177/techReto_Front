"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/sidebar/SidebarAdmin";
import SidebarEmpresa from "../components/sidebar/SidebarEmpresa";
import SidebarParticipante from "../components/sidebar/SidebarParticipante";
import { useAuth } from "../hooks/useAuth";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const renderSidebar = () => {
    if (!user) return null;
    if (user.rol === "ADMIN") return <SidebarAdmin />;
    if (user.rol === "EMPRESA") return <SidebarEmpresa />;
    return <SidebarParticipante />;
  };

  return (
    <div className="bg-slate-950 dark:bg-gray-900 h-screen flex overflow-hidden">
      {/* ===== SIDEBAR MÓVIL ===== */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 xl:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative w-full max-w-xs transform bg-white dark:bg-gray-900 p-6 shadow-xl transition-all data-closed:-translate-x-full"
          >
            {/* Botón cerrar */}
            <TransitionChild>
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-700 dark:text-gray-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </TransitionChild>

            {/* Sidebar dinámico */}
            <div className="mt-10">{renderSidebar()}</div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* ===== SIDEBAR ESCRITORIO ===== */}
      <aside className="hidden xl:flex xl:flex-col xl:w-72 border-r border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-900">
        {renderSidebar()}
      </aside>

      {/* ===== ZONA PRINCIPAL (TOPBAR + CONTENIDO) ===== */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 px-4 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-white/10 shadow-sm">
          {/* Botón hamburguesa para móvil */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="xl:hidden text-gray-700 dark:text-gray-200 p-2"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* Search bar */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              placeholder="Buscar..."
              className="w-full bg-transparent pl-10 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none border-b border-gray-300 dark:border-gray-600"
            />
          </div>
        </header>

        {/* ===== CONTENIDO PRINCIPAL ===== */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
