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

    let messages:string = ""  

    if (this.nome.length <= 4) {
      messages = messages.concat("Nome inválido ou não informado, ")
    }

    if (this.email.length <= 4) {
      messages = messages.concat("Email inválido ou não informado, ")
    }

    if (this.telefone.length <= 8) {
      messages = messages.concat("Telefone inválido ou não informado, ")
    }

    if(messages.length > 1) {
      throw new Error(messages)
    }

  }
}
