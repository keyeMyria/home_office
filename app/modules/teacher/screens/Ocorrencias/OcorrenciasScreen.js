// @flow
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { observable, computed, autorun } from 'mobx';
import type { ObservableMap } from 'mobx';
import { observer } from 'mobx-react/native';

import { Ocorrencia, Turma, Aluno } from './../../../../models';
import TurmaService from './../../../../services/TurmaService';
import AlunoService from './../../../../services/AlunoService';
import OcorrenciaService from './../../../../services/OcorrenciaService';

import professorStore from './../../../../stores/ProfessorStore';

import logger from './../../../../lib/logger';

import ScreenShell from './../../../../components/ScreenShell';
import StudentPicker from './../../../../components/StudentPicker';
import { DatePickerField, createForeignKeyField } from './../../../../components/mobx_fields';
import type { ScreenShellProps } from './../../../../components/ScreenShell';
import OcorrenciaModal from './OcorrenciaModal';

@observer
export default class OcorrenciaScreen extends Component {
    cancelTurmaAutorun: *;
    cancelAlunosAutorun: *;

    ocorrencia = new Ocorrencia({});
    @observable turmasMap: ObservableMap<Turma> = observable.map({});
    @observable alunosMap: ObservableMap<Aluno> = observable.map({});

    @observable
    store = {
        ano: null,
        turma: null,
        modalVisible: false,
    };

    constructor(props: *) {
        super(props);

        this.cancelTurmaAutorun = autorun(() => {
            if (this.store.ano) {
                this.fecthTurmas();
            }
        });

        this.cancelAlunosAutorun = autorun(() => {
            if (this.store.turma) {
                this.fecthAlunos();
            }
        });
        // $FlowFixMe
        this.save = this.save.bind(this);
    }

    @computed
    get alunosSelected(): Array<Aluno> {
        return this.alunosMap.values().filter(a => a._selected);
    }

    componentWillUnmount() {
        this.cancelAlunosAutorun();
        this.cancelTurmaAutorun();
    }

    async fecthTurmas() {
        const ano = this.store.ano;
        if (!ano) return;
        const service = new TurmaService();
        const result = await service.findByAnoAndProfessor(ano.pk, professorStore.id);
        const turmas = Turma.fromArray(result.turmas).map(t => [t.pk, t]);
        this.turmasMap.replace(turmas);
    }

    async fecthAlunos() {
        const turma = this.store.turma;
        if (!turma) return;
        const service = new AlunoService();
        const result = await service.findByTurma(turma.pk);
        const alunos = Aluno.fromArray(result.alunos).map(t => [t.pk, t]);
        this.alunosMap.replace(alunos);
    }

    showModal = () => {
        this.store.modalVisible = true;
    };

    hideModal = () => {
        this.store.modalVisible = false;
    };

    async save() {
        const { navigate } = this.props.navigation;
        try {
            const service = new OcorrenciaService();
            const ocorrenciaData = this.ocorrencia.toJS();
            const response = await service.post(ocorrenciaData);
            const ocorrencia = new Ocorrencia(response);
            // $FlowFixMe
            const alunosSelected = this.alunosMap.values().filter(a => a._selected);
            const alunosLink = alunosSelected.map(a => a._selfLink);
            await service.one(ocorrencia.pk).all('alunos').put(alunosLink.join('\n'), true);
            Alert.alert('Sucesso', 'Dados salvos com sucesso!');
            navigate('CalendarScreen');
        } catch (error) {
            logger.error(error);
            logger.warn('response', error.response);
            Alert.alert('Erro', 'Ocoreu um erro');
        }
    }

    @computed
    get canSave(): boolean {
        return !!(this.ocorrencia.data && this.alunosSelected.length);
    }

    get screenShellProps(): ScreenShellProps {
        const { navigate } = this.props.navigation;
        return {
            navigate,
            title: 'Ocorrências',
            rightPress: this.showModal,
            rightText: 'Próximo',
            showRight: this.canSave,
        };
    }

    render() {
        return (
          <ScreenShell {...this.screenShellProps}>
            <DatePickerField label="Data" store={this.ocorrencia} storeKey="data" />
            {createForeignKeyField('Ano', professorStore.anosMap, this.store, 'ano')}
            {createForeignKeyField('Turma', this.turmasMap, this.store, 'turma')}
            <StudentPicker alunos={this.alunosMap.values()} />
            <OcorrenciaModal
              visible={this.store.modalVisible}
              ocorrencia={this.ocorrencia}
              save={this.save}
              hide={this.hideModal}
            />
          </ScreenShell>
        );
    }
}
