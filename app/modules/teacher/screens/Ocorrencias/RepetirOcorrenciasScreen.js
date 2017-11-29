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
export default class RepetirOcorrenciaScreen extends Component {
    props: {
        ocorrencia: Ocorrencia,
    };

    ocorrencia = new Ocorrencia({});

    novaOcorrencia = new Ocorrencia({});

    constructor(props: any) {
        super(props);
        if (this.props.navigation.state && this.props.navigation.state.params) {
            this.novaOcorrencia.tipo = this.props.navigation.state.params.ocorrencia.tipo;
            this.novaOcorrencia.alunos = this.props.navigation.state.params.ocorrencia.alunos;
        }
        if (this.novaOcorrencia.alunos) {
            this.novaOcorrencia.alunos.forEach((aluno) => {
                // eslint-disable-next-line no-param-reassign
                aluno._selected = true;
            });
        }
    }

    componentWillUnmount() {}

    save = async () => {
        const { goBack } = this.props.navigation;
        try {
            await this.novaOcorrencia.saveRelated(
                'alunos',
                this.novaOcorrencia.alunos.filter(a => a._selected),
            );
            await this.novaOcorrencia.save();
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
            rightText: 'Criar nova',
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
            <DatePickerField label="Data" store={this.novaOcorrencia} storeKey="data" />
            {createPickerField('Motivo', this.motivos, this.novaOcorrencia, 'tipo')}
            {createTextField('Comentários', this.novaOcorrencia, 'detalhes', {
                multiline: true,
                maxLength: 2000,
            })}
            <StudentPicker alunos={this.novaOcorrencia.alunos || []} />
          </ScreenShell>
        );
    }
}
