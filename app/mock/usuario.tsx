import { Usuario } from "@/app/context/AuthContext";

export class UsuarioMock {
    private static usuarioDB: Usuario[] = [
        new Usuario(1, "Gabriel Vieira", "gabriel@email.com", "ATIVO", "Condomínio Central", "123456"),
        new Usuario(2, "Matheus", "matheus@email.com", "ATIVO", "Residencial Sol", "123456"),
        new Usuario(3, "Carlos", "carlos@email.com", "ATIVO", "Jardim das Flores", "123456"),
        new Usuario(4, "José", "jose@email.com", "INATIVO", "Condomínio Azul", "123456"),
        new Usuario(5, "Paulo", "paulo@email.com", "ATIVO", "Residencial São Pedro", "123456")
    ];

    static async listarTodos(): Promise<Usuario[]> {
        return [...this.usuarioDB];
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
            console.log(`Usuário de ID ${novoId} salvo com sucesso!`);
        } else {
            this.usuarioDB[indexExistente] = usuario;
            console.log(`Usuário de ID ${usuario.id} atualizado com sucesso!`);
        }
    }

    static async buscarPorId(id: number): Promise<Usuario | undefined> {
        return this.usuarioDB.find(u => u.id === id);
    }
}