import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RelatorioModule } from './relatorio/relatorio.module';

@Module({
  imports: [RelatorioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
