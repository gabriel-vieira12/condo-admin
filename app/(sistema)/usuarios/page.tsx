'use client'
import { Usuario } from "@/app/context/AuthContext";
import { UsuarioMock } from "@/app/mock/usuario";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setUsuarios(await UsuarioMock.listarTodos());
    } catch {
      console.error("Erro ao carregar dados");
    }
  };

  const handlerAlterarStatus = async (usuario: Usuario) => {
    try {
      setUsuarios(usuariosAtuais =>
        usuariosAtuais.map(u =>
          u.id === usuario.id
            ? new Usuario(
                u.id,
                u.nome,
                u.email,
                u.status === "ATIVO" ? "INATIVO" : "ATIVO",
                u.nomeCondominio,
                u.senha
              )
            : u
        )
      );
    } catch {
      console.error("Erro ao alterar status");
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
  <table className="w-full text-left text-slate-800">
    <thead className="bg-slate-100 text-slate-700">
      <tr>
        <th className="p-4">ID</th>
        <th className="p-4">Nome</th>
        <th className="p-4">Email</th>
        <th className="p-4">Condomínio</th>
        <th className="p-4">Status</th>
        <th className="p-4">Ações</th>
      </tr>
    </thead>
    <tbody className="text-slate-800">
      {usuarios.map(usuario => (
        <tr key={usuario.id} className="border-t border-slate-200">
          <td className="p-4 font-medium">#{usuario.id}</td>
          <td className="p-4">{usuario.nome}</td>
          <td className="p-4">{usuario.email}</td>
          <td className="p-4">{usuario.nomeCondominio}</td>
          <td className="p-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                usuario.status === "ATIVO"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {usuario.status}
            </span>
          </td>
          <td className="p-4 flex gap-3">
            <Link
              href={`/usuarios/${usuario.id}/editar`}
              className="text-blue-600 hover:underline"
            >
              Editar
            </Link>

            <button
              onClick={() => handlerAlterarStatus(usuario)}
              className="text-orange-600 hover:underline"
            >
              Alterar status
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}