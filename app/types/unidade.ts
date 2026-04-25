export class Unidade {
    constructor(
        public id: number | null,
        public bloco: string,
        public numero: string
    ) {}
}

export interface UnidadeFormProps {
  unidadeExistente?: Unidade;
}