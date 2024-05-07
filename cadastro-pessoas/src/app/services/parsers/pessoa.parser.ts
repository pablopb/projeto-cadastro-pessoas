import { Pessoa } from "../../entities/pessoa.model";

export class PessoaParser {
    constructor()
    {

    }
    parse(pessoa: Pessoa): string {
        return JSON.stringify({
            "id": Number(pessoa.id ?? 0),
            "nome": pessoa.nome,
            "dataNascimento": this.formatDate(pessoa.dataNascimento),
            "cpf": pessoa.cpf,
            "renda": pessoa.renda
        });
    }

    private formatDate(date: Date): string {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            return date.toString();
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}