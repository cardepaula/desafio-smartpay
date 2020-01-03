import { createReadStream, readFileSync } from 'fs';
import * as csv from 'csv-parser';
import * as getStream from 'get-stream';
import { IEstabelecimento, IProduto } from './interfaces';

import { PostgresQuerys } from './postgresqlQuerys';

const produtosRegex = /^([A-Za-z0-9\u00C0-\u00FF\-]*)\s([A-z]*)\s([A-Za-z\u00C0-\u00FF\s]*\sS\/A)$/;
const pgQuerys = new PostgresQuerys();
  
async function getEstabelecimentosCSV(): Promise<IEstabelecimento[]> {
  
  let estabelecimentosCSV: Array<any> = []
  let estabelecimentos: Array<IEstabelecimento> = [];
  const options = {
    headers: ['Estabelecimento','Cnpj','Bairro','Cidade']
  }
  const filePath = `${__dirname}/../../../estabelecimentos.csv`;
  const parseStream = csv(options);

  estabelecimentosCSV = await getStream.array(createReadStream(filePath).pipe(parseStream));

  estabelecimentos = estabelecimentosCSV.map( estabelecimentoCSV => {
    const estabelecimento:IEstabelecimento = {
      nome: estabelecimentoCSV.Estabelecimento.trim().toLowerCase(),
      cnpj: parseInt(estabelecimentoCSV.Cnpj.trim(), 10),
      bairro: estabelecimentoCSV.Bairro.trim().toLowerCase(),
      cidade: estabelecimentoCSV.Cidade.trim().toLowerCase()
    }
    return estabelecimento;
  })

  return estabelecimentos;
}

async function getProdutosTXT(): Promise<any[]> {
  
  let produtos: IProduto[] = [];
  const filePath = `${__dirname}/../../../produtos.txt`;

  produtos = readFileSync(filePath, { encoding: 'UTF-8' })
    .trim()
    .toString()
    .split('\n')
    .map( data => {
      const dataArray = data.match(produtosRegex).slice(1);
      var produto: IProduto = {
        nome: dataArray[0].trim().toLowerCase(),
        categoria: dataArray[1].trim().toLowerCase(),
        estabelecimento: dataArray[2].trim().toLowerCase(),
      }
      return produto;
    });

  return produtos;
}

async function bootstrap() {
  const estabelecimentos = await getEstabelecimentosCSV();
  const produtos = await getProdutosTXT();

  await pgQuerys.dropTable();
  await pgQuerys.createTable();
  await pgQuerys.insertTable(estabelecimentos, produtos);

}

bootstrap().then(
  () => process.exit(0),
  err => {
    console.error(err);
    process.exit(1);
  }
);