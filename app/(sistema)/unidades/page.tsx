'use client';

import { Unidade } from "@/app/context/AuthContext";
import { UnidadeService } from "@/app/servicos/unidadeService";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UnidadesPage() {
  const [unidades, setUnidades] = useState<Unidade[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setUnidades(await UnidadeService.listarTodos());
    } catch {
      console.error("Erro ao carregar unidades");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">
              Gestão de <span className="text-[#6B4E3D]">Unidades</span>
            </h1>
            <p className="text-stone-500 font-medium italic">
              Cadastre e gerencie os apartamentos do condomínio.
            </p>
          </div>

          <Link
            href="/unidades/novo"
            className="px-5 py-3 bg-[#6B4E3D] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#6B4E3D]/20 hover:scale-105 transition-all"
          >
            + Nova Unidade
          </Link>
        </header>

        <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-stone-50 border-b border-stone-100">
                <tr className="text-stone-400 text-[10px] uppercase tracking-widest font-black">
                  <th className="px-8 py-5">ID</th>
                  <th className="px-8 py-5">Bloco</th>
                  <th className="px-8 py-5">Número</th>
                  <th className="px-8 py-5 text-right">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {unidades.map((unidade) => (
                  <tr key={unidade.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-8 py-6 font-bold text-stone-500">
                      #{unidade.id}
                    </td>

                    <td className="px-8 py-6">
                      <p className="font-bold text-stone-800">{unidade.bloco}</p>
                    </td>

                    <td className="px-8 py-6">
                      <p className="font-bold text-stone-700">{unidade.numero}</p>
                    </td>

                    <td className="px-8 py-6 text-right">
                      <Link
                        href={`/unidades/${unidade.id}/editar`}
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