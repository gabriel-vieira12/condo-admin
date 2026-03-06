'use client';

import Link from 'next/link';

export default function Home() {
  // Dados simulados baseados nas suas entidades
  const resumo = {
    totalUnidades: 48,
    totalMoradores: 156,
    ocorrenciasAbertas: 12,
    criticas: 2 // Ocorrências com gravidade "Grave"
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] p-4 md:p-8 font-sans">
      
      {/* HEADER DO CONDOMÍNIO (Regra de Negócio: Identificação do Síndico) */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">
            Olá, <span className="text-[#6B4E3D]">Síndico Gabriel</span>
          </h1>
          <p className="text-stone-500 font-medium italic">Condomínio Residencial Solar das Palmeiras</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/ocorrencias/nova" className="px-5 py-3 bg-[#6B4E3D] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#6B4E3D]/20 hover:scale-105 transition-all">
            + Nova Ocorrência
          </Link>
        </div>
      </header>

      {/* RECURSO ADICIONAL: ALERTA DE OCORRÊNCIA GRAVE */}
      {resumo.criticas > 0 && (
        <div className="mb-8 bg-white border-l-8 border-red-500 rounded-2xl p-6 shadow-sm flex items-center gap-6 animate-pulse">
          <div className="text-4xl">🚨</div>
          <div>
            <h3 className="text-red-600 font-black uppercase text-sm tracking-widest">Atenção Prioritária</h3>
            <p className="text-stone-600 font-semibold">Existem {resumo.criticas} ocorrências classificadas como <span className="text-red-600 underline">GRAVE</span> aguardando sua gestão.</p>
          </div>
          <Link href="/dashboard/ocorrencias" className="ml-auto text-xs font-bold text-stone-400 hover:text-stone-900 uppercase underline">
            Ver agora
          </Link>
        </div>
      )}

      {/* CARDS DE MÉTRICAS (Entidades: Unidades e Moradores) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Unidades", valor: resumo.totalUnidades, icon: "🏢" },
          { label: "Moradores", valor: resumo.totalMoradores, icon: "👥" },
          { label: "Chamados Abertos", valor: resumo.ocorrenciasAbertas, icon: "📋" },
          { label: "Taxa de Ocupação", valor: "92%", icon: "📈" },
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-4">{card.icon}</div>
            <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">{card.label}</p>
            <p className="text-3xl font-black text-stone-800">{card.valor}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LISTA DE OCORRÊNCIAS RECENTES */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-stone-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-stone-800">Últimas Ocorrências</h2>
            <Link href="/dashboard/ocorrencias" className="text-xs font-bold text-[#6B4E3D] hover:underline uppercase">Ver tudo</Link>
          </div>
          
          <div className="space-y-4">
            {/* Exemplo de item de ocorrência */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-stone-100 transition-colors">
              <div className="flex gap-4 items-center">
                <div className="w-2 h-2 rounded-full bg-red-500"></div> {/* Ponto de gravidade */}
                <div>
                  <p className="font-bold text-stone-800 text-sm">Vazamento na prumada principal</p>
                  <p className="text-xs text-stone-400">Bloco A - Ap 402</p>
                </div>
              </div>
              <span className="text-[10px] font-black bg-stone-200 text-stone-600 px-2 py-1 rounded-md uppercase">Aberta</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-stone-100 transition-colors">
              <div className="flex gap-4 items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div>
                  <p className="font-bold text-stone-800 text-sm">Barulho excessivo (Salão de Festas)</p>
                  <p className="text-xs text-stone-400">Área Comum</p>
                </div>
              </div>
              <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-1 rounded-md uppercase">Em Progresso</span>
            </div>
          </div>
        </div>

        {/* ATALHOS RÁPIDOS (Foco no Síndico) */}
        <div className="space-y-6">
          <div className="bg-[#6B4E3D] text-white rounded-[2.5rem] p-8 shadow-xl">
            <h2 className="text-lg font-bold mb-4">Gestão Rápida</h2>
            <div className="grid gap-3">
              <Link href="/chamados" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all text-sm font-medium">
                <span>🏢</span> Gerenciar Unidades
              </Link>
              <Link href="/moradores" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all text-sm font-medium">
                <span>👥</span> Lista de Moradores
              </Link>
              <Link href="/configuracoes" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all text-sm font-medium">
                <span>⚙️</span> Configurações da Conta
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}