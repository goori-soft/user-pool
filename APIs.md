# APIs

As APIs são rotas de interface web (http) que permitem fazer captura de dados (get) ou mutações de dados e registros (post, put e delete). Nesta sessão todas as APIs estão descritas como complementos de rotas. A rota completa (url) depende do nome do servidor e da porta escolhida para o projeto. Por padrão, em ambiente de desenvolvimento, o prefixo da rota será: `http://localhost:8080/`

> Nota: todas as respostas de API retornam códigos de sucesso ou erro de acordo com a documentação mais atual de [códigos de status de resposta](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

> Nota: toas as respotas de API retonar uma string de resposta no formato JSON

# Registrando um consumidor

Para consumir as API deste projeto é preciso que o consumidor seja registrado. No momento de registro de um consumidor uma chave de acesso é grada. Essa chave de acesso deve ser fornecida em todas as requisições de consumo do serviço, exceto aquelas rotas que explicitamente são declaradas como rotas `master`.

## POST /api/v1/master/auth

Requisição:

```ts
{
  masterAcessKey: string; // Chave de acesso master definida em variável de ambiente
}
```

Resposta:

```ts
{
    token: string, // Json Web Token de autenticação master
    message: string, // Mensagem de retorno. Em caso de erro será igual a última mensagem de erro
    errors: [string] // Array de possíveis mensagens de erro
}
```

## POST /api/v1/master/consumer/register

Headers:

```json
 x-master-access-token: string //JSON Web Token de autenticação retornado pela rota `/api/v1/master/auth`
```

Requisição:

```ts
{
    name: string, // Nome da aplicação consumidora
    email: string, // Email para notificações do consumidor
    origin?: [string], // host de origem. ex: ['localhost', '*', 'mysite.com'] default = ['*']
    userMaxNumber?: int, // Número máximo de usuários, 0 igual a ilimitado, default = 0
    groupMaxNumber?: int // Número máximo de grupos, 0 igual a ilimitado, default = 0
}
```

Resposta:

```ts
{
    consumerId: string, // Id único do consumidor
    acessKey: string // Chave de acesso. Não poderá ser recuperada posteriormente
}
```

## GET /api/v1/master/consumers

Headers:

```json
 x-master-access-token: string //JSON Web Token de autenticação retornado pela rota `/api/v1/master/auth`
```

Resposta:

```ts
{
    total: number, // número total de consumidores registrados
    active: number, // número de consumidores ativos
    inactive: number, // número de consumidores inativos
    consumers: [
        {
            id: string,
            name: string,
            email: string,
            origin: [string],
            users: number, // total de usuários registrados por esse consumidor
            userMaxNumber: number,
            groups: number, // total de grupos registrados por esse consumidor
            groupMaxNumber: number,
        }
    ]
}
```

## POST /api/v1/consumer/auth

Requisição:

```ts
{
    consumerId: string, // id único do consumidor
    accessKey: string // Cahve de acesso
}
```

Resposta:

```ts
{
    token: string, // Json Web Token de autenticação do consumidor
    message: string, // Mensagem de retorno. Em caso de erro será igual a última mensagem de erro
    errors: [string] // Array de possíveis mensagens de erro
}
```

# Criação de um grupo, perfil e usuário

Grupos são entidades que permitem a organização de usuários e perfis. Antes de iniciar a criação do pool de usuários é preciso que o consumidor declare um grupo padrão. Todos os usuários criados pelo consumidor serão vinculados a este grupo padrão. Outros grupos podem ser criados pelo consumidor desde que não excedam o número máximo de grupos permitidos. O número máximo de grupos é declarado no momento do registro de um novo consumidor

## POST /api/v1/register/group

## POST /api/v1/register/profile

## POST /api/v1/register/user
