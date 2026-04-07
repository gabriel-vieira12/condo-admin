import { Ocorrencia } from "@/app/context/AuthContext";

export class OcorrenciaMock {
    private static ocorrenciaDB: Ocorrencia[] = [
        new Ocorrencia(1, "Vazamento no corredor", "GRAVE", "ABERTA", 1),
        new Ocorrencia(2, "Lâmpada queimada na garagem", "BAIXA", "RESOLVIDA", 2),
        new Ocorrencia(3, "Barulho excessivo após 22h", "MEDIA", "EM_PROGRESSO", 3),
        new Ocorrencia(4, "Portão com falha elétrica", "GRAVE", "ABERTA", 4)
    ];

    static async listarTodos(): Promise<Ocorrencia[]> {
        return [...this.ocorrenciaDB];
    }

    static async salvar(ocorrencia: Ocorrencia): Promise<void> {
        const indexExistente = this.ocorrenciaDB.findIndex(o => o.id === ocorrencia.id);

        if (indexExistente === -1 || ocorrencia.id === null) {
            const novoId =
                this.ocorrenciaDB.length > 0
                    ? Math.max(...this.ocorrenciaDB.map(o => o.id ?? 0)) + 1
                    : 1;

            ocorrencia.id = novoId;
            this.ocorrenciaDB.push(ocorrencia);
        } else {
            this.ocorrenciaDB[indexExistente] = ocorrencia;
        }
    }

    static async buscarPorId(id: number): Promise<Ocorrencia | undefined> {
        return this.ocorrenciaDB.find(o => o.id === id);
    }

    static async alterarStatus(id: number, novoStatus: string): Promise<void> {
        const ocorrencia = this.ocorrenciaDB.find(o => o.id === id);

        if (ocorrencia) {
            ocorrencia.status = novoStatus;
        }
    }
}