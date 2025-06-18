//codigo padrao para acessar os dados 
export class Task {
    constructor(id, descricao, status = false) {
        this.id = id;
        this.descricao = descricao;
        this.status = status;
    }
 
    mudancaStatus() {
        this.status = !this.status;

    }
}