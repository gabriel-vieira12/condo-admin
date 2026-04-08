'use client';

import { Unidade } from "@/app/context/AuthContext";
import { UnidadeService } from "@/app/servicos/unidadeService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UnidadeFormProps {
  unidadeExistente?: Unidade;
}

export default function UnidadeForm({ unidadeExistente }: UnidadeFormProps) {
  const [unidade, setUnidade] = useState<Unidade>(
    unidadeExistente || new Unidade(null, "", "")
  );

  const router = useRouter();

  const handleChange = (campo: "bloco" | "numero", valor: string) => {
    setUnidade((prev) =>
      new Unidade(
        prev.id,
        campo === "bloco" ? valor : prev.bloco,
        campo === "numero" ? valor : prev.numero
      )
    );
  };

  const handleSalvar = async () => {
    if (unidade.id) {
        await UnidadeService.atualizar(unidade.id, unidade);
        alert("Unidade atualizada com sucesso!");
    } else {
        await UnidadeService.salvar(unidade);
        alert("Unidade salva com sucesso!");
    }

    router.push("/unidades");
};

  return (
    <form action={handleSalvar} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-stone-700">
            Bloco
          </label>
          <input
            type="text"
            required
            value={unidade.bloco}
            onChange={(e) => handleChange("bloco", e.target.value)}
            placeholder="Ex: A"
            className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 focus:ring-2 focus:ring-[#6B4E3D] transition-all outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-stone-700">
            Número
          </label>
          <input
            type="text"
            required
            value={unidade.numero}
            onChange={(e) => handleChange("numero", e.target.value)}
            placeholder="Ex: 101"
            className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 focus:ring-2 focus:ring-[#6B4E3D] transition-all outline-none"
          />
        </div>

        <div className="md:col-span-2 flex items-center justify-end gap-6 pt-6 mt-6 border-t border-stone-100">
          <Link
            href="/unidades"
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