# Goori User Pool
Node user pool service

# Definições
## App
É o registro da parte primária a utilizar o serviço. Em outras palavras é o registro que identifica o cliente.

Para utilizar o serviço não é necessário criar o registro de um App embora seja altamente recomendado. Através de variáveis de ambiente é possível alterar o comportamente do serviço para tornar ou não o registro de um App algo obrigatório.

## Usuário
Usuário (user) é um registro dentro da coleção principal do serviço.

## Perfil
Perfil é um registro dentro do serviço capaz de agrupar usuários e criar vinculos enrte usuários e apps. Um usuário pode possui diversos perfis, mas não é obrigatório para que o serviço funcione. Através de variáveis de amiente é possível alterar o comportamento do serviço para tornar ou não a utilização de perfis algo obrigatório.
# Configuração do serviço
O serviço é altamente configuravel através de variáveis de ambiente. Para saber como configurar cada uma dessas variáveis vá direto a sessão **Variáveis de ambiente**.

Você pode fazer o deploy deste serviço dentro de um ambiente escalável ou não, rodando diretamente a partir do Node ou dentro de um container Docker.

Para inicializar o serviço diretamente dentro de um ambiente com node instalado utilize o comando `npm start` . A maior parte dos serviços de computação em nuvem utilizam este comando por padrão para inicializar o serviço. Neste cenário imagina-se que a base de dados faça parte de um serviço segregado, ou seja, em outro ambiente. Ceritifique-se de que todas as configurações de comunicação com a base de dados estejam corretamente declaradas nas variáveis de ambiente apropriadas.

Para inicializar o serviço de modo containerizado basta utilizar o comando `docker-compose up -d` . Neste caso as variáveis de ambiente precisam ser herdadas do ambiente principal ou injetadas atraves do arquivo `.env`
# Uso geral
A maior parte do serviço é utilizada através de API REST. A seguir você pode ver um exemplo da resposta padrão para as rotas do serviço.

Resposta padrão:
```json
{
    "status": "ok",
    "?message": "It's ok",
    "?errors": ["No error here!", "Ops! Something went wrong"]
}
```
# Criação de um App

# Autenticação do app
Para se autenticar no serviço o app deve utilizar o `ID` e `KEY` de uma aplicação (**App**) registrada. O `ID` e o `Key` são gerados automaticamente pelo serviço no momento do registro de um App (veja ***Criação de um App***). A API do serviço deve retonar um objeto JSON em todos os caso. Em caso de sucesso este objeto deve conter um token JWT válido.
> Nota: O `secret` utilizado para gerar o JWT pode ser pré-deifinido ou randomizado para cada autenticação de App. (veja ***Variáveis de ambiente***)

# Variáveis de ambiente
O serviços é fundamentado em alto controle e parametrização por variáveis de ambiente.

### API_REQUIRES_APP_REGISTER
Valor padrão: **false**

Tipo: **Boolean**

Se verdadeira indica que o serviço só pode ser acessado atraves de um app cliente registrado. Recomenda-se que estta variável esteja sempre ativa. Isso evita que requisições estranhas sejam capazes de criar ou alterar registros de usuários
### API_REQUIRES_APP_ACTIVATION
Valor padrão: **false**

Tipo: **Boolean**

Se verdadeira indica que somente app ativos podem fazer uso do serviço. Este tipo de condição deve ser utilizada caso haja mais de um app acessando o serviço e o controle de utilização do serviço seja necessário.

### APP_AUTH_USE_RANDOM_SECRET
Valor padrão: **true**

Tipo: **Booleano**

Aplica um secret randomico para cada aplicação no momento da autenticação do app. Esta chave é armazenada na memória do serviço durante sua execução e não pode ser recuperada por nenhuma API ou arquivo. Isso faz com que cada aplicação tenha uma chave única de autenticação.

As chaves perdem sua validade sempre que o sistema é reiniciado.

> **Importante:** em sistemas autobalanceados este modelo de geração de chave pode comprometer a correta validação dos tokens dos apps, uma vez que cada instância do serviço pode gerar tokens diferentes para a mesma aplicação.

### APP_AUTH_SECRET
Valor padrão: **null**

Tipo: **String**

Secret de autenticação para aplicações.

> **Importante**: caso *APP_AUTH_USE_RANDOM_SECRET* seja verdadeiro esta variável será ignorada. Dê prioridade para um secret definido em sistemas de carga balanceada a fim de manter a uniformidade dos tokens gerados por cada instância do serviço.

### APP_TOKEN_HEADER_NAME
Valor padrão: **x-app-access-token**

Tipo: **String**

Nome da variável de cabeçalho a partir da qual será extraído o token de autenticação de um app.

### MONGO_DATA_PATH
Valor padrão: **./.data**

Tipo: **String**

Define o caminho no qual as informações de base de dados serão salvas. Esta variável só tem efeito quando o serviço de base de dados está rodando através do container docker.

### MONGO_DB
Valor padrão: **userpool**

Tipo: **String**

Nome da base de dados na qual será realizada a conexão.

### MONGO_USERNAME
Valor padrão: **userpoolroot**

Tipo: **String**

Usuário de conexão com a base de dados

### MONGO_PASSWORD
Valor padrão: ***empty***

Tipo: **String**

Senha de conexão com a base de dados
### MONGO_HOST
Valor padrão: **localhost**

Tipo: **String**

Host no qual se encontra o serviço de base de dados. Esta variável pode ser ocultada caso o serviço esteja rodando a partir do script `docker-compose`
### MONGO_PORT
Valor padrão: **27017**

Tipo: **String | Number**

Porta de conexão com o host de base de dados.
### MONGO_RECONNECT
Valor padrão: **true**

Tipo: **Boolean**

Indica se a reconexão será realizada caso ela seja perdida ou não seja estabelecida. Reconda-se que esta variável sempre esteja definida como valor `true`
### MONGO_RECONNECT_MSTIME
Valor padrão: **2000**

Tipo: **Number**

Tempo eentre as reconexões de base de dados.
### MONGO_RECONNECT_MAX_ATTEMPTS
Valor padrão: **30**

Tipo: **Number**

Número máximo de tentativas consecutivas de conexão com a base de dados.

