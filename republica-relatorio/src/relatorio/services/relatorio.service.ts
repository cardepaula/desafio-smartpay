import { Injectable } from '@nestjs/common';
import { produtoEntity, estabelecimentoEntity } from '../models/entities';
import { EstabelecimentoDeProdutoDto, ProdutoDeCategoriaDto, ProdutoDeEstabelecimentoDto } from '../models/dto';

@Injectable()
export class RelatorioService {
  async getRelatorio() {
    return 'Relatorio';
  }

  async getProdutosDeEstabelecimento(cnpjParam: number): Promise<ProdutoDeEstabelecimentoDto[]> {
      
    let produtosDto: ProdutoDeEstabelecimentoDto[] = [];
    const estabelecimento = await estabelecimentoEntity.findOne({where: {cnpj: cnpjParam}, relations: ['produtos']});

    produtosDto = estabelecimento.produtos.map( produtos => {
      return new ProdutoDeEstabelecimentoDto(produtos);
    }).sort(this.compareProds);

    return produtosDto;
  }

  async getProdutosDeCategoria(categoriaParam: string): Promise<ProdutoDeCategoriaDto[]> {

    let produtosPorCategoria: ProdutoDeCategoriaDto[] = [];  
    const produtos = await produtoEntity.find({where: {categoria: categoriaParam}, relations: ['estabelecimentos']});

    produtosPorCategoria = produtos.map( produto => {
      return new ProdutoDeCategoriaDto(produto);
    }).sort(this.compareProdCateg);

    return produtosPorCategoria;
  }
  
  async getEstabelecimentosDeProduto(produtoParam: string): Promise<EstabelecimentoDeProdutoDto[]> {

    let estabelecimentoPorProduto: EstabelecimentoDeProdutoDto[] = [];
    const produto = await produtoEntity.findOne({where: {name: produtoParam}, relations: ['estabelecimentos']});

    estabelecimentoPorProduto = (await produto.estabelecimentos).map( estabelecimento => {
      return new EstabelecimentoDeProdutoDto(estabelecimento);
    })

    return estabelecimentoPorProduto;
  }

  private compareProdCateg(a: ProdutoDeCategoriaDto, b: ProdutoDeCategoriaDto) {
    const produtoA = a.produto;
    const produtoB = b.produto;
  
    let comparison = 0;
    if (produtoA > produtoB) {
      comparison = 1;
    } else if (produtoA < produtoB) {
      comparison = -1;
    }
    return comparison;
  }

  private compareProds(a: ProdutoDeEstabelecimentoDto, b: ProdutoDeEstabelecimentoDto) {
    const produtoA = a.nome;
    const produtoB = b.nome;
  
    let comparison = 0;
    if (produtoA > produtoB) {
      comparison = 1;
    } else if (produtoA < produtoB) {
      comparison = -1;
    }
    return comparison;
  }
}
