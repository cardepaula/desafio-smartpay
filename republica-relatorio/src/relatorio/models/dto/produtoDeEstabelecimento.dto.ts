import { produtoEntity } from "../entities";
import { ApiProperty } from "@nestjs/swagger";

export class ProdutoDeEstabelecimentoDto {

    @ApiProperty({example: 'escarola-com-aliche'})
    nome: string;
    
    @ApiProperty({example: 'lights'})
    categoria: string;

    constructor(produto: produtoEntity) {
        this.nome = produto.nome;
        this.categoria = produto.categoria;
    }
}