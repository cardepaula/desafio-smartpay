import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

const pacote = require('../package.json')

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle( 'Republica S/A' )
    .setDescription( pacote.description )
    .setVersion( pacote.version )
    .addTag( 'relatorio' )
    .addTag( 'health-check' )
    .build();
  
  const document = SwaggerModule.createDocument( app, options );

  // para gerar o swagger.json (copiando a saida do console)
  fs.writeFileSync( 'swagger.json', JSON.stringify( document ) );

  SwaggerModule.setup( 'docs', app, document );

  await app.listen(3000);
}
bootstrap();
