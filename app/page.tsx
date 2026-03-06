'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F9F8F6] flex flex-col font-sans">
      <main className="flex-1">
        
        {/* --- HERO SECTION COM GRADIENTE SUTIL --- */}
        <section className="relative overflow-hidden bg-white border-b border-stone-200">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(#6B4E3D_1px,transparent_1px)] [background-size:20px_20px]"></div>
          
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-28 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-[#6B4E3D] text-xs font-bold uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6B4E3D] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6B4E3D]"></span>
                </span>
                Nova Versão 2.0
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-stone-900 leading-[1.1] tracking-tight">
                A gestão do seu <br />
                <span className="text-[#6B4E3D]">Condomínio</span> em <br />
                um só lugar.
              </h1>
              
              <p className="text-xl text-stone-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Centralize moradores, unidades e chamados críticos com a elegância e a precisão que o seu trabalho exige.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {/* ALTERADO PARA LINK COM L MAIÚSCULO */}
                <Link href="/login" className="px-8 py-4 bg-[#6B4E3D] text-white rounded-2xl font-bold shadow-2xl shadow-[#6B4E3D]/30 hover:bg-[#5a4133] transition-all text-center">
                  Começar Agora
                </Link>
                <button className="px-8 py-4 bg-white text-stone-700 border border-stone-200 rounded-2xl font-bold hover:bg-stone-50 transition-all text-center">
                  Ver Demonstração
                </button>
              </div>
            </div>

            {/* CARD DE LOGIN REFINADO */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6B4E3D] to-stone-400 rounded-[2rem] blur opacity-20"></div>
              <div className="relative bg-white rounded-[2rem] shadow-2xl border border-stone-100 p-10">
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center border border-stone-100">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6B4E3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-stone-800 text-center mb-2">Acesso Restrito</h2>
                <p className="text-stone-400 text-center text-sm mb-8">Painel Administrativo CondoAdmin</p>
                
                <form className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-400 uppercase ml-1">E-mail</label>
                    <input type="email" placeholder="admin@condo.com" className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-400 uppercase ml-1">Senha</label>
                    <input type="password" placeholder="••••••••" className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all" />
                  </div>
                  <button className="w-full bg-[#6B4E3D] text-white font-bold py-4 rounded-2xl mt-4 hover:shadow-xl hover:shadow-[#6B4E3D]/20 transition-all">
                    Entrar no Sistema
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION: HISTÓRIA COM ASIDE VISUAL --- */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                   <div className="h-48 bg-stone-100 rounded-3xl"></div>
                   <div className="h-64 bg-[#6B4E3D]/10 rounded-3xl flex items-end p-6">
                      <span className="text-3xl font-bold text-[#6B4E3D]">98%</span>
                   </div>
                </div>
                <div className="space-y-4 pt-8">
                   <div className="h-64 bg-stone-200 rounded-3xl"></div>
                   <div className="h-48 bg-stone-800 rounded-3xl"></div>
                </div>
             </div>
             <div className="space-y-6">
                <h2 className="text-4xl font-bold text-stone-900 leading-tight italic">
                  "A tecnologia deve servir à convivência, não complicá-la."
                </h2>
                <div className="h-1 w-20 bg-[#6B4E3D]"></div>
                <p className="text-lg text-stone-600 leading-relaxed">
                  O CondoAdmin surgiu de uma frustração comum: a opacidade na gestão. Idealizamos um ecossistema onde cada centavo e cada ocorrência tivesse um rastro digital claro.
                </p>
                <p className="text-stone-500">
                  Hoje, ajudamos síndicos a gerenciarem múltiplos condomínios com a mesma facilidade que gerenciam uma única unidade.
                </p>
             </div>
          </div>
        </section>

        {/* --- SECTION: FEATURES (ENTIDADES) --- */}
        <section className="py-24 bg-[#F9F8F6]">
          <div className="max-w-7xl mx-auto px-4 text-center mb-16">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">A arquitetura da sua gestão</h2>
            <p className="text-stone-500 max-w-2xl mx-auto text-lg">Tudo o que você precisa para manter o condomínio em harmonia e conformidade.</p>
          </div>

          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
            {[
              { title: "Gestão de Unidades", icon: "🏢", desc: "Mapeamento completo de blocos e apartamentos com histórico de moradores." },
              { title: "Ocorrências Críticas", icon: "🚨", desc: "Sistema de triagem inteligente que alerta o síndico sobre casos graves via painel." },
              { title: "Moradores e Posse", icon: "👥", desc: "Distinção clara entre proprietário e inquilino para uma comunicação assertiva." }
            ].map((feature, i) => (
              <div key={i} className="group p-10 bg-white rounded-[2.5rem] border border-stone-200 hover:border-[#6B4E3D] transition-all hover:-translate-y-2">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-stone-800 mb-4">{feature.title}</h3>
                <p className="text-stone-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION: CONTATO & FORMULÁRIO --- */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-stone-900 tracking-tight">
                Entre em <span className="text-[#6B4E3D]">Contato</span>
              </h2>
              <p className="text-lg text-stone-500 leading-relaxed">
                Dúvidas sobre o sistema ou precisa de um suporte personalizado? Nossa equipe está à disposição.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-stone-600">
                  <span className="text-xl">📍</span>
                  <span>Av. Paulista, 1000 - São Paulo, SP</span>
                </div>
                <div className="flex items-center gap-4 text-stone-600">
                  <span className="text-xl">📧</span>
                  <span>contato@condoadmin.com</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F9F8F6] p-8 rounded-[2.5rem] border border-stone-100 shadow-sm">
              <form className="space-y-4">
                <input type="text" placeholder="Seu Nome" className="w-full px-5 py-4 rounded-2xl bg-white border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all" />
                <input type="email" placeholder="Seu E-mail" className="w-full px-5 py-4 rounded-2xl bg-white border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all" />
                <textarea rows={4} placeholder="Sua Mensagem" className="w-full px-5 py-4 rounded-2xl bg-white border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all resize-none"></textarea>
                <button type="submit" className="w-full bg-[#6B4E3D] text-white font-bold py-4 rounded-2xl hover:bg-[#5a4133] transition-all">
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}