'use client';

import { useAuth } from "@/app/context/AuthContext";
import { MoradorMock } from "@/app/mock/morador";
import { OcorrenciaMock } from "@/app/mock/ocorrencia";
import { UnidadeMock } from "@/app/mock/unidade";
import Link from "next/link";
import { useEffect, useState } from "react";

type ResumoType = {
  totalUnidades: number;
  totalMoradores: number;
  ocorrenciasAbertas: number;
  criticas: number;
};

type OcorrenciaView = {
  id: number | null;
  descricao: string;
  gravidade: string;
  status: string;
  unidadeLabel: string;
};

export default function Home() {
  const { usuario } = useAuth();

  const [resumo, setResumo] = useState<ResumoType>({
    totalUnidades: 0,
    totalMoradores: 0,
    ocorrenciasAbertas: 0,
    criticas: 0
  });

  const [ultimasOcorrencias, setUltimasOcorrencias] = useState<OcorrenciaView[]>([]);

  useEffect(() => {
    carregarDashboard();
  }, []);

  const carregarDashboard = async () => {
    try {
      const unidades = await UnidadeMock.listarTodos();
      const moradores = await MoradorMock.listarTodos();
      const ocorrencias = await OcorrenciaMock.listarTodos();

      const mapaUnidades: Record<number, string> = {};
      unidades.forEach((u) => {
        if (u.id !== null) {
          mapaUnidades[u.id] = `Bloco ${u.bloco} - Ap ${u.numero}`;
        }
      });

      const ocorrenciasAbertas = ocorrencias.filter(
        (o) => o.status === "ABERTA" || o.status === "EM_PROGRESSO"
      ).length;

      const criticas = ocorrencias.filter(
        (o) => o.gravidade === "GRAVE" && o.status !== "RESOLVIDA"
      ).length;

      setResumo({
        totalUnidades: unidades.length,
        totalMoradores: moradores.length,
        ocorrenciasAbertas,
        criticas
      });

      const ultimas = ocorrencias.slice(0, 5).map((o) => ({
        id: o.id,
        descricao: o.descricao,
        gravidade: o.gravidade,
        status: o.status,
        unidadeLabel: o.unidadeId ? mapaUnidades[o.unidadeId] || "Unidade não encontrada" : "Sem unidade"
      }));

      setUltimasOcorrencias(ultimas);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    }
  };

  const formatarStatus = (status: string) => {
    if (status === "ABERTA") return "Aberta";
    if (status === "EM_PROGRESSO") return "Em Progresso";
    if (status === "RESOLVIDA") return "Resolvida";
    return status;
  };

  const corStatus = (status: string) => {
    if (status === "ABERTA") return "bg-stone-200 text-stone-600";
    if (status === "EM_PROGRESSO") return "bg-blue-100 text-blue-600";
    if (status === "RESOLVIDA") return "bg-green-100 text-green-700";
    return "bg-stone-200 text-stone-600";
  };

  const corGravidade = (gravidade: string) => {
    if (gravidade === "GRAVE") return "bg-red-500";
    if (gravidade === "MEDIA") return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] p-4 md:p-8 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">
            Olá, <span className="text-[#6B4E3D]">{usuario?.nome || "Síndico"}</span>
          </h1>
          <p className="text-stone-500 font-medium italic">
            {usuario?.nomeCondominio || "Condomínio não identificado"}
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/chamados/novo"
            className="px-5 py-3 bg-[#6B4E3D] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#6B4E3D]/20 hover:scale-105 transition-all"
          >
            + Nova Ocorrência
          </Link>
        </div>
      </header>

      {resumo.criticas > 0 && (
        <div className="mb-8 bg-white border-l-8 border-red-500 rounded-2xl p-6 shadow-sm flex items-center gap-6">
          <div className="text-4xl">🚨</div>
          <div>
            <h3 className="text-red-600 font-black uppercase text-sm tracking-widest">
              Atenção Prioritária
            </h3>
            <p className="text-stone-600 font-semibold">
              Existem {resumo.criticas} ocorrências classificadas como{" "}
              <span className="text-red-600 underline">GRAVE</span> aguardando sua gestão.
            </p>
          </div>
          <Link
            href="/chamados"
            className="ml-auto text-xs font-bold text-stone-400 hover:text-stone-900 uppercase underline"
          >
            Ver agora
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Unidades", valor: resumo.totalUnidades, icon: "🏢" },
          { label: "Moradores", valor: resumo.totalMoradores, icon: "👥" },
          { label: "Chamados Abertos", valor: resumo.ocorrenciasAbertas, icon: "📋" },
          {
            label: "Ocorrências Graves",
            valor: resumo.criticas,
            icon: "🚨"
          }
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-4">{card.icon}</div>
            <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">
              {card.label}
            </p>
            <p className="text-3xl font-black text-stone-800">{card.valor}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-stone-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-stone-800">Últimas Ocorrências</h2>
            <Link
              href="/chamados"
              className="text-xs font-bold text-[#6B4E3D] hover:underline uppercase"
            >
              Ver tudo
            </Link>
          </div>

          <div className="space-y-4">
            {ultimasOcorrencias.length > 0 ? (
              ultimasOcorrencias.map((ocorrencia) => (
                <div
                  key={ocorrencia.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-stone-100 transition-colors"
                >
                  <div className="flex gap-4 items-center">
                    <div className={`w-2 h-2 rounded-full ${corGravidade(ocorrencia.gravidade)}`}></div>
                    <div>
                      <p className="font-bold text-stone-800 text-sm">
                        {ocorrencia.descricao}
                      </p>
                      <p className="text-xs text-stone-400">{ocorrencia.unidadeLabel}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-black px-2 py-1 rounded-md uppercase ${corStatus(
                      ocorrencia.status
                    )}`}
                  >
                    {formatarStatus(ocorrencia.status)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-stone-400 text-sm">Nenhuma ocorrência cadastrada.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#6B4E3D] text-white rounded-[2.5rem] p-8 shadow-xl">
            <h2 className="text-lg font-bold mb-4">Gestão Rápida</h2>
            <div className="grid gap-3">
              <Link
                href="/unidades"
                className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all text-sm font-medium"
              >
                <span>🏢</span> Gerenciar Unidades
              </Link>

              <Link
                href="/moradores"
                className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all text-sm font-medium"
              >
                <span>👥</span> Lista de Moradores
              </Link>

              <Link
                href="/chamados"
                className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all text-sm font-medium"
              >
                <span>📋</span> Gerenciar Ocorrências
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}