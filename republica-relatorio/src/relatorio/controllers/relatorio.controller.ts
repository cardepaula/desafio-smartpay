import { Controller, Get, Param, Res, HttpStatus, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { RelatorioService } from '../services/relatorio.service';

@Controller('relatorio')
export class RelatorioController {
    
    constructor(private readonly relatorioService: RelatorioService) {}

    @Get('produtos/:cnpj')
    async getProdutosDeEstabelecimento(@Res() res: Response, @Param() params: {cnpj: string}) {
        try {
            const produtos = await this.relatorioService.getProdutosDeEstabelecimento(parseInt(params.cnpj, 10)); 
            res.status( HttpStatus.OK ).send( produtos );
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);   
        }
    }

    @Get('produtos-categoria/:categoria')
    async getProdutosDeCategoria(@Res() res: Response, @Param() params: {categoria: string}) {
        try {
            var produtosPorCategoria = await this.relatorioService.getProdutosDeCategoria(params.categoria.toLowerCase()); 
            res.status( HttpStatus.OK ).send( produtosPorCategoria );
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
    
    @Get('estabelecimentos/:produto')
    async getEstabelecimentosDeProduto(@Res() res: Response, @Param() params: {produto: string}) {

        try {
            var estabelecimentos = await this.relatorioService.getEstabelecimentosDeProduto(params.produto.toLowerCase()); 
            res.status( HttpStatus.OK ).send( estabelecimentos );
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
