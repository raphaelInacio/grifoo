export default class Cliente {
  public nome: string
  public email: string;
  public telefone: string;
  public _id: string;
  constructor(nome: string, email: string, telefone: string) {
    this.nome = nome
    this.email = email
    this.telefone = telefone
  }
}
