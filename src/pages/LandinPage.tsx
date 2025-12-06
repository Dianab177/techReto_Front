import { Link } from "react-router-dom";
import logo from "../assets/logo-yellow.svg";

export default function LandingPage() {
  return (
    <div className="dark:bg-gray-900">
      <div className="relative isolate px-6 lg:px-8">
        {/* background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-20 -z-50 pointer-events-none transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[60%] aspect-[1155/678] w-[36rem] -translate-x-1/2
               rotate-30 bg-gradient-to-tr from-yellow-300 to-indigo-500 opacity-30"
          />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="TechReto" className="h-10 w-auto" />
          </div>

          <h1 className="text-5xl font-semibold text-gray-900 dark:text-white sm:text-7xl">
            Retos reales para talento real
          </h1>

          <p className="mt-8 text-lg font-medium text-gray-600 dark:text-gray-400 sm:text-xl">
            TechReto conecta empresas y desarrolladores…
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/retos"
              className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
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
          <div className="relative left-1/4 aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-indigo-300 to-yellow-300 opacity-20" />
        </div>
      </div>
    </div>
  );
}
