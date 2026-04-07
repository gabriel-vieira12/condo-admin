'use client';

import { Morador, Unidade } from "@/app/context/AuthContext";
import { MoradorMock } from "@/app/mock/morador";
import { UnidadeMock } from "@/app/mock/unidade";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MoradorFormProps {
  moradorExistente?: Morador;
}

export default function MoradorForm({ moradorExistente }: MoradorFormProps) {
  const [morador, setMorador] = useState<Morador>(
    moradorExistente || new Morador(null, "", "", false, null)
  );

  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const router = useRouter();

  useEffect(() => {
    carregarUnidades();
  }, []);

  const carregarUnidades = async () => {
    const lista = await UnidadeMock.listarTodos();
    setUnidades(lista);
  };

  const handleSalvar = async () => {
    await MoradorMock.salvar(morador);
    alert("Morador salvo com sucesso!");
    router.push("/moradores");
  };

  return (
    <form action={handleSalvar} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-stone-700">Nome</label>
          <input
            type="text"
            required
            value={morador.nome}
            onChange={(e) =>
              setMorador(
                new Morador(
                  morador.id,
                  e.target.value,
                  morador.contato,
                  morador.proprietario,
                  morador.unidadeId
                )
              )
            }
            placeholder="Nome do morador"
            className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 focus:ring-2 focus:ring-[#6B4E3D] transition-all outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-stone-700">Contato</label>
          <input
            type="text"
            required
            value={morador.contato}
            onChange={(e) =>
              setMorador(
                new Morador(
                  morador.id,
                  morador.nome,
                  e.target.value,
                  morador.proprietario,
                  morador.unidadeId
                )
              )
            }
            placeholder="Telefone ou contato"
            className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 focus:ring-2 focus:ring-[#6B4E3D] transition-all outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-stone-700">Unidade</label>
          <select
            required
            value={morador.unidadeId ?? ""}
            onChange={(e) =>
              setMorador(
                new Morador(
                  morador.id,
                  morador.nome,
                  morador.contato,
                  morador.proprietario,
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

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-stone-700">É proprietário?</label>
          <select
            value={morador.proprietario ? "sim" : "nao"}
            onChange={(e) =>
              setMorador(
                new Morador(
                  morador.id,
                  morador.nome,
                  morador.contato,
                  e.target.value === "sim",
                  morador.unidadeId
                )
              )
            }
            className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 focus:ring-2 focus:ring-[#6B4E3D] transition-all outline-none"
          >
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
        </div>

        <div className="md:col-span-2 flex items-center justify-end gap-6 pt-6 mt-6 border-t border-stone-100">
          <Link
            href="/moradores"
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