// @flow
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { observer } from 'mobx-react/native';

import CONFIG from './../../../../../config';

import { Ocorrencia } from './../../../../models';

import logger from './../../../../lib/logger';
import dialog from './../../../../lib/dialog';

import ScreenShell from './../../../../components/ScreenShell';
import StudentPicker from './../../../../components/StudentPicker';
import {
    DatePickerField,
    createTextField,
    createPickerField,
} from './../../../../components/mobx_fields';
import type { ScreenShellProps } from './../../../../components/ScreenShell';

@observer
export default class EditarOcorrenciaScreen extends Component {
    props: {
        ocorrencia: Ocorrencia,
    };

    ocorrencia = new Ocorrencia({});

    constructor(props: any) {
        super(props);
        if (this.props.navigation.state && this.props.navigation.state.params) {
            this.ocorrencia = this.props.navigation.state.params.ocorrencia;
        }
        if (this.ocorrencia.alunos) {
            this.ocorrencia.alunos.forEach((aluno) => {
                // eslint-disable-next-line no-param-reassign
                aluno._selected = true;
            });
        }
    }

    componentWillUnmount() {}

    save = async () => {
        const { goBack } = this.props.navigation;
        try {
            await this.ocorrencia.save();
            dialog.success('Dados salvos com sucesso!', () => goBack());
        } catch (error) {
            logger.error(error);
            logger.warn('response', error.response);
            Alert.alert('Erro', 'Ocoreu um erro');
        }
    };

    get screenShellProps(): ScreenShellProps {
        const { navigate, goBack } = this.props.navigation;
        return {
            navigate,
            leftIcon: 'arrow-back',
            leftPress: () => goBack(),
            title: 'Ocorrências',
            rightPress: this.save,
            rightText: 'Salvar',
            showRight: true,
        };
    }

    get motivos(): Array<[string, string]> {
        const motivos = CONFIG.OCORRENCIAS.tipoNameMap;
        return Object.keys(motivos).map(k => [k, motivos[k]]);
    }

    render() {
        return (
          <ScreenShell {...this.screenShellProps}>
            <DatePickerField label="Data" store={this.ocorrencia} storeKey="data" />
            {createPickerField('Motivo', this.motivos, this.ocorrencia, 'tipo')}
            {createTextField('Comentários', this.ocorrencia, 'detalhes', {
                multiline: true,
                maxLength: 2000,
            })}
            <StudentPicker alunos={this.ocorrencia.alunos} />
          </ScreenShell>
        );
    }
}
