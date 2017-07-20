// @flow
import * as models from './../lib/models';
import type Usuario from './Usuario';


@models.register('ChatGroup', {
    nome: models.String(),
    acesso: models.Array(),
    imagem: models.String(),
    usuarios: models.ManyToMany('Usuario'),
    children: models.OneToMany('ChatGroup'),
    parent: models.ForeignKey('ChatGroup'),
})
export default class ChatGroup extends models.Model {
    nome: string;
    acesso: Array<Role>;
    imagem: string;
    usuarios: Array<Usuario>;
    children: Array<ChatGroup>;
    parent: ChatGroup;
}
