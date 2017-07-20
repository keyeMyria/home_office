// @flow
import * as models from './../lib/models';
import type Mensagem from './Mensagem';
import type Usuario from './Usuario';

@models.register('Chat', {
    imagem: models.String(),
    nome: models.String(),
    ultimaAtividade: models.Date(),
    mensagens: models.OneToMany('Mensagem'),
    usuarios: models.ManyToMany('Usuario'),
})
export default class Chat extends models.Model {
    imagem: string;
    nome: string;
    ultimaAtividade: Date;
    mensagens: Array<Mensagem>;
    usuarios: Array<Usuario>;
}
