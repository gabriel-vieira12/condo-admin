import Link from "next/link";
import UsuarioForm from "../componentes/UsuarioForm";

export default function CadastrarUsuario() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <Link href="/usuarios" className="text-blue-600 hover:underline">
          Voltar
        </Link>
        <h1 className="text-2xl font-bold mt-2">Cadastro de Novo Síndico</h1>
      </div>

      <UsuarioForm />
    </div>
  );
}