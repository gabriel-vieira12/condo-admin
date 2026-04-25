'use client'
import { UsuarioMock } from "@/app/mock/usuario";
import { Usuario, UsuarioFormProps } from "@/app/types/usuarios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"


export default function UsuarioForm({ usuarioExistente }: UsuarioFormProps) {
    const [usuario, setUsuario] = useState<Usuario>(
        usuarioExistente || new Usuario(null, '', '', 'ATIVO', '', '')
    );

    const router = useRouter();

    const handleChange = (
        campo: 'nome' | 'email' | 'nomeCondominio' | 'senha',
        valor: string
    ) => {
        setUsuario(prev =>
            new Usuario(
                prev.id,
                campo === 'nome' ? valor : prev.nome,
                campo === 'email' ? valor : prev.email,
                prev.status,
                campo === 'nomeCondominio' ? valor : prev.nomeCondominio,
                campo === 'senha' ? valor : prev.senha
            )
        )
    }

    const handleSalvar = async () => {
        await UsuarioMock.salvar(usuario);

        alert("Síndico salvo com sucesso!");

        router.push("/usuarios");
    }

    return (
        <form action={handleSalvar} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                        Nome completo
                    </label>
                    <input
                        type="text"
                        required
                        value={usuario.nome}
                        onChange={(e) => handleChange('nome', e.target.value)}
                        placeholder="João da Silva"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        value={usuario.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="joao@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                        Nome do Condomínio
                    </label>
                    <input
                        type="text"
                        required
                        value={usuario.nomeCondominio}
                        onChange={(e) => handleChange('nomeCondominio', e.target.value)}
                        placeholder="Residencial São José"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                        Senha
                    </label>
                    <input
                        type="password"
                        required
                        value={usuario.senha}
                        onChange={(e) => handleChange('senha', e.target.value)}
                        placeholder="Digite uma senha"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                    />
                </div>

                <div className="md:col-span-2 flex items-center justify-end gap-6 pt-6 mt-6 border-t border-slate-100">
                    <Link
                        href="/usuarios"
                        className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        CANCELAR
                    </Link>
                    <button
                        type="submit"
                        className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
                    >
                        SALVAR ALTERAÇÕES
                    </button>
                </div>
            </div>
        </form>
    )
}