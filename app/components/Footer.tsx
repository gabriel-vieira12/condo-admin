'use client';

export default function Footer(){
    const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-stone-50 border-t border-stone-200 px-4 md:px-8 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Lado Esquerdo: Copyright */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-stone-500 font-medium">
            &copy; {currentYear} <span className="text-stone-800">Condo</span><span className="text-[#6B4E3D] font-bold">Admin</span>
          </p>
          <span className="hidden md:inline text-stone-300">|</span>
          <p className="text-sm text-stone-400 hidden md:block">Todos os direitos reservados</p>
        </div>

        {/* Lado Direito: Links com Ícones SVG */}
        <div className="flex items-center gap-6">
          
          {/* Link Suporte */}
          <a 
            href="#" 
            className="group flex items-center gap-2 text-sm text-stone-500 hover:text-[#6B4E3D] transition-all duration-200"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-4 h-4 text-stone-400 group-hover:text-[#6B4E3D]"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>Suporte</span>
          </a>

          {/* Link Termos de Uso */}
          <a 
            href="#" 
            className="group flex items-center gap-2 text-sm text-stone-500 hover:text-[#6B4E3D] transition-all duration-200"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-4 h-4 text-stone-400 group-hover:text-[#6B4E3D]"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>Termos de uso</span>
          </a>

        </div>

      </div>
    </footer>
    )
}