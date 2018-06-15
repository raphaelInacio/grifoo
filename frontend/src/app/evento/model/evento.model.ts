export class Evento {
    public _id:string
    constructor(
        public tipoEvento: string,
        public outrasInformacoes: string,
        public duracaoEvento: string,
        public dataHoraDeInicio: string,
        public numeroPessoas: string) 
        {}
}