// @flow
import React, { Component } from 'react';
import { observable, computed, autorun } from 'mobx';
import type { ObservableMap } from 'mobx';
import { observer } from 'mobx-react/native';

import { Aviso, Turma, Aluno } from './../../../../models';
import TurmaService from '../../../../services/TurmaService';
import AlunoService from '../../../../services/AlunoService';

import professorStore from '../../../../stores/ProfessorStore';
import ComunicadosModal from './ComunicadosModal';

import ScreenShell from '../../../../components/ScreenShell';
import StudentPicker from '../../../../components/StudentPicker';
import { DatePickerField, createForeignKeyField } from './../../../../components/mobx_fields';
import type { ScreenShellProps } from '../../../../components/ScreenShell';

@observer
export default class ComunicadosScreen extends Component {
    cancelTurmaAutorun: *;
    cancelAlunosAutorun: *;

    comunicado = new Aviso({ tipo: 'COMUNICADO' });
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
        // this.save = this.save.bind(this);
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

    @computed
    get alunosSelected(): Array<Aluno> {
        return this.alunosMap.values().filter(a => a._selected);
    }

    @computed
    get canSave(): boolean {
        return !!(this.comunicado.data && this.alunosSelected.length);
    }

    get screenShellProps(): ScreenShellProps {
        const { navigate } = this.props.navigation;
        return {
            navigate,
            title: 'Comunicados',
            rightPress: this.showModal,
            rightText: 'Próximo',
            showRight: this.canSave,
        };
    }

    showModal = () => {
        this.store.modalVisible = true;
    };

    hideModal = () => {
        this.store.modalVisible = false;
    };

    render() {
        return (
          <ScreenShell {...this.screenShellProps}>
            <DatePickerField label="Data" store={this.comunicado} storeKey="data" />
            {createForeignKeyField('Ano', professorStore.anosMap, this.store, 'ano')}
            {createForeignKeyField('Turma', this.turmasMap, this.store, 'turma')}
            <StudentPicker alunos={this.alunosMap.values()} selectAll />
            <ComunicadosModal
              visible={this.store.modalVisible}
              comunicado={this.comunicado}
              alunos={this.alunosMap.values()}
              navigation={this.props.navigation}
              hide={this.hideModal}
            />
          </ScreenShell>
        );
    }
}
