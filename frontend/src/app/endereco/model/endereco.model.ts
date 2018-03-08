export default class Endereco {
    public _id:string
    constructor(
    public rua:string,
    public numero:number,
    public complemento:string,
    public cep:string,
    public bairro:string,
    public cidade:string,
    public estado:string){}
}