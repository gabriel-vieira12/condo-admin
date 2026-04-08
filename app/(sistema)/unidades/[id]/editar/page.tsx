'use client';

import { Unidade } from "@/app/context/AuthContext";
import { UnidadeService } from "@/app/servicos/unidadeService";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UnidadeForm from "../../componentes/UnidadeForm";

export default function EditarUnidade() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);
  const [unidade, setUnidade] = useState<Unidade | null>(null);

  useEffect(() => {
    buscarDados();
  }, []);

  const buscarDados = async () => {
    const unidadeEncontrada = await UnidadeService.buscarPorId(id);

    if (unidadeEncontrada) {
      setUnidade(unidadeEncontrada);
    } else {
      router.push("/unidades");
    }
  };

  if (!unidade) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] p-8 font-sans">
        <div className="max-w-4xl mx-auto text-stone-500 font-medium">
          Carregando dados...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/unidades"
            className="text-[#6B4E3D] font-bold text-sm uppercase hover:underline"
          >
            Voltar
          </Link>

          <h1 className="text-3xl font-black text-stone-900 tracking-tight mt-3">
            Editar <span className="text-[#6B4E3D]">Unidade #{id}</span>
          </h1>

          <p className="text-stone-500 font-medium italic mt-2">
            Atualize os dados da unidade selecionada.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-sm p-8 md:p-10">
          <UnidadeForm unidadeExistente={unidade} />
        </div>
      </div>
    </div>
  );
}