export class Morador {
    constructor(
        public id: number | null,
        public nome: string,
        public contato: string,
        public proprietario: boolean,
        public unidadeId: number | null
    ) { }
}