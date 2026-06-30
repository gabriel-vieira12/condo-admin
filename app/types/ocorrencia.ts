export class Ocorrencia {
    constructor(
        public id: number | null,
        public descricao: string,
        public gravidade: string,
        public status: string,
        public unidadeId: number | null
    ) { }
}

export interface OcorrenciaFormProps {
  ocorrenciaExistente?: Ocorrencia;
}