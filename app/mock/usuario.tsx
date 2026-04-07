import { Usuario } from "@/app/context/AuthContext";

export class UsuarioMock {
    private static usuarioDB: Usuario[] = [
        new Usuario(1, "Gabriel Vieira", "gabriel@email.com", "ATIVO", "Residencial Solar das Palmeiras", "123456"),
        new Usuario(2, "Samuel Matos", "samuel@email.com", "ATIVO", "Condomínio Central", "123456")
    ];

    static async listarTodos(): Promise<Usuario[]> {
        return [...this.usuarioDB];
    }

    static async buscarPorId(id: number): Promise<Usuario | undefined> {
        return this.usuarioDB.find(u => u.id === id);
    }

    static async salvar(usuario: Usuario): Promise<void> {
        const indexExistente = this.usuarioDB.findIndex(u => u.id === usuario.id);

        if (indexExistente === -1 || usuario.id === null) {
            const novoId =
                this.usuarioDB.length > 0
                    ? Math.max(...this.usuarioDB.map(u => u.id ?? 0)) + 1
                    : 1;

            usuario.id = novoId;
            this.usuarioDB.push(usuario);
        } else {
            this.usuarioDB[indexExistente] = usuario;
        }
    }

    static async autenticar(email: string, senha: string): Promise<Usuario | null> {
        const usuario = this.usuarioDB.find(
            u => u.email === email && u.senha === senha
        );

        return usuario || null;
    }
}