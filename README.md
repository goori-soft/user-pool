# Goori User Pool
Node user pool service

# Definições
## App
É o registro da parte primária a utilizar o serviço.

Para utilizar o serviço não é necessário criar o registro de um App embora seja altamente recomendado. Através de variáveis de ambiente é possível alterar o comportamente do serviço para tornar ou não o registro de um App algo obrigatório.

# Uso geral
## Resposta padrão
```json
{
    "status": "ok",
    "?message": "It's ok",
    "errors": ["No error here!", "Ops! Something went wrong"]
}
```
# Criação de um App
...
# Autenticação do app
Para se autenticar no serviço o app deve utilizar o `ID` e `KEY` de uma aplicação (**App**) registrada. O `ID` e o `Key` são gerados automaticamente pelo serviço no momento do registro de um App (veja ***Criação de um App***). A API do serviço deve retonar um objeto JSON em todos os caso. Em caso de sucesso este objeto deve conter um token JWT válido.
> Nota: O `secret` utilizado para gerar o JWT pode ser pré-deifinido ou randomizado para cada autenticação de App. (veja ***Variáveis de ambiente***)

# Variáveis de ambiente
O serviços é fundamentado em alto controle e parametrização por variáveis de ambiente.

### APP_AUTH_USE_RANDOM_SECRET
Valor padrão: **true**

Tipo: **Booleano**

Aplica um secret randomico para cada aplicação no momento da autenticação do app. Esta chave é armazenada na memória do serviço durante sua execução e não pode ser recuperada por nenhuma API ou arquivo. Isso faz com que cada aplicação tenha uma chave única de autenticação.

As chaves perdem sua validade sempre que o sistema é reiniciado.

> **Importante:** em sistemas autobalanceados este sistema de geração de chave pode comprometer a correta validação dos tokens dos apps, uma vez que cada instância do serviço pode gerar tokens diferentes para a mesma aplicação.

### APP_AUTH_SECRET
Valor padrão: **null**

Tipo: **String**

Secret de autenticação para aplicações.

> **Importante**: caso *APP_AUTH_USE_RANDOM_SECRET* seja verdadeiro esta variável será ignorada. Dê prioridade para um secret definido em sistemas de carga balanceada a fim de manter a uniformidade dos tokens gerados por cada instância do serviço.


