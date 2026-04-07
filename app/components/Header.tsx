'use client';

import { useAuth } from "@/app/context/AuthContext";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { usuario, logout } = useAuth();

  const linkStyle =
    "text-sm font-bold transition-all duration-200 px-3 py-2 rounded-lg uppercase tracking-tight";
  const activeStyle = "text-[#6B4E3D] bg-stone-100";
  const inactiveStyle = "text-stone-500 hover:text-[#6B4E3D] hover:bg-stone-50";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="w-full bg-white border-b border-stone-200 px-4 md:px-8 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link href="/home" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex-shrink-0 w-10 h-10 bg-[#6B4E3D] rounded-xl flex items-center justify-center shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
              <line x1="9" y1="22" x2="9" y2="22"></line>
              <line x1="15" y1="22" x2="15" y2="22"></line>
              <line x1="12" y1="6" x2="12" y2="6"></line>
              <line x1="12" y1="10" x2="12" y2="10"></line>
              <line x1="12" y1="14" x2="12" y2="14"></line>
              <line x1="12" y1="18" x2="12" y2="18"></line>
            </svg>
          </div>

          <span className="text-xl font-bold tracking-tight text-stone-800 hidden sm:block">
            Condo<span className="text-[#6B4E3D]">Admin</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/home"
            className={`${linkStyle} ${pathname === '/home' ? activeStyle : inactiveStyle}`}
          >
            Dashboard
          </Link>

          <Link
            href="/unidades"
            className={`${linkStyle} ${pathname.startsWith('/unidades') ? activeStyle : inactiveStyle}`}
          >
            Unidades
          </Link>

          <Link
            href="/moradores"
            className={`${linkStyle} ${pathname.startsWith('/moradores') ? activeStyle : inactiveStyle}`}
          >
            Moradores
          </Link>

          <Link
            href="/chamados"
            className={`${linkStyle} ${pathname.startsWith('/chamados') ? activeStyle : inactiveStyle}`}
          >
            Ocorrências
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pr-4 border-r border-stone-200">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-stone-900 leading-tight">
                {usuario?.nome || "Síndico"}
              </p>
              <p className="text-xs text-stone-500 font-medium italic">
                {usuario?.nomeCondominio || "Condomínio"}
              </p>
            </div>

            <div className="w-9 h-9 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-600 overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>

          <button
            title="Sair do sistema"
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-stone-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
          >
            <span className="text-sm font-bold hidden lg:block">SAIR</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}