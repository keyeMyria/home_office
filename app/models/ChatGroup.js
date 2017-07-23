// @flow
import * as models from './../lib/models';
import type Usuario from './Usuario';

type Role = 'ALUNO' | 'PROFESSOR' | 'RESPONSAVEL' | 'DIRETOR';

@models.register('ChatGroup', {
    id: models.PrimaryKey(),
    nome: models.String(),
    acesso: models.Array(),
    imagem: models.String(),
    usuarios: models.ManyToMany('Usuario'),
    children: models.OneToMany('ChatGroup'),
    parent: models.ForeignKey('ChatGroup'),
})
export default class ChatGroup extends models.Model {
    id: number;
    nome: string;
    acesso: Array<Role>;
    imagem: string;
    usuarios: Array<Usuario>;
    children: Array<ChatGroup>;
    parent: ChatGroup;
}
