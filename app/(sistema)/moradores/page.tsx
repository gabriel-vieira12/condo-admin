'use client';

import { Morador } from "@/app/context/AuthContext";
import { MoradorMock } from "@/app/mock/morador";
import { UnidadeMock } from "@/app/mock/unidade";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MoradoresPage() {
  const [moradores, setMoradores] = useState<Morador[]>([]);
  const [mapaUnidades, setMapaUnidades] = useState<Record<number, string>>({});

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const listaMoradores = await MoradorMock.listarTodos();
      const listaUnidades = await UnidadeMock.listarTodos();

      const mapa: Record<number, string> = {};
      listaUnidades.forEach((u) => {
        if (u.id !== null) {
          mapa[u.id] = `Bloco ${u.bloco} - ${u.numero}`;
        }
      });

      setMoradores(listaMoradores);
      setMapaUnidades(mapa);
    } catch {
      console.error("Erro ao carregar moradores");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">
              Gestão de <span className="text-[#6B4E3D]">Moradores</span>
            </h1>
            <p className="text-stone-500 font-medium italic">
              Cadastre e gerencie os moradores vinculados às unidades.
            </p>
          </div>

          <Link
            href="/moradores/novo"
            className="px-5 py-3 bg-[#6B4E3D] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#6B4E3D]/20 hover:scale-105 transition-all"
          >
            + Novo Morador
          </Link>
        </header>

        <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-stone-50 border-b border-stone-100">
                <tr className="text-stone-400 text-[10px] uppercase tracking-widest font-black">
                  <th className="px-8 py-5">ID</th>
                  <th className="px-8 py-5">Nome</th>
                  <th className="px-8 py-5">Contato</th>
                  <th className="px-8 py-5">Proprietário</th>
                  <th className="px-8 py-5">Unidade</th>
                  <th className="px-8 py-5 text-right">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {moradores.map((morador) => (
                  <tr key={morador.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-8 py-6 font-bold text-stone-500">#{morador.id}</td>
                    <td className="px-8 py-6 font-bold text-stone-800">{morador.nome}</td>
                    <td className="px-8 py-6 text-stone-700">{morador.contato}</td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                        morador.proprietario
                          ? "bg-green-100 text-green-700"
                          : "bg-stone-200 text-stone-600"
                      }`}>
                        {morador.proprietario ? "Sim" : "Não"}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-stone-700">
                      {morador.unidadeId ? mapaUnidades[morador.unidadeId] : "-"}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link
                        href={`/moradores/${morador.id}/editar`}
                        className="text-[#6B4E3D] font-bold text-xs uppercase hover:underline"
                      >
                        Editar
                      </Link>
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