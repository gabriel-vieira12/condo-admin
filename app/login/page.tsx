'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();


    const handleLogin = async (formData:FormData) => {

        const email = formData.get("email");
        const senha = formData.get("senha");

        console.log(`Autenticado com email: ${email}`)

        router.push("/home")
        console.log(`Autenticado com a senha: ${senha}`)
    }

  return (
    // Container principal: ocupa a tela toda e centraliza o card
    <div className="min-h-screen bg-[#FFF] flex items-center justify-center p-4 font-sans">
      
      {/* O Card de Login */}
      <div className="w-full max-w-md">
        
        {/* Logo ou Nome do Sistema acima do card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#6B4E3D] text-white rounded-xl mb-4 shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">CondoAdmin</h1>
          <p className="text-stone-500 text-sm mt-2">Gestão profissional para síndicos</p>
        </div>

        {/* Estrutura do Formulário */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-100 p-8 md:p-10">
          <h2 className="text-xl font-bold text-stone-800 mb-6 text-center">Entrar no sistema</h2>
          
          <form action={handleLogin} className="space-y-5">
            {/* Campo E-mail */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-400 uppercase ml-1">E-mail</label>
              <input 
                name="email"
                type="email"
                placeholder="admin@condominio.com"
                className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all placeholder:text-stone-300"
                required
              />
            </div>

            {/* Campo Senha */}
            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-stone-400 uppercase">Senha</label>
                <Link href="#" className="text-[10px] font-bold text-[#6B4E3D] hover:underline uppercase">Esqueceu?</Link>
              </div>
              <input 
                name="senha"
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all placeholder:text-stone-300"
                required
              />
            </div>

            {/* Botão de Entrada */}
            <button 
              type="submit"
              className="w-full bg-[#6B4E3D] text-white font-bold py-4 rounded-2xl mt-4 hover:bg-[#5a4133] hover:shadow-lg hover:shadow-[#6B4E3D]/20 transition-all active:scale-[0.98]"
            >
              Acessar Painel
            </button>
          </form>

          {/* Rodapé do Card */}
          <div className="mt-8 pt-6 border-t border-stone-100 text-center">
            <p className="text-sm text-stone-500">
              Não tem uma conta? <br />
              <Link href="/cadastro" className="text-[#6B4E3D] font-bold hover:underline">Solicite seu acesso aqui</Link>
            </p>
          </div>
        </div>

        {/* Link para voltar para a Home */}
        <div className="text-center mt-8">
          <Link href="/" className="text-stone-400 text-xs hover:text-stone-600 transition-colors">
            ← Voltar para a página inicial
          </Link>
        </div>

      </div>
    </div>
  );
}