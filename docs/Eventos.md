Eventos
=======

> O sistema de eventos é baseado no EventEmmiter2 a API completa pode ser
> encontrada em [EventEmitter2](https://github.com/asyncly/EventEmitter2)

O primeiro argumento de todos os eventos é um objeto com informações pertinentes ao evento.

## Emitindo um Evento
```javascript
import EventEmitter from 'react-native-eventemitter';

EventEmitter.emit('auth.login_success', {
    user: userObject,
    token: 'eyJhbGciOiJIUzUxMiJ9....'
    ...
});
```

## Adicionando um listener
```javascript
import EventEmitter from 'react-native-eventemitter';

EventEmitter.on('auth.login_success', ({ user, payload }) => {
    // Do something
});

// Listening for all 'auth' events
// Se for necessário usar o nome do evento atual, não pode usar arrow function
// por conta do bind implicito que ocorre nestas, devento então usar uma função
// o nome do evento pode ser recuperado usando this.event;
// Note que usar bind this também não vai funcionar,
EventEmitter.on('auth.*', function(evData) {
    const evName = this.event; // Não vai funcionar com arrow function
    if(evName === 'auth.login_error'){
        // Do Something
    }
    // Do something
});
```

`auth.*`
-------

Serie de eventos relacionados á autenticação

<!-- ----------------------------------------------------------------------  -->
### `auth.authenticated`
Evento disparado quando o usuário tem autenticação seja por login ou quando o
token é recarregado do localStorage

#### Propriedades
| Nome     | Tipo   | Descrição                                                        |
|----------|--------|------------------------------------------------------------------|
| token    | string | JWT token                                                        |
| payload  | object | Payload retornado no token                                       |
| userID   | number | ID do usuário logado                                             |
| userRole | string | tipo do usuário: 'ALUNO', 'PROFESSOR', 'RESPONSAVEL' ou DIRETOR' |

<!-- ----------------------------------------------------------------------  -->
### `auth.login_success`
Evento disparado quando um login é realizado com sucesso

#### Propriedades
| Nome    | Tipo   | Descrição                  |
|---------|--------|----------------------------|
| token   | string | JWT token                  |
| payload | object | Payload retornado no token |
| userID  | number | ID do usuário logado       |

<!-- ----------------------------------------------------------------------  -->
### `auth.login_error`
Evento disparado quando ocorre um erro no login

#### Propriedades
| Nome       | Tipo   | Descrição                                    |
|------------|--------|----------------------------------------------|
| code       | number | código de erro HTTP                          |
| message    | string | Mensagem _Human Readable_ descrevendo o erro |
| loginType  | string | 'FACEBOOK' ou 'PASSWORD'                     |

<!-- ----------------------------------------------------------------------  -->
### `auth.logout`
Evento disparado quando usuário faz logout

#### Propriedades
| Nome     | Tipo   | Descrição    |
|----------|--------|--------------|
| oldToken | string | Token antigo |

<!-- ----------------------------------------------------------------------  -->
### `auth.invalid_token`
Evento disparado quando uma resquest feita pelo httpClient retorna 401, tendo
um token configurado

#### Propriedades
| Nome | Tipo | Descrição |
|------|------|-----------|
|      |      |           |

<!-- ----------------------------------------------------------------------  -->
### `auth.reload_endpoint_arn`
Evento disparado quando um novo endpointArn é carregado

#### Propriedades
| Nome        | Tipo           | Descrição      |
|-------------|----------------|----------------|
| endpointArn | string ou null | ARN do usuário |

<!-- ----------------------------------------------------------------------  -->
### `auth.user_loaded`
Evento disparado quando o token é carregado da localStorage

#### Propriedades
| Nome    | Tipo   | Descrição                  |
|---------|--------|----------------------------|
| token   | string | JWT token                  |
| payload | object | Payload retornado no token |
| userID  | number | ID do usuário logado       |