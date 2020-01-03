import { Module } from '@nestjs/common';
import { RelatorioController } from './controllers/relatorio.controller';
import { RelatorioService } from './services/relatorio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { estabelecimentoEntity, produtoEntity } from './models/entities';

@Module({
  imports: [TypeOrmModule.forRoot({
    name: "default",
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB__PASS || "pass",
    database: process.env.DB_DATABASE || "postgres",
    schema: process.env.DB_SCHEMA || "public",
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
