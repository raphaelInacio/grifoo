export default class Endereco {

    public _id: string

    constructor(
        public rua: string,
        public numero: number,
        public complemento: string,
        public cep: string,
        public bairro: string,
        public cidade: string,
        public estado: string) { }

    public validate(): void {

        let messages: string = ""

        if (this.rua.length <= 4) {
            messages = messages.concat("Rua inválida ou não informada, ")
        }

        if (this.numero < 1) {
            messages = messages.concat("Numero inválido ou não informado, ")
        }

        if (this.complemento.length <= 1) {
            messages = messages.concat("Complemento inválido ou não informado, ")
        }

        if (this.bairro.length <= 4) {
            messages = messages.concat("Bairro inválido ou não informado, ")
        }

        if (messages.length > 1) {
            throw new Error(messages)
        }
    }
}