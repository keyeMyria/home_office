// @flow
import * as models from './base';
import Chat from './Chat';
import Usuario from './Usuario';

@models.register('Mensagem', {
    texto: models.String(),
    data: models.Date(),
    lida: models.Boolean(),
    chat: models.ForeignKey('Chat'),
    de: models.ForeignKey('Usuario'),
})
export default class Mensagem extends models.Model {
    texto: string;
    data: Date;
    lida: boolean;
    chat: Chat;
    de: Usuario;
}
