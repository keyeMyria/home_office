// @flow
import * as models from './base';
import type Mensagem from './Mensagem';
import type Chat from './Chat';
import type ChatGroup from './ChatGroup';

@models.register('Usuario', {
    nome: models.String(),
    email: models.String(),
    password: models.String(),
    imagem: models.String(),
    enabled: models.Boolean(),
    lastPasswordResetDate: models.Date(),
    role: models.String(),
    telefones: models.Array(),
    mensagens: models.OneToMany('Mensagem'),
    chats: models.ManyToMany('Chat'),
    chatGroups: models.ManyToMany('ChatGroup'),
})
export default class Usuario extends models.Model {
    nome: string;
    email: string;
    password: string;
    imagem: string;
    enabled: boolean;
    lastPasswordResetDate: Date;
    role: Role;
    telefones: Array<string>;
    mensagens: Array<Mensagem>;
    chats: Array<Chat>;
    chatGroups: Array<ChatGroup>;
}
