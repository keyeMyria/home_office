// @flow
import { observable } from 'mobx';

import * as models from './../lib/models';
import { avatar } from './../lib/img';

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

@models.register('Aluno', {
    id: models.PrimaryKey(),
    nome: models.String(),
    sobrenome: models.String(),
    email: models.String(),
    password: models.String(),
    imagem: models.String(),
    enabled: models.Boolean(),
    lastPasswordResetDate: models.Date(),
    role: models.Static('ALUNO'),
    telefones: models.String(),
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
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    password: string;
    imagem: string;
    enabled: boolean;
    lastPasswordResetDate: Date;
    role: 'ALUNO';
    telefones: string;
    turma: Turma;

    // Related fields
    mensagens: Array<Mensagem>;
    chats: Array<Chat>;
    chatGroups: Array<ChatGroup>;
    faltas: Array<Falta>;
    atrasos: Array<Atraso>;
    notas: Array<Nota>;
    ocorrencias: Array<Ocorrencia>;
    rotinas: Array<Rotina>;
    responsaveis: Array<Responsavel>;
    avisos: Array<Responsavel>;
    listasGeradas: Array<ListaGerada>;

    // Used for selecting alunos in StudentPicker Component
    @observable _selected: boolean = false;

    get imageSource(): Object {
        return avatar(this.imagem);
    }

    get nomeCompleto(): string {
        return `${this.nome} ${this.sobrenome || ''}`.trim();
    }

    toString(): string {
        return this.nome;
    }
}
