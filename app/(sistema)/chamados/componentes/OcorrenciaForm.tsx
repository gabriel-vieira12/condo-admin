'use client';

import { Ocorrencia, Unidade } from "@/app/context/AuthContext";
import { OcorrenciaService } from "@/app/servicos/ocorrenciaService";
import { UnidadeService } from "@/app/servicos/unidadeService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface OcorrenciaFormProps {
  ocorrenciaExistente?: Ocorrencia;
}

export default function OcorrenciaForm({ ocorrenciaExistente }: OcorrenciaFormProps) {
  const [ocorrencia, setOcorrencia] = useState<Ocorrencia>(
    ocorrenciaExistente || new Ocorrencia(null, "", "BAIXA", "ABERTA", null)
  );

  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const router = useRouter();

  useEffect(() => {
    carregarUnidades();
  }, []);

  const carregarUnidades = async () => {
    try {
      setUnidades(await UnidadeService.listarTodos());
    } catch {
      console.error("Erro ao carregar unidades");
    }
  };

  const handleSalvar = async () => {
    if (ocorrencia.id) {
      await OcorrenciaService.atualizar(ocorrencia.id, ocorrencia);
      alert("Ocorrência atualizada com sucesso!");
    } else {
      await OcorrenciaService.salvar(ocorrencia);

      if (ocorrencia.gravidade === "GRAVE") {
        alert("Atenção: ocorrência grave registrada!");
      } else {
        alert("Ocorrência salva com sucesso!");
      }
    }

    router.push("/chamados");
  };

  return (
    <form action={handleSalvar} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-stone-700">
            Descrição
          </label>
          <textarea
            required
            value={ocorrencia.descricao}
            onChange={(e) =>
              setOcorrencia(
                new Ocorrencia(
                  ocorrencia.id,
                  e.target.value,
                  ocorrencia.gravidade,
                  ocorrencia.status,
                  ocorrencia.unidadeId
                )
              )
            }
            placeholder="Descreva a ocorrência"
            className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 focus:ring-2 focus:ring-[#6B4E3D] transition-all outline-none min-h-32"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-stone-700">
            Gravidade
          </label>
          <select
            value={ocorrencia.gravidade}
            onChange={(e) =>
              setOcorrencia(
                new Ocorrencia(
                  ocorrencia.id,
                  ocorrencia.descricao,
                  e.target.value,
                  ocorrencia.status,
                  ocorrencia.unidadeId
                )
              )
            }
            className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 focus:ring-2 focus:ring-[#6B4E3D] transition-all outline-none"
          >
            <option value="BAIXA">Baixa</option>
            <option value="MEDIA">Média</option>
            <option value="GRAVE">Grave</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-stone-700">
            Status
          </label>
          <select
            value={ocorrencia.status}
            onChange={(e) =>
              setOcorrencia(
                new Ocorrencia(
                  ocorrencia.id,
                  ocorrencia.descricao,
                  ocorrencia.gravidade,
                  e.target.value,
                  ocorrencia.unidadeId
                )
              )
            }
            className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 focus:ring-2 focus:ring-[#6B4E3D] transition-all outline-none"
          >
            <option value="ABERTA">Aberta</option>
            <option value="EM_PROGRESSO">Em Progresso</option>
            <option value="RESOLVIDA">Resolvida</option>
          </select>
        </div>

        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-stone-700">
            Unidade
          </label>
          <select
            required
            value={ocorrencia.unidadeId ?? ""}
            onChange={(e) =>
              setOcorrencia(
                new Ocorrencia(
                  ocorrencia.id,
                  ocorrencia.descricao,
                  ocorrencia.gravidade,
                  ocorrencia.status,
                  Number(e.target.value)
                )
              )
            }
            className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 focus:ring-2 focus:ring-[#6B4E3D] transition-all outline-none"
          >
            <option value="">Selecione uma unidade</option>
            {unidades.map((unidade) => (
              <option key={unidade.id} value={unidade.id ?? ""}>
                Bloco {unidade.bloco} - {unidade.numero}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 flex items-center justify-end gap-6 pt-6 mt-6 border-t border-stone-100">
          <Link
            href="/chamados"
            className="text-sm font-bold text-stone-400 hover:text-stone-600 transition-colors"
          >
            CANCELAR
          </Link>

          <button
            type="submit"
            className="px-10 py-3 bg-[#6B4E3D] hover:bg-[#5a4133] text-white font-bold rounded-xl shadow-lg shadow-[#6B4E3D]/20 transition-all active:scale-95"
          >
            SALVAR ALTERAÇÕES
          </button>
        </div>
      </div>
    </form>
  );
}