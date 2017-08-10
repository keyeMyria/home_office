// @flow
import React, { Component } from 'react';
import { Modal, View, Alert } from 'react-native';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';

import {
    List,
    ListItem,
    Body,
    Text,
    Right,
    CheckBox,
    Item,
    Label,
} from 'native-base';

import ScreenShell from './../../../../components/ScreenShell';
import type { ScreenShellProps } from './../../../../components/ScreenShell';
import { Aviso } from './../../../../models';
import { createTextField } from './../../../../components/mobx_fields';
import AvisoService from '../../../../services/AvisoService';

function RoleItem(props) {
    const { role, toggleRoleSelection } = props;
    const onPress = toggleRoleSelection.bind(this, role.id);

    return (
      <ListItem
        onPress={onPress}
        icon
      >
        <Body>
          <Text>
            {role.id}
          </Text>
        </Body>
        <Right>
          <CheckBox checked={role.selected} />
        </Right>
      </ListItem>
    );
}

@observer
export default class ComunicadosModal extends Component {

    props: {
        save(): *,
        comunicado: Aviso,
        visible: boolean,
        hide(): void,
    };

    @observable
    roles = {
        PROFESSOR: false,
        ALUNO: false,
        RESPONSAVEL: false,
        DIRETOR: false,
    };

    get canSave(): boolean {
        const { titulo, detalhes } = this.props.comunicado;
        const textFieldsAreFilled = titulo.length && detalhes.length;
        return Object.keys(this.roles).some(key => this.roles[key]) && textFieldsAreFilled;
    }

    get screenShellProps(): ScreenShellProps {
        return {
            navigate: () => {},
            title: 'Destinatários',
            leftIcon: 'arrow-back',
            leftPress: this.props.hide,
            rightPress: this.saveComunicado.bind(this),
            rightText: 'Salvar',
            showRight: this.canSave,
        };
    }

    toggleRoleSelection = (roleId) => {
        this.roles[roleId] = !this.roles[roleId];
    };

    async saveComunicado() {
        const { comunicado, alunos } = this.props;
        const service = new AvisoService();
        const alunosSelecionados = alunos.filter(aluno => aluno._selected);
        const alunosLinks = alunosSelecionados.map(aluno => aluno._selfLink);

        comunicado.roles = Object.keys(this.roles).filter(key => this.roles[key]);

        const result = await service.post(comunicado.toJS());
        const newComunicado = new Aviso(result);
        service.one(newComunicado.pk).all('alunos').put(alunosLinks.join('\n'), true)
            .then(() => {
                Alert.alert(
                    'Sucesso',
                    `Comunicado "${comunicado.titulo}" enviado com sucesso.`,
                    [
                        {
                            text: 'Ok',
                            onPress: () => {
                                this.props.navigation.navigate('HomeRouter');
                                this.props.hide();
                            },
                        },
                    ],
                    { cancelable: false },
                );
            })
            .catch(() => {
                Alert.alert(
                    'Erro',
                    `Erro ao salvar comunicado "${comunicado.titulo}".`,
                    [], { cancelable: true },
                );
                Alert.alert('Erro ao salvar comunicado');
            });
    }

    render() {
        const { comunicado, hide, visible } = this.props;

        return (
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={visible}
            onRequestClose={hide}
          >
            <ScreenShell {...this.screenShellProps}>
              <Item stackedLabel style={{ flexDirection: 'row', marginTop: 5 }}>
                <Label>Selecione os destinatários:</Label>
                <View style={{ flex: 1 }} />
              </Item>
              <List style={{ marginBottom: 10 }}>
                {
                        Object.keys(this.roles).map(key => (
                          <RoleItem
                            toggleRoleSelection={this.toggleRoleSelection}
                            role={{ id: key, selected: this.roles[key] }}
                            key={key}
                          />
                            ))
                    }
              </List>
              {createTextField('Título', comunicado, 'titulo', { style: { marginBottom: 10 } })}
              {createTextField('Mensagem', comunicado, 'detalhes', { multiline: true })}
            </ScreenShell>
          </Modal>
        );
    }
}
