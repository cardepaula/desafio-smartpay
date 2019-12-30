import { createReadStream, readFileSync } from 'fs';
import * as csv from 'csv-parser';
import * as getStream from 'get-stream';
import { IEstabelecimentos, IProdutos } from 'src/interfaces';

const produtosRegex = /^([A-Za-z0-9\u00C0-\u00FF\-]*)\s([A-z]*)\s([A-Za-z\u00C0-\u00FF\s]*\sS\/A)$/;
  
async function getEstabelecimentosCSV(): Promise<IEstabelecimentos[]> {
  
  let estabelecimentos: Array<IEstabelecimentos> = [];
  const options = {
    headers: ['Estabelecimento','Cnpj','Bairro','Cidade']
  }
  const filePath = `${__dirname}/../../../estabelecimentos.csv`;
  const parseStream = csv(options);

  estabelecimentos = await getStream.array(createReadStream(filePath).pipe(parseStream));

  return estabelecimentos;
}

async function getProdutosTXT(): Promise<any[]> {
  
  let produtos: IProdutos[] = [];
  const filePath = `${__dirname}/../../../produtos.txt`;

  produtos = readFileSync(filePath, { encoding: 'UTF-8' })
    .trim()
    .toString()
    .split('\n')
    .map( data => {
      const dataArray = data.match(produtosRegex).slice(1);
      var produto: IProdutos = {
        Nome: dataArray[0],
        Categoria: dataArray[1],
        Estabelecimento: dataArray[2],
      }
      return produto;
    });

  return produtos;
}

async function bootstrap() {
  const estabelecimentos = await getEstabelecimentosCSV();
  const produtos = await getProdutosTXT();

  console.log('Estabelecimentos: ', estabelecimentos[0], ' | ', estabelecimentos.length);
  console.log('Produtos: ', produtos[0], ' | ', produtos.length);
}

bootstrap().then(
  () => process.exit(0),
  err => {
    console.error(err);
    process.exit(1);
  }
);