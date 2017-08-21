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
import { createForeignKeyField } from './../../../../components/mobx_fields';
import type { ScreenShellProps } from '../../../../components/ScreenShell';

@observer
export default class ComunicadosScreen extends Component {
    cancelTurmaAutorun: *;

    comunicado = new Aviso({ tipo: 'COMUNICADO', data: new Date() });
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
    }

    componentWillMount() {
        this.fecthAlunos();
    }

    componentWillUnmount() {
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
        const service = new AlunoService();
        const result = await service.findByProfessor(professorStore.id);
        const alunos = Aluno.fromArray(result.alunos).map(t => [t.pk, t]);
        this.alunosMap.replace(alunos);
    }

    @computed
    get alunos(): Array<Aluno> {
        const alunos = this.alunosMap.values();
        const { ano, turma } = this.store;

        return alunos.filter((a) => {
            if (turma) {
                return a.turma.id === turma.id;
            } else if (ano) {
                return a.turma.ano.id === ano.id;
            }
            return true;
        });
    }

    @computed
    get alunosSelecionados(): Array<Aluno> {
        return this.alunos.filter(a => a._selected);
    }

    @computed
    get canSave(): boolean {
        return !!(this.comunicado.data && this.alunosSelecionados.length);
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
            {createForeignKeyField('Ano', professorStore.anosMap, this.store, 'ano')}
            {createForeignKeyField('Turma', this.turmasMap, this.store, 'turma', {
                disabled: !this.store.ano,
            })}
            <StudentPicker alunos={this.alunos} selectAll />
            <ComunicadosModal
              visible={this.store.modalVisible}
              comunicado={this.comunicado}
              alunosSelecionados={this.alunosSelecionados}
              navigation={this.props.navigation}
              hide={this.hideModal}
            />
          </ScreenShell>
        );
    }
}
