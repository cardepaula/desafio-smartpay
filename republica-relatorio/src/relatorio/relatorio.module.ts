import { Module } from '@nestjs/common';
import { RelatorioController } from './controllers/relatorio.controller';
import { RelatorioService } from './services/relatorio.service';

@Module({
  controllers: [RelatorioController],
  providers: [RelatorioService]
})
export class RelatorioModule {}
