import { estabelecimentoEntity } from "../entities";
import { ApiProperty } from '@nestjs/swagger';

export class EstabelecimentoDeProdutoDto {
    
    @ApiProperty({example: 'da mata rezende s/a'})
    nome: string;

    @ApiProperty({example: 'coqueiral de itaparica'})
    bairro: string;

    @ApiProperty({example: 'vila velha'})
    cidade: string;

    constructor(estabelecimento: estabelecimentoEntity) {
        this.nome = estabelecimento.nome;
        this.bairro = estabelecimento.bairro;
        this.cidade = estabelecimento.cidade;
    }

}