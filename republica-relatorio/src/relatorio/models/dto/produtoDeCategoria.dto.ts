import { produtoEntity } from "../entities";

export class ProdutoDeCategoriaDto {

    produto: string = "";
    estabelecimentos: string[] = [];

    constructor(produto: produtoEntity) {
        this.produto = produto.nome;

        for (const estabelecimento of produto.estabelecimentos) {
            this.estabelecimentos.push(estabelecimento.nome);
        }
    }
}