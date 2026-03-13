'use client'
import { Usuario } from "@/app/context/AuthContext";
import { UsuarioMock } from "@/app/mock/usuario";
import Link from "next/link";
import { useEffect, useState } from "react";
 
export default function UsuariosPage(){
 
  const [usuarios,setUsuarios] = useState<Usuario[]>([]);
 
  useEffect(() => {
    carregarDados();
  },[]);
 
  const carregarDados = async ()=>{
    try{
        setUsuarios(await UsuarioMock.listarTodos());
    }catch{
        console.error("Erro ao carregar dados");
    }
  }
 
  const handlerAlterarStatus = async (usuario: Usuario) => {
    try{
      setUsuarios( usuariosAtuais => usuariosAtuais.map(u => u.codigo === usuario.codigo ? new Usuario(u.codigo, u.nome, u.cpf, !u.ativo) : u ))
    }catch{
        console.error("Erro ao alterar status");
    }
  };
 
  return(
    <div>
      <div>
        <h1>Gestão usuários</h1>
        <Link href="/usuarios/novo" className="bg">+ Novo Usuario</Link>
      </div>
 
      <div className="overflow-x-auto">
        <table>
          <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
          </thead>
          <tbody>
            {
                usuarios.map(usuario => (
                    <tr key={(usuario.codigo)}>
                        <td>#{usuario.codigo}</td>
                        <td>{usuario.nome}</td>
                        <td>{usuario.cpf}</td>
                        <td>{usuario.ativo ? 'Ativo' : 'Inativo'}</td>
                        <td>
                            <Link href={'/usuarios/$(usuarios.codigo)/editar'}>Editar</Link>
                        </td>
                    </tr>
                ))
            }
           
          </tbody>
        </table>
      </div>
    </div>
  )
 
}