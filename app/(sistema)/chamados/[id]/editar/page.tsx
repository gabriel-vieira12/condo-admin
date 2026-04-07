'use client';

import { Ocorrencia } from "@/app/context/AuthContext";
import { OcorrenciaMock } from "@/app/mock/ocorrencia";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OcorrenciaForm from "../../componentes/OcorrenciaForm";

export default function EditarOcorrencia() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);
  const [ocorrencia, setOcorrencia] = useState<Ocorrencia | null>(null);

  useEffect(() => {
    buscarDados();
  }, []);

  const buscarDados = async () => {
    const ocorrenciaEncontrada = await OcorrenciaMock.buscarPorId(id);

    if (ocorrenciaEncontrada) {
      setOcorrencia(ocorrenciaEncontrada);
    } else {
      router.push("/chamados");
    }
  };

  if (!ocorrencia) {
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
            href="/chamados"
            className="text-[#6B4E3D] font-bold text-sm uppercase hover:underline"
          >
            Voltar
          </Link>

          <h1 className="text-3xl font-black text-stone-900 tracking-tight mt-3">
            Editar <span className="text-[#6B4E3D]">Ocorrência #{id}</span>
          </h1>

          <p className="text-stone-500 font-medium italic mt-2">
            Atualize os dados da ocorrência selecionada.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-sm p-8 md:p-10">
          <OcorrenciaForm ocorrenciaExistente={ocorrencia} />
        </div>
      </div>
    </div>
  );
}