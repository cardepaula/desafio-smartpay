import { estabelecimentoEntity } from "../entities";

export class EstabelecimentoDeProdutoDto {
    
    nome: string;
    bairro: string;
    cidade: string;

    constructor(estabelecimento: estabelecimentoEntity) {
        this.nome = estabelecimento.nome;
        this.bairro = estabelecimento.bairro;
        this.cidade = estabelecimento.cidade;
    }

}