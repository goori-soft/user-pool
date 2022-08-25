# Conceitos

## Consumidores

Consumidores são aplicações externas capazes de consumir as APIs deste projeto. Os consumidores são registrados em base de dados e todos eles possuem uma chave de acesso (accessKey) para fazer a autenticação e consumo.

## Usuários

Usuários são entidades que representam o ativo principal deste serviço.

## Grupos

São entidades utilizadas para organizar os usuários. Os grupos se relacionam com os usuários através dos perfis. Um grupo possui perfis, não usuários.

## Perfis

São entidades que descrevem as possibilidades de ação de um ou mais usuários dentro de um grupo. É o elo entre os grupos e usuários. Usuários podem possuir vários perfis de grupos diferentes.
