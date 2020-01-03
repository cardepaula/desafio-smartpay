# Solução
Foi criada um api REST com o framework [NestJS](https://docs.nestjs.com/) de NodeJS trabanlhando juntamente com um banco Postgres. Existem dos scripts em `republica-ralatorio/src/script` que trabalham em conjunto para ler os arquivos textos, tratar os dados, criar as tabelas e popular o banco de dados. Também foi desenvolvido um Dockerfile da aplicação.

1. `postgresqlQuerys.ts`: script contendo as querys de CREATE, DROP e INSERT no banco.
2. `popularBanco.ts`: script principal responsável por ler os arquivos, tratar os dados e chamar as querys.

## Tecnologias:
* NodeJS 10
* TypeScript
* NestJS
* Postgres 10

## Documentação da solução

### Estrutura da aplicação

O projeto foi estruturado da seguinte forma

* src
  * relatorio # Módulo relatorio 
    * controllers
      * relatorio.controller.ts # Controlador do módulo relatorio
    * models # Modelos utilizados pela aplicação
      * dto # Modelos de retorno da api (Objeto de Transferência de Dados) 
        * estabelecimentoDeProduto.ts # DTO que contém as informações do estabelecimento
        * produtoDeCategoria.ts # DTO que contém as informação de um produto e seus estabelecimentos
        * produtoDeEstabelecimento.ts # DTO que contém as informações de um produto
      * entities # Modelos que mapeiam as entidades do banco de dados (utilizando TypeORM) 
        * estabelecimento.entity.ts
        * produto.entity.ts
    * services # Serviço do módulo relatório
    * relatorio.module.ts # Definição do módulo de relatorio e suas dependências
  * script
    * interfaces # Interfaces, relacionadas aos arquivos textos, utilizadas nos scripts
      * estabelecimentoText.interface.ts
      * produtoText.interface.ts
    * textFiles # Arquivos textos que contém os registros
      * estabelecimentos.csv
      * produtos.txt
    * popularBanco.ts # Script para ler, tratar e salvar os registros no banco
    * postgresqlQuerys.ts # Script com as querys
  * app.controller.ts # Controlador principal (root)
  * app.module.ts # Módulo principal (root)
  * app.service.ts # Serviço principal da aplicação
  * main.ts # Arquivo para o bootstrap da api

### Instalando as dependencias
1. Instale o [NodeJs](https://nodejs.org/en/download/package-manager/). Essa solução foi testada no NodeJS +10, mas provavelmente funcionará em versões superiores;
2. Instale o [NestJS](https://docs.nestjs.com/)
3. Dentro do diretório *republica-raltorio/* execute o comando abaixo para instalar as outras dependencias:
```
$ npm i
```
### Criando e Populando o banco de dados
1. Crie um arquivo `.env` com as variaveis para a conexão com o seu banco. Se baseie no `.env.example`.
2. Dentro do diretorio `republica-relatorio/` execute o comando `npm run populate`. Isso executará os scripts para popularo banco.

### Banco de Modelagem
Utilizei o banco relacional Postgres por já ter trabalhado com ele. Densevolvi usando um docker do Postgres 10:

```
$ docker run --name republica-pg -e "POSTGRES_PASSWORD=pass" -p 5432:5432 -d postgres:10-alpine
```

A modelagem ficou da seguinte forma:

![Modelo Lógico](/modelos_bd/modelo_logico.png)

**Entidades:**
* Estabelecimento: contém os atributos do estabelecimento
* Produto: contém os atributos do produto
* estabelecimento_produto: contém o relacionamento entre Estabelecimento e Produto



### Rodando a aplicação

**Localmente**
Dentro do diretorio `republica-relatorio/` execute o comando `npm run start`.

**Docker**
Dentro do diretorio `republica-relatorio/` execute os seguintes comandos:

```
$ docker build -t republicarelatorios:latest .  # Cria uma imagem da aplicação
$ docker run -d -e DB_HOST='localhost' -e DB_PORT=5432 -e DB_USER='postgres' -e DB__PASS='pass' -e DB_DATABASE='postgres' -e DB_SCHEMA='public' -p 3000:3000 republicarelatorios:latest # Executa a web api e expõem na porta 3000
$ docker run --rm -it -e DB_HOST='localhost' -e DB_PORT=5432 -e DB_USER='postgres' -e DB__PASS='pass' -e DB_DATABASE='postgres' -eDB_SCHEMA='public' republicarelatorios:latest npm run populate # Executa o job de preencher o banco com as informações dos arquivos textos
```

OBS: Lembrar de substituir as variaveis de ambiente de acordo com o seu banco.

Abra um navegador e acesse http://localhost:3000/docs para abrir o [swagger](https://docs.nestjs.com/recipes/swagger#openapi-swagger) .Os endpoints disponíveis são:

| Endpoint | Descrição |
| ---- | -------- |
| /relatorio/produtos/<cnpj> | Lista de produtos de um determinado estabelecimento |
| /relatorio/produtos-categoria/<categoria> | Lista de produtos de uma categoria com seus respectivos estabelecimentos |
| /relatorio/estabelecimentos/<produto> | Lista de estabelecimentos de um determinado produto |

## Lista dos diferenciais implementados
* Criar um [serviço](https://martinfowler.com/articles/microservices.html) com o problema
* Utilizar banco de dados
* Implementar o padrão de programação da tecnologia escolhida
* Implementar usando Docker

---


# Você domina a Força?

>Guerreiro Luke é pesquisador de uma empresa (República S/A) que realiza vários levantamentos de relatórios sobre produtos e estabelecimentos da região da Grande Vitória. Todos os dias ele cataloga vários itens novos e vários novos estabelecimentos, organizando tudo dentro de várias planilhas tal como seu chefe e pai (Darth Vader) ordena. Acontece que, além de todo esse trabalho ser feito manualmente, para recuperar algumas informações às vezes demora muito tempo, o que deixa o chefe de Luke furioso. Por isso, Princesa Leia, uma colega de Luke, sugeriu a construção de um dispositivo que realizasse esse procedimento de forma automática e fornecesse as informações requeridas pelo patrão em muito menos tempo. Infelizmente eles não sabem de ninguém que domine a Força para iniciar e guiá-los nessa difícil missão. Será que você pode ajudá-los?

O desafio é que você desenvolva um **programa** que permita realizar as seguintes buscas: 
1. Dado o nome de um produto, retornar uma listagem de quais **estabelecimentos** que possuem ele, junto com o **bairro** e **cidade** de cada estabelecimento.
2. Passado o nome de uma categoria, retornar uma listagem de **produtos** que fazem parte dela e em qual  **estabelecimento** (nome) se encontra, ordenando em ordem alfabética o nome dos produtos.
3. Dado o CNPJ de um estabelecimento, retornar uma listagem de todos os **produtos** dele, em ordem *alfabética*.

O arquivo **produtos.txt** contém as informações dos produtos no formato semelhante ao que segue:

| Nome  | Categoria  | Estabelecimento |
|---|---|---|
| Hambúrguer-de-Soja  |  Hambuguer  |  Rick's S/A |
| Churrasco-de-Berinjela  |  Carnes  |  Churrascaria-Dudu  |
| Pizza-de-Calabresa |  Massa |  Pizzaria-Cleber S/A |

O arquivo **estabelecimentos.csv** contém as informações de todos os estabelecimentos no formato semelhante ao que segue:

| Estabelecimento  | CNPJ  | Bairro |  Cidade |
|---|---|---|---|
| Rick's  | 55091455000151  |  Centro  |  Vila Velha  | 
| Churrascaria-Dudu | 10740748000184  |  Centro  |  Vitória |
| Pizzaria-Cleber | 50761347000125 |  Maruípe  |  Vitória |

**Escolha as tecnologias e técnicas que você vai usar e tente montar uma solução completa para rodar a aplicação**.

Para enviar o resultado, basta realizar um **Fork** deste repositório e **abrir um Pull Request**, **com seu nome**.  

**É importante comentar que deve ser enviado apenas o código fonte. Não aceitaremos códigos compilados**.

Por fim, o candidato deve atualizar o Readme.md com as seguintes informações: 
1. Documentação da solução;
2. Lista dos diferenciais implementados 

## Avaliação

O resultado da missão será avaliado levando em conta os seguintes critérios:

| Critério  | Valor | 
|---|---|
| Legibilidade do Código e Organização |  25  |
| Documentação do Código|  25  |
| Reutilização  e Modularização da Solução|  25  |
| Tratamento de Erros| 25| 
| Total| 100|

A pontuação do Jedi será a soma dos valores obtidos nos critérios acima.

## Diferenciais 

O Jedi pode aumentar a sua pontuação na seleção implementando um ou mais dos itens abaixo:

| Item  | Pontos Ganhos | 
|---|---|
| Criar um [serviço](https://martinfowler.com/articles/microservices.html) com o problema |  30  |
| Utilizar banco de dados| 5|
| Implementar o padrão de programação da tecnologia escolhida |  20  |
| Qualidade de [Código com SonarQube](https://about.sonarcloud.io/) |  15  |
| Implementar testes unitários |  10  |
| Implementar testes com BDD |  10  |
| Implementar integração com [Travis](https://travis-ci.org/) (ou outros)  |  15  |
| Implementar usando Docker| 15|
| Total| **120**|

A nota final do Jedi será acrescido dos pontos referente ao item implementado corretamente.

Cada item listado como diferencial deverá ser explicitado durante as fases de entrevista e mostra da solução do guerreiro.

## Penalizações

O aventureiro será desclassificado nas seguintes situações:

1. Submeter um solução que não funcione; 
2. Não cumprir no mínimo 60% de cada um dos critérios da seção **Avaliação**
3. Solução Plagiada

## Referências

Missão elaborada segundo o modelo do Mestre Jedi [Paulo S. S. Júnior](https://github.com/paulossjunior) no Episódio XX [(Teste para o ESPM)](https://github.com/prodest/venha-para-es-palma-mao).

<p align="center">
  <img src="https://images-na.ssl-images-amazon.com/images/I/51nHC4Efp8L.jpg" width="250" height= "350" alt="Star Wars" />
</p>