// @flow
import React, { Component } from 'react';
import { Modal } from 'react-native';
import { observer } from 'mobx-react/native';

import ScreenShell from './../../../../components/ScreenShell';
import type { ScreenShellProps } from './../../../../components/ScreenShell';
import CONFIG from './../../../../../config';
import { Ocorrencia } from './../../../../models';
import { createPickerField, createTextField } from './../../../../components/mobx_fields';

@observer
export default class OcorrenciaModal extends Component {
    props: {
        save(): *,
        ocorrencia: Ocorrencia,
        visible: boolean,
        hide(): void,
    };

    get canSave(): boolean {
        return !!this.props.ocorrencia.tipo;
    }

    get motivos(): Array<[string, string]> {
        const motivos = CONFIG.OCORRENCIAS.tipoNameMap;
        return Object.keys(motivos).map(k => [k, motivos[k]]);
    }

    get screenShellProps(): ScreenShellProps {
        return {
            navigate: () => {},
            title: 'Motivo',
            leftIcon: 'arrow-back',
            leftPress: this.props.hide,
            rightPress: this.props.save,
            rightText: 'Salvar',
            showRight: this.canSave,
        };
    }

    render() {
        const { ocorrencia, hide, visible } = this.props;

        return (
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={visible}
            onRequestClose={hide}
          >
            <ScreenShell {...this.screenShellProps}>
              {createPickerField('Motivo', this.motivos, ocorrencia, 'tipo')}
              {createTextField('Comentários', ocorrencia, 'detalhes', { multiline: true, maxLength: 2000 })}
            </ScreenShell>
          </Modal>
        );
    }
}
