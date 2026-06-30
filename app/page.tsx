'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F9F8F6] flex flex-col font-sans">
      <main className="flex-1">
        <section className="relative overflow-hidden bg-white border-b border-stone-200">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(#6B4E3D_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8 text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-black text-stone-900 leading-[1.1] tracking-tight">
                Gestão de <span className="text-[#6B4E3D]">Condomínios</span> com
                mais controle e organização.
              </h1>

              <p className="text-xl text-stone-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Gerencie unidades, moradores e ocorrências em um único painel,
                com foco no trabalho do síndico e nas necessidades reais do condomínio.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/login"
                  className="px-8 py-4 bg-[#6B4E3D] text-white rounded-2xl font-bold shadow-lg shadow-[#6B4E3D]/20 hover:bg-[#5a4133] transition-all text-center"
                >
                  Acessar Sistema
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-[2rem] shadow-xl border border-stone-100 p-8 md:p-10">
                <h2 className="text-2xl font-bold text-stone-800 mb-6">
                  O que você pode gerenciar
                </h2>

                <div className="grid gap-4">
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-100">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🏢</span>
                      <h3 className="font-bold text-stone-800">Unidades</h3>
                    </div>
                    <p className="text-stone-500 text-sm">
                      Controle de blocos e apartamentos cadastrados no condomínio.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-100">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">👥</span>
                      <h3 className="font-bold text-stone-800">Moradores</h3>
                    </div>
                    <p className="text-stone-500 text-sm">
                      Cadastro de moradores com vínculo à unidade e indicação de proprietário.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-100">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🚨</span>
                      <h3 className="font-bold text-stone-800">Ocorrências</h3>
                    </div>
                    <p className="text-stone-500 text-sm">
                      Registro e acompanhamento de ocorrências com gravidade e status.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F9F8F6]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">
                Funcionalidades principais
              </h2>
              <p className="text-stone-500 max-w-2xl mx-auto text-lg">
                Um sistema pensado para facilitar o dia a dia da gestão condominial.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-white rounded-[2rem] border border-stone-200 shadow-sm">
                <div className="text-4xl mb-5">🏢</div>
                <h3 className="text-xl font-bold text-stone-800 mb-3">
                  Cadastro de Unidades
                </h3>
                <p className="text-stone-500 leading-relaxed">
                  Estruture os apartamentos do condomínio com bloco e número.
                </p>
              </div>

              <div className="p-8 bg-white rounded-[2rem] border border-stone-200 shadow-sm">
                <div className="text-4xl mb-5">👥</div>
                <h3 className="text-xl font-bold text-stone-800 mb-3">
                  Gestão de Moradores
                </h3>
                <p className="text-stone-500 leading-relaxed">
                  Relacione moradores às unidades e identifique quem é proprietário.
                </p>
              </div>

              <div className="p-8 bg-white rounded-[2rem] border border-stone-200 shadow-sm">
                <div className="text-4xl mb-5">📋</div>
                <h3 className="text-xl font-bold text-stone-800 mb-3">
                  Painel de Ocorrências
                </h3>
                <p className="text-stone-500 leading-relaxed">
                  Acompanhe chamados por prioridade e status de atendimento.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}