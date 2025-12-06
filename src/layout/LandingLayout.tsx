import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logo from "../assets/logo-yellow.svg"; // tu logo TechReto

const navigation = [
  { name: "Retos", href: "/retos" },
  { name: "Empresas", href: "/register?type=empresa" },
  { name: "Cómo funciona", href: "#how" },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* NAVBAR */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <img src={logo} alt="TechReto" className="h-8 w-auto" />
              <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                TechReto
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Abrir menú</span>
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-semibold text-gray-900 dark:text-gray-100"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-900 dark:text-white"
            >
              Entrar <span aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>

        {/* MOBILE MENU */}
        <Dialog
          as="div"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />

          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white p-6 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <img src={logo} alt="TechReto" className="h-8 w-auto" />
                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                  TechReto
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              >
                <span className="sr-only">Cerrar menú</span>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-300/20 dark:divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="py-6">
                  <Link
                    to="/login"
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* HERO */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* background blurred blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-yellow-300 to-indigo-500 opacity-30" />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-5xl font-semibold text-gray-900 dark:text-white sm:text-7xl">
            Retos reales para talento real
          </h1>

          <p className="mt-8 text-lg font-medium text-gray-600 dark:text-gray-400 sm:text-xl">
            TechReto conecta empresas y desarrolladores a través de desafíos
            reales. Demuestra tu talento, encuentra oportunidades o descubre al
            próximo fichaje.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/retos"
              className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              Explorar retos
            </Link>

            <Link
              to="/register"
              className="text-sm font-semibold text-gray-900 dark:text-white"
            >
              Crear cuenta →
            </Link>
          </div>
        </div>

        {/* bottom blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-indigo-300 to-yellow-300 opacity-30" />
        </div>
      </div>
    </div>
  );
}
