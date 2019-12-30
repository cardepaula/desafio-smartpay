import { Controller, Get } from '@nestjs/common';
import { RelatorioService } from '../services/relatorio.service';

@Controller('relatorio')
export class RelatorioController {
    constructor(private readonly relatorioService: RelatorioService) {}

    @Get()
    async getRelatorio(): Promise<string> {
        return this.relatorioService.getRelatorio();
    }

    @Get('produtos/:cnpj')
    async getProdutos() {
        const produtos = await this.relatorioService.getProdutos(); 
        return produtos;
    }

    @Get('produto-estabelecimento/:categoria')
    async getCategorias() {
        var a = await this.relatorioService.getCategorias(); 
        return a;
    }
    
    @Get('estabelecimentos/:produto')
    async getEstabelecimentos() {
        var estabelecimentos = await this.relatorioService.getEstabelecimentos(); 
        return estabelecimentos;
    }
}
