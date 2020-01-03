import { produtoEntity } from "../entities";
import { ApiProperty } from "@nestjs/swagger";

export class ProdutoDeCategoriaDto {

    @ApiProperty({example: 'cachaça'})
    produto: string = "";

    @ApiProperty({example: ['pinto s/a','barbosa ferreira s/a','nogueira s/a']})
    estabelecimentos: string[] = [];

    constructor(produto: produtoEntity) {
        this.produto = produto.nome;

        for (const estabelecimento of produto.estabelecimentos) {
            this.estabelecimentos.push(estabelecimento.nome);
        }
    }
}