import { Module } from '@nestjs/common';
import { RelatorioController } from './controllers/relatorio.controller';
import { RelatorioService } from './services/relatorio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { estabelecimentoEntity, produtoEntity } from './models/entities';

@Module({
  imports: [TypeOrmModule.forRoot({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "pass",
    database: "postgres",
    schema: "public",
    synchronize: false,
    entities: [
      estabelecimentoEntity,
      produtoEntity
    ]
  })],
  controllers: [RelatorioController],
  providers: [RelatorioService]
})
export class RelatorioModule {}
