export class Evento {
    public _id:string
    constructor(
        public tipoEvento: string,
        public outrasInformacoes: string,
        public dataHoraDeTermino: string,
        public dataHoraDeInicio: string,
        public numeroPessoas: number) 
        {}
}