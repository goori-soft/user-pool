# User Pool

# About this project

This project is simple user pool service.

# Indice

- [Conceitos](./Concepts.md)
- [APIs](./APIs.md)

# How does it work?

To start this project just use:

```bash
npm run start
```

# Ambiente de desenvolvimento

Para configurar o ambiente de desenvolvimento automaticamente utilize:

```bash
npm run dev:up
```

Ou, para configurar e rodar o projeto ao mesmo tempo, apenas

```bash
npm run dev
```

Estes comando vão iniciar dois containers, um de base de dados e outro para rodar o projeto node em si. Esses ambiente não serão automaticamente descartados.

Para para container de ambiente de desenvolvimento utilize:

```bash
npm run dev:down
```

# Testes

Este projeto possui testes automatizados para garantir sua consistência. Para rodar os testes automatizados utilize:

```bash
npm run test
```

Este comando deve rodar automaticamente testes unitários e de integração. Para rodas somente testes unitários utilize:

```bash
npm run test:unit
```

Para rodar somente os testes de integração utilize:

```bash
npm run test:integration
```

> Nota: Os testes de integração sobem automaticamente o container de base de dados de ambiente de desenvolvimento. Finalizados os testes esse container é encerrado automaticamente.

> Nota: Em processo de refaturamente pode ser util manter os testes unitários rodando. Para isso utilize o comando `npm run test:unit:watch`
