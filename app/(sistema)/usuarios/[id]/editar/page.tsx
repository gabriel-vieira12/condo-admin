'use client'
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UsuarioForm from "../../componentes/UsuarioForm";
import { Usuario } from "@/app/types/usuarios";
import { buscarPorId } from "@/app/servicos/usuarioService";

export default function EditarUsuario(){

    const params = useParams()
    const router = useRouter()
    const codigo = Number(params.codigo);

    const [usuario,setUsuario] = useState<Usuario|null>(null);

    useEffect(()=>
    {
        buscarDados();
    },[]);

    const buscarDados = async ()=>{
        debugger;
      const user = await buscarPorId(codigo)

      if (user) setUsuario(user)
        else router.push("/usuarios")
    }
    
    if(!usuario) return(<div className="p-8">Carregando dados...</div>)

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link href="/usuarios" className="text-blue-600 hover:underline">
          Voltar
        </Link>
        <h1 className="text-2xl font-bold mt-2">Editar Síndico #{codigo}</h1>
      </div>

      <UsuarioForm usuarioExistente={usuario} />
    </div>
  );
}