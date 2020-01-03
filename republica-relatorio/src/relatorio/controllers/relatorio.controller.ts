import { Controller, Get, Param, Res, HttpStatus, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { RelatorioService } from '../services/relatorio.service';
import { ApiBody, ApiTags, ApiResponse, ApiParam, ApiOperation } from '@nestjs/swagger';
import { ProdutoDeEstabelecimentoDto, ProdutoDeCategoriaDto, EstabelecimentoDeProdutoDto } from '../models/dto';

@ApiTags('relatorio')
@Controller('relatorio')
export class RelatorioController {
    
    constructor(private readonly relatorioService: RelatorioService) {}

    @Get('produtos/:cnpj')
    @ApiBody({
        type: ProdutoDeEstabelecimentoDto,
        isArray: true
    })
    @ApiOperation( {
        description: 'Retorna todos os produtos de um estabelecimento',
    } )
    @ApiResponse( { status: 200, description: 'Retorna uma lista de produtos.' } )
    @ApiResponse( { status: 400, description: 'Objeto vazio.' } )
    @ApiParam( {
        name: 'cnpj',
        description: 'CNPJ do estabelecimento',
        required: true,
    } )
    async getProdutosDeEstabelecimento(@Res() res: Response, @Param() params: {cnpj: string} ) {
        try {
            const produtos = await this.relatorioService.getProdutosDeEstabelecimento(parseInt(params.cnpj, 10)); 
            res.status( HttpStatus.OK ).send( produtos );
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);   
        }
    }

    @Get('produtos-categoria/:categoria')
    @ApiBody({
        type: ProdutoDeCategoriaDto,
        isArray: true
    })
    @ApiOperation( {
        description: 'Retorna todos os produtos de uma categoria, com seus respectivos estabelecimentos',
    } )
    @ApiResponse( { status: 200, description: 'Retorna uma lista de produtos.', type: ProdutoDeCategoriaDto } )
    @ApiResponse( { status: 400, description: 'Objeto vazio.' } )
    @ApiParam( {
        name: 'categoria',
        description: 'Categoria de produtos',
        required: true,
    } )
    async getProdutosDeCategoria(@Res() res: Response, @Param() params: {categoria: string}) {
        try {
            var produtosPorCategoria = await this.relatorioService.getProdutosDeCategoria(params.categoria.toLowerCase()); 
            res.status( HttpStatus.OK ).send( produtosPorCategoria );
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
    
    @Get('estabelecimentos/:produto')
    @ApiBody({
        type: EstabelecimentoDeProdutoDto,
        isArray: true
    })
    @ApiOperation( {
        description: 'Retorna todos os estabelecimentos que possuem um  produto.',
    } )
    @ApiResponse( { status: 200, description: 'Retorna uma lista de estabelecimentos.' } )
    @ApiResponse( { status: 400, description: 'Objeto vazio' } )
    @ApiParam( {
        name: 'produto',
        description: 'Nome do produto',
        required: true,
    } )
    async getEstabelecimentosDeProduto(@Res() res: Response, @Param() params: {produto: string}) {

        try {
            var estabelecimentos = await this.relatorioService.getEstabelecimentosDeProduto(params.produto.toLowerCase()); 
            res.status( HttpStatus.OK ).send( estabelecimentos );
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
