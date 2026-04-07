import Link from "next/link";
import UnidadeForm from "../componentes/UnidadeForm";

export default function CadastrarUnidade() {
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
            Cadastro de <span className="text-[#6B4E3D]">Nova Unidade</span>
          </h1>

          <p className="text-stone-500 font-medium italic mt-2">
            Preencha os dados da unidade que será cadastrada no condomínio.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-sm p-8 md:p-10">
          <UnidadeForm />
        </div>
      </div>
    </div>
  );
}