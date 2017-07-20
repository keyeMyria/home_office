// @flow
import * as models from './../lib/models';
import type Falta from './Falta';
import type Atraso from './Atraso';
import type Nota from './Nota';
import type Ocorrencia from './Ocorrencia';
import type Rotina from './Rotina';
import type Turma from './Turma';
import type Responsavel from './Responsavel';
import type ListaGerada from './ListaGerada';
import type Mensagem from './Mensagem';
import type Chat from './Chat';
import type ChatGroup from './ChatGroup';

type Role = 'ALUNO' | 'PROFESSOR' | 'DIRETOR';

@models.register('Aluno', {
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
    faltas: models.ManyToMany('Falta'),
    atrasos: models.ManyToMany('Atraso'),
    notas: models.OneToMany('Nota'),
    ocorrencias: models.ManyToMany('Ocorrencia'),
    rotinas: models.OneToMany('Rotina'),
    turma: models.ForeignKey('Turma'),
    responsaveis: models.ManyToMany('Responsavel'),
    avisos: models.ManyToMany('Responsavel'),
    listasGeradas: models.OneToMany('ListaGerada'),
})
export default class Aluno extends models.Model {
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
    faltas: Array<Falta>;
    atrasos: Array<Atraso>;
    notas: Array<Nota>;
    ocorrencias: Array<Ocorrencia>;
    rotinas: Array<Rotina>;
    turma: Turma;
    responsaveis: Array<Responsavel>;
    avisos: Array<Responsavel>;
    listasGeradas: Array<ListaGerada>;
}
