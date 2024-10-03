# 🚀 API REST e Pagína administrativa para e-commerce

Este repositório contém um projeto desenvolvido utilizando TypeScript, Sequelize, Express, PostgresSQL e AdminJs. A seguir, você encontrará um guia passo a passo interativo para abrir o projeto em seu ambiente local.

## Conteudo

*Sistema de gerenciamento de e-commerce com painel administrativo para controle de:</br>
**Catalogo, Estoque, Marcações, Ofertas, Usuarios</br>
*Gráfico de vendas mensais</br>
*Cryptrografia de senha e controle de authenticação via token</br>
*Integração com a api do MercadoPago para controle da parte de pagamentos</br>
*Notificação em tempo real via WP após aprovação do pagamento</br>

## Pré-requisitos

Antes de começar, verifique se você possui as seguintes ferramentas instaladas em sua máquina:

✅ Node
✅ Postgres

## Passo 1️⃣: Clonar o repositório

Comece clonando este repositório para sua máquina local. Para clonar o repositório, clique no botão "Clone" acima ou execute o seguinte comando no terminal:

```bash
git clone https://github.com/Ellucidator/project_sst_V.3.git
```

Isso criará uma cópia local do repositório em seu ambiente.

## Passo 2️⃣: Instalação das dependencias

Execute o seguinte comando no terminal, isso fara com que as dependencias sejam instaladas:

```bash
npm install
```

## Passo 3️⃣: Criar o DB

No postgres crie o usuario responsavel pelo DB e crie o db do projeto. 

## Passo 4️⃣: Criar as variaveis de ambiente

No diretório raiz do projeto crie o arquivo .env seguindo os exemplos do .env.example

## Passo 5️⃣: Subir o modelo para o db local

Execute o seguinte comando no terminal, isso fara com que as tabelas do DB sejam criadas:

```bash
npx sequelize db:migrate
```
Feito isto o seguinte modelo deverá ser construido na maquina:
<img src="project_sst.svg" alt="Exemplo imagem">


## Passo 6️⃣: Rodar o projeto

```bash
npm run dev 
```
Feito isso a api devera rodar na sua maquina, o painel administrativo podera ser acessado a partir da sua porta local
ex: http://localhost:3000/admin

Obs. O DB tem o controle dividido em duas partes: </br>
    1º Chamadas do administrador controladas pelo admin JS</br>
    2º Chamadas do cliente controladas diretamente na API estas disponiveis no modelo do Postman abaixo:</br>

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/31790006-7da760ed-df41-4216-a5aa-5de8840a11da?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D31790006-7da760ed-df41-4216-a5aa-5de8840a11da%26entityType%3Dcollection%26workspaceId%3Db920721b-7b06-4d46-8331-49ec4cdb4e0a)


## Consideções Finais

Tratas-se do meu primeiro projeto pessoal e foi desenvolvido com o objetivo de estudo, durante o desenvolvimento 
pude testar diversas tecnologias, estudar documentações, entender o processo por trás do desenvolvimento e da tomada de decisões,
a importancia de um codigo limpo e bem construido e o maleficio a longo prazo de um codigo mal escrito (Será um dos princiáis pontos a melhorar),
pude entender que a programação não tratasse somente de código e todo planejamento do pré-pós é tambem necessario e de extrema importancia,
por fim fico feliz por subir meu primeiro projeto e por tudo que aprendi durante o desenvolvimento.
