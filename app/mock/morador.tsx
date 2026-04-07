import { Morador } from "@/app/context/AuthContext";

export class MoradorMock {
    private static moradorDB: Morador[] = [
        new Morador(1, "João Silva", "48999990001", true, 1),
        new Morador(2, "Maria Souza", "48999990002", false, 1),
        new Morador(3, "Carlos Lima", "48999990003", true, 2),
        new Morador(4, "Ana Costa", "48999990004", false, 3)
    ];

    static async listarTodos(): Promise<Morador[]> {
        return [...this.moradorDB];
    }

    static async salvar(morador: Morador): Promise<void> {
        const indexExistente = this.moradorDB.findIndex(m => m.id === morador.id);

        if (indexExistente === -1 || morador.id === null) {
            const novoId =
                this.moradorDB.length > 0
                    ? Math.max(...this.moradorDB.map(m => m.id ?? 0)) + 1
                    : 1;

            morador.id = novoId;
            this.moradorDB.push(morador);
        } else {
            this.moradorDB[indexExistente] = morador;
        }
    }

    static async buscarPorId(id: number): Promise<Morador | undefined> {
        return this.moradorDB.find(m => m.id === id);
    }
}