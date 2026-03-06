'use client';

import { useState } from 'react';

export default function Usuarios() {
  // Estado para alternar entre cadastro de Unidade e Morador
  const [tipoCadastro, setTipoCadastro] = useState<'unidade' | 'morador'>('unidade');

  return (
    <div className="min-h-screen bg-[#F9F8F6] font-sans p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* CABEÇALHO SIMPLES */}
        <header className="mb-12">
          <h1 className="text-4xl font-black text-stone-900 tracking-tight">
            Gestão de <span className="text-[#6B4E3D]">Cadastros</span>
          </h1>
          <p className="text-stone-500 mt-2">Administre as unidades e os moradores do seu condomínio.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* COLUNA DO FORMULÁRIO (Igual ao seu formulário de contato) */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-stone-200 shadow-sm">
            
            {/* SELETOR DE TIPO (Abas simples) */}
            <div className="flex gap-4 mb-8 bg-stone-100 p-2 rounded-2xl">
              <button 
                onClick={() => setTipoCadastro('unidade')}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${tipoCadastro === 'unidade' ? 'bg-[#6B4E3D] text-white' : 'text-stone-400'}`}
              >
                🏢 Unidade
              </button>
              <button 
                onClick={() => setTipoCadastro('morador')}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${tipoCadastro === 'morador' ? 'bg-[#6B4E3D] text-white' : 'text-stone-400'}`}
              >
                👥 Morador
              </button>
            </div>

            <form className="space-y-5">
              {tipoCadastro === 'unidade' ? (
                /* CAMPOS PARA UNIDADE */
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-400 uppercase ml-1">Bloco</label>
                    <input type="text" placeholder="Ex: Bloco A" className="w-full px-5 py-4 rounded-2xl bg-[#F9F8F6] border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-400 uppercase ml-1">Número</label>
                    <input type="text" placeholder="Ex: 102" className="w-full px-5 py-4 rounded-2xl bg-[#F9F8F6] border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all" />
                  </div>
                </>
              ) : (
                /* CAMPOS PARA MORADOR */
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-400 uppercase ml-1">Nome Completo</label>
                    <input type="text" placeholder="Nome do morador" className="w-full px-5 py-4 rounded-2xl bg-[#F9F8F6] border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-400 uppercase ml-1">Contato (E-mail ou Tel)</label>
                    <input type="text" placeholder="contato@email.com" className="w-full px-5 py-4 rounded-2xl bg-[#F9F8F6] border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-400 uppercase ml-1">Unidade</label>
                    <select className="w-full px-5 py-4 rounded-2xl bg-[#F9F8F6] border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-[#6B4E3D] outline-none appearance-none cursor-pointer">
                      <option>Selecione a unidade...</option>
                      <option>Bloco A - 101</option>
                      <option>Bloco B - 202</option>
                    </select>
                  </div>
                  {/* REGRA DE NEGÓCIO: PROPRIETÁRIO */}
                  <div className="flex items-center gap-3 p-4 bg-[#F9F8F6] rounded-2xl border border-stone-200">
                    <input type="checkbox" id="proprietario" className="w-5 h-5 accent-[#6B4E3D] cursor-pointer" />
                    <label htmlFor="proprietario" className="text-sm font-bold text-stone-600 cursor-pointer uppercase tracking-tight">Este morador é o Proprietário</label>
                  </div>
                </>
              )}

              <button type="submit" className="w-full bg-[#6B4E3D] text-white font-bold py-5 rounded-2xl mt-4 hover:bg-[#5a4133] shadow-lg shadow-[#6B4E3D]/20 transition-all">
                Salvar Cadastro
              </button>
            </form>
          </div>

          {/* COLUNA DE LISTAGEM (Visualização simples) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-stone-800 tracking-tight">Cadastros Realizados</h2>
            
            {/* Exemplo de Card de Unidade/Morador na lista */}
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white p-6 rounded-3xl border border-stone-200 flex justify-between items-center group hover:border-[#6B4E3D] transition-all">
                  <div>
                    <p className="text-xs font-bold text-stone-400 uppercase mb-1">
                      {tipoCadastro === 'unidade' ? 'Apartamento' : 'Morador'}
                    </p>
                    <h3 className="text-lg font-bold text-stone-800">
                      {tipoCadastro === 'unidade' ? `Bloco A - Unidade 10${item}` : `Morador de Teste ${item}`}
                    </h3>
                    {tipoCadastro === 'morador' && (
                      <span className="text-[10px] font-black bg-[#6B4E3D]/10 text-[#6B4E3D] px-2 py-1 rounded-md uppercase mt-2 inline-block">
                        Proprietário
                      </span>
                    )}
                  </div>
                  <button className="text-stone-300 hover:text-red-500 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}