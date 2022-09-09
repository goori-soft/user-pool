# Eventos

A maior parte das ações dentro do pool de usuários é capaz de disparar eventos que podem ser escutados por um barramento de eventos.

## Implementação

Para que os eventos possam ser disparados é preciso que o barramento de eventos seja implementado:

```ts
export class EventBus implements IEventBus {
  emit(eventName: string, message: any): Promise<void> {
    // ... implementation
  }

  on(eventName: string, handler: EventHandler): Promise<void> {
    // ... implementation
  }
}

const eventBus = new EventBus();
```

Também é possível utilizar a implemmentação padrão, baseada em memória, do próprio pool de usuários:

```ts
const eventBus = new userPool.defaultImplementation.EventBus();
```

Uma vez implementado é preciso que este barramento de eventos seja passado dentro do conjunte de opções para os casos de uso dos quais se deseja ouvir os eventos:

```ts
// ...
const options = {
  // ...
  userRepository,
  eventBus,
};

const { userId } = await userPool.registerUser(
  userInputPayload,
  consumerId,
  options
);
// ...
```

## Ouvindo eventos

Para escutar os eventos disparados por uma determinada ação dos casos de uso é preciso implementar o ouvinte na mesma implementação do barramento de eventos:

```ts
eventBus.on(Events.USER_CREATED, (event) => {
  const {name, body} = event
  ...
})
```

> Nota: caso a implementação do barrammento seja feita em memória é obrigatório que o ouvinte utilize a mesma implementação do barramento dentro da mesma thread de processamento. Para utilizar eventos entre threads, serviços ou servidores é preciso implementar um barramento de evento externo, por exemplo RabbitMQ.

## Eventos

### Usuário master autenticado: **MASTER_AUTHENTICATED**

Estrutura:

```ts
{
  name: 'MASTER_AUTHENTICATED',
  identifier: string, // uniq event identifier
  issuedOn: string, // date string '1985-12-31T14:20:30.15Z'
  body: {}
}
```

### Consumidor criado: **CONSUMER_CREATED**

Estrutura:

```ts
{
  name: 'CONSUMER_CREATED',
  identifier: string, // uniq event identifier
  issuedOn: string, // date string '1985-12-31T14:20:30.15Z'
  body: {
    consumer: {
      id: string,
      name: string,
      email: string,
      origin: [string],
      userMaxNumber: number,
      groupMaxNumber: number,
    }
  }
}
```

### Consumidor autenticado: **CONSUMER_AUTHENTICATED**

Estrutura:

```ts
{
  name: 'CONSUMER_AUTHENTICATED',
  identifier: string, // uniq event identifier
  issuedOn: string, // date string '1985-12-31T14:20:30.15Z'
  body: {
    consumer: {
      id: string,
      name: string,
      email: string,
      origin: [string],
      userMaxNumber: number,
      groupMaxNumber: number,
    }
  }
}
```

### Falha na autenticação do consumidor: **CONSUMER_AUTHENTICATION_FAILED**

Estrutura:

```ts
{
  name: 'CONSUMER_AUTHENTICATION_FAILED',
  identifier: string, // uniq event identifier
  issuedOn: string, // date string '1985-12-31T14:20:30.15Z'
  body: {
    consumer: {
      id: string,
      name?: string, // este valor não é retornado caso o consumidor não exista
      email?: string, // este valor não é retornado caso o consumidor não exista
      origin?: [string], // este valor não é retornado caso o consumidor não exista
      userMaxNumber?: number, // este valor não é retornado caso o consumidor não exista
      groupMaxNumber?: number, // este valor não é retornado caso o consumidor não exista
    }
  }
}
```
