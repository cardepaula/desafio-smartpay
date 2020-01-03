import { produtoEntity } from "../entities";

export class ProdutoDeEstabelecimentoDto {

    nome: string;
    categoria: string;

    constructor(produto: produtoEntity) {
        this.nome = produto.nome;
        this.categoria = produto.categoria;
    }
}