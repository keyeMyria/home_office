// @flow
import * as models from './../lib/models';
import type Mensagem from './Mensagem';
import type Chat from './Chat';
import type ChatGroup from './ChatGroup';

type Role = 'ALUNO' | 'RESPONSAVEL' | 'PROFESSOR';

@models.register('Usuario', {
    nome: models.String(),
    sobrenome: models.String(),
    email: models.String(),
    imagem: models.String(),
    enabled: models.Boolean(),
    lastPasswordResetDate: models.Date(),
    role: models.String(),
    telefones: models.Array(),
    mensagens: models.OneToMany('Mensagem'),
    chats: models.ManyToMany('Chat'),
    chatGroups: models.ManyToMany('ChatGroup'),
    endpointArn: models.String(),
})
export default class Usuario extends models.Model {
    nome: string;
    sobrenome: string;
    email: string;
    imagem: string;
    enabled: boolean;
    lastPasswordResetDate: Date;
    role: Role;
    telefones: Array<string>;
    mensagens: Array<Mensagem>;
    chats: Array<Chat>;
    chatGroups: Array<ChatGroup>;
    endpointArn: string;

    get nomeCompleto() {
        return `${this.nome} ${this.sobrenome}`;
    }
}
