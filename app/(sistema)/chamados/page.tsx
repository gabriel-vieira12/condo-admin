'use client';

import { Ocorrencia, Unidade } from "@/app/context/AuthContext";
import { OcorrenciaMock } from "@/app/mock/ocorrencia";
import { UnidadeMock } from "@/app/mock/unidade";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ChamadosPage() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [mapaUnidades, setMapaUnidades] = useState<Record<number, string>>({});

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const listaOcorrencias = await OcorrenciaMock.listarTodos();
      const listaUnidades = await UnidadeMock.listarTodos();

      const mapa: Record<number, string> = {};
      listaUnidades.forEach((u) => {
        if (u.id !== null) {
          mapa[u.id] = `Bloco ${u.bloco} - ${u.numero}`;
        }
      });

      setOcorrencias(listaOcorrencias);
      setMapaUnidades(mapa);
    } catch {
      console.error("Erro ao carregar ocorrências");
    }
  };

  const contarGravesAbertas = ocorrencias.filter(
    (o) => o.gravidade === "GRAVE" && o.status !== "RESOLVIDA"
  ).length;

  const alterarStatus = async (ocorrencia: Ocorrencia, novoStatus: string) => {
    await OcorrenciaMock.alterarStatus(ocorrencia.id!, novoStatus);
    carregarDados();
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">
              Gestão de <span className="text-[#6B4E3D]">Ocorrências</span>
            </h1>
            <p className="text-stone-500 font-medium italic">
              Controle de chamados e manutenção do condomínio.
            </p>
          </div>

          <Link
            href="/chamados/novo"
            className="px-5 py-3 bg-[#6B4E3D] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#6B4E3D]/20 hover:scale-105 transition-all"
          >
            + Nova Ocorrência
          </Link>
        </header>

        {contarGravesAbertas > 0 && (
          <div className="mb-8 bg-white border-l-8 border-red-500 rounded-2xl p-6 shadow-sm flex items-center gap-6">
            <div className="text-4xl">🚨</div>
            <div>
              <h3 className="text-red-600 font-black uppercase text-sm tracking-widest">
                Atenção Prioritária
              </h3>
              <p className="text-stone-600 font-semibold">
                Existem {contarGravesAbertas} ocorrências classificadas como{" "}
                <span className="text-red-600 underline">GRAVE</span> aguardando gestão.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-stone-50 border-b border-stone-100">
                <tr className="text-stone-400 text-[10px] uppercase tracking-widest font-black">
                  <th className="px-8 py-5">Descrição</th>
                  <th className="px-8 py-5">Unidade</th>
                  <th className="px-8 py-5">Gravidade</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {ocorrencias.map((ocorrencia) => (
                  <tr key={ocorrencia.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-8 py-6 font-bold text-stone-800">
                      {ocorrencia.descricao}
                    </td>

                    <td className="px-8 py-6 text-stone-700">
                      {ocorrencia.unidadeId ? mapaUnidades[ocorrencia.unidadeId] : "-"}
                    </td>

                    <td className="px-8 py-6">
                      <span
                        className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                          ocorrencia.gravidade === "GRAVE"
                            ? "bg-red-100 text-red-700"
                            : ocorrencia.gravidade === "MEDIA"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {ocorrencia.gravidade}
                      </span>
                    </td>

                    <td className="px-8 py-6">
                      <select
                        value={ocorrencia.status}
                        onChange={(e) => alterarStatus(ocorrencia, e.target.value)}
                        className="bg-stone-100 text-stone-700 text-xs font-bold py-2 px-3 rounded-xl border-none outline-none cursor-pointer"
                      >
                        <option value="ABERTA">Aberta</option>
                        <option value="EM_PROGRESSO">Em Progresso</option>
                        <option value="RESOLVIDA">Resolvida</option>
                      </select>
                    </td>

                    <td className="px-8 py-6 text-right">
                      <Link
                        href={`/chamados/${ocorrencia.id}/editar`}
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