export default class Cliente {

  public nome: string
  public email: string;
  public telefone: string;
  public _id: string;

  constructor(nome: string, email: string, telefone: string) {
    this.nome = nome
    this.email = email
    this.telefone = telefone
    this.validate()
  }
  
  private validate(): void {
    // if (!this.nome || this.email || this.telefone) {
    //   throw new TypeError("Campos obrigatórios não informados")
    // }
  }
}
