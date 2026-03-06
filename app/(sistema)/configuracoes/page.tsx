'use client';

export default function ConfiguracoesPage() {
  return (
    <div className="min-h-screen bg-[#F9F8F6] p-4 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-10">
          <h1 className="text-4xl font-black text-stone-900 tracking-tight">
            Configurações da <span className="text-[#6B4E3D]">Conta</span>
          </h1>
          <p className="text-stone-500 mt-2">Gerencie seus dados de acesso e as informações do condomínio.</p>
        </header>

        <div className="grid gap-8">
          
          {/* SEÇÃO: DADOS DO CONDOMÍNIO (Regra de Negócio Central) */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🏢</span>
              <h2 className="text-xl font-bold text-stone-800">Dados do Condomínio</h2>
            </div>
            
            <form className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-400 uppercase ml-1">Nome do Condomínio</label>
                <input 
                  type="text" 
                  defaultValue="Residencial Solar das Palmeiras"
                  className="w-full px-5 py-4 rounded-2xl bg-[#F9F8F6] border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all font-medium text-stone-700" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-400 uppercase ml-1">CNPJ (Opcional)</label>
                <input 
                  type="text" 
                  placeholder="00.000.000/0000-00"
                  className="w-full px-5 py-4 rounded-2xl bg-[#F9F8F6] border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all font-medium text-stone-700" 
                />
              </div>
            </form>
          </div>

          {/* SEÇÃO: PERFIL DO SÍNDICO */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">👤</span>
              <h2 className="text-xl font-bold text-stone-800">Perfil do Síndico</h2>
            </div>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase ml-1">Seu Nome</label>
                  <input 
                    type="text" 
                    defaultValue="Gabriel Rodrigues Vieira"
                    className="w-full px-5 py-4 rounded-2xl bg-[#F9F8F6] border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all font-medium text-stone-700" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase ml-1">E-mail de Acesso</label>
                  <input 
                    type="email" 
                    defaultValue="gabriel@admin.com"
                    className="w-full px-5 py-4 rounded-2xl bg-[#F9F8F6] border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all font-medium text-stone-700" 
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <h3 className="text-sm font-bold text-stone-800 mb-4 uppercase tracking-wider">Alterar Senha</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <input 
                    type="password" 
                    placeholder="Nova senha" 
                    className="w-full px-5 py-4 rounded-2xl bg-[#F9F8F6] border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all" 
                  />
                  <input 
                    type="password" 
                    placeholder="Confirmar nova senha" 
                    className="w-row px-5 py-4 rounded-2xl bg-[#F9F8F6] border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all" 
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 pt-6">
                <button type="submit" className="px-10 py-4 bg-[#6B4E3D] text-white font-bold rounded-2xl hover:bg-[#5a4133] shadow-lg shadow-[#6B4E3D]/20 transition-all text-center">
                  Salvar Alterações
                </button>
                <button type="button" className="px-10 py-4 bg-white text-red-500 border border-red-100 font-bold rounded-2xl hover:bg-red-50 transition-all text-center">
                  Sair da Conta
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}