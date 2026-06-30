import Link from "next/link";
import MoradorForm from "../componentes/MoradorForm";

export default function CadastrarMorador() {
  return (
    <div className="min-h-screen bg-[#F9F8F6] p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/moradores"
            className="text-[#6B4E3D] font-bold text-sm uppercase hover:underline"
          >
            Voltar
          </Link>

          <h1 className="text-3xl font-black text-stone-900 tracking-tight mt-3">
            Cadastro de <span className="text-[#6B4E3D]">Novo Morador</span>
          </h1>

          <p className="text-stone-500 font-medium italic mt-2">
            Preencha os dados do morador e vincule a uma unidade.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-sm p-8 md:p-10">
          <MoradorForm />
        </div>
      </div>
    </div>
  );
}