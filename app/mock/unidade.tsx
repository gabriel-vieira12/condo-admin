import { Unidade } from "@/app/context/AuthContext";

export class UnidadeMock {
    private static unidadeDB: Unidade[] = [
        new Unidade(1, "A", "101"),
        new Unidade(2, "A", "102"),
        new Unidade(3, "B", "201"),
        new Unidade(4, "B", "202")
    ];

    static async listarTodos(): Promise<Unidade[]> {
        return [...this.unidadeDB];
    }

    static async salvar(unidade: Unidade): Promise<void> {
        const indexExistente = this.unidadeDB.findIndex(u => u.id === unidade.id);

        if (indexExistente === -1 || unidade.id === null) {
            const novoId =
                this.unidadeDB.length > 0
                    ? Math.max(...this.unidadeDB.map(u => u.id ?? 0)) + 1
                    : 1;

            unidade.id = novoId;
            this.unidadeDB.push(unidade);
            console.log(`Unidade de ID ${novoId} salva com sucesso!`);
        } else {
            this.unidadeDB[indexExistente] = unidade;
            console.log(`Unidade de ID ${unidade.id} atualizada com sucesso!`);
        }
    }

    static async buscarPorId(id: number): Promise<Unidade | undefined> {
        return this.unidadeDB.find(u => u.id === id);
    }
}