'use client';

import { useState } from 'react';

export default function GestaoChamados() {
  // Simulação das ocorrências baseadas no seu escopo
  const chamados = [
    { id: 1, desc: "Vazamento no corredor", unidade: "Bloco A - 102", gravidade: "Grave", status: "Aberta" },
    { id: 2, desc: "Lâmpada queimada", unidade: "Bloco B - 205", gravidade: "Baixa", status: "Resolvida" },
    { id: 3, desc: "Barulho após às 22h", unidade: "Bloco C - 301", gravidade: "Média", status: "Em Progresso" },
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F6] font-sans p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* CABEÇALHO */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-stone-900 tracking-tight">
              Gestão de <span className="text-[#6B4E3D]">Chamados</span>
            </h1>
            <p className="text-stone-500 mt-2">Controle de ocorrências e manutenção do condomínio.</p>
          </div>
          <button className="px-6 py-4 bg-[#6B4E3D] text-white rounded-2xl font-bold shadow-lg shadow-[#6B4E3D]/20 hover:bg-[#5a4133] transition-all">
            + Abrir Novo Chamado
          </button>
        </header>

        {/* RECURSO ADICIONAL: ALERTA DE GRAVIDADE "GRAVE" */}
        <div className="mb-10 p-6 bg-white border-l-8 border-red-500 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🚨</span>
            <div>
              <h3 className="text-red-600 font-black uppercase text-xs tracking-widest">Alerta de Crise</h3>
              <p className="text-stone-600 font-bold">Há chamados com gravidade <span className="underline">GRAVE</span> pendentes de resolução.</p>
            </div>
          </div>
        </div>

        {/* LISTAGEM DE CHAMADOS (Estilo tabela limpa) */}
        <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-stone-50 border-b border-stone-100">
                <tr className="text-stone-400 text-[10px] uppercase tracking-widest font-black">
                  <th className="px-8 py-5">Descrição / Unidade</th>
                  <th className="px-8 py-5">Gravidade</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {chamados.map((chamado) => (
                  <tr key={chamado.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-bold text-stone-800">{chamado.desc}</p>
                      <p className="text-xs text-stone-400 font-medium">{chamado.unidade}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                        chamado.gravidade === 'Grave' ? 'bg-red-100 text-red-600' : 
                        chamado.gravidade === 'Média' ? 'bg-orange-100 text-orange-600' : 
                        'bg-green-100 text-green-600'
                      }`}>
                        {chamado.gravidade}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <select className="bg-stone-100 text-stone-600 text-xs font-bold py-2 px-3 rounded-xl border-none outline-none cursor-pointer">
                        <option>{chamado.status}</option>
                        <option>Aberta</option>
                        <option>Em Progresso</option>
                        <option>Resolvida</option>
                      </select>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-[#6B4E3D] font-bold text-xs uppercase hover:underline">
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}