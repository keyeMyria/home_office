// @flow
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { observable, computed, autorun } from 'mobx';
import type { ObservableMap } from 'mobx';
import { observer } from 'mobx-react/native';
import moment from 'moment';

import { Falta, Turma, Aluno } from './../../../models';
import TurmaService from './../../../services/TurmaService';
import AlunoService from './../../../services/AlunoService';
import FaltaService from './../../../services/FaltaService';

import professorStore from './../../../stores/ProfessorStore';
import escolaStore from './../../../stores/EscolaStore';

import logger from './../../../lib/logger';

import ScreenShell from './../../../components/ScreenShell';
import StudentPicker from './../../../components/StudentPicker';
import { DatePickerField, createForeignKeyField } from './../../../components/mobx_fields';
import type { ScreenShellProps } from './../../../components/ScreenShell';

@observer
export default class FaltasScreen extends Component {
    cancelTurmaAutorun: *;
    cancelAlunosAutorun: *;
    @observable falta: ?Falta = null;
    @observable loading: boolean = false;
    @observable turmasMap: ObservableMap<Turma> = observable.map({});
    @observable alunosMap: ObservableMap<Aluno> = observable.map({});

    @observable
    store = {
        ano: null,
        turma: null,
        data: moment().startOf('day'),
        disciplina: undefined,
    };

    constructor(props: *) {
        super(props);

        this.cancelTurmaAutorun = autorun(() => {
            if (this.store.ano) {
                this.fecthTurmas();
            }
        });

        this.cancelAlunosAutorun = autorun(() => {
            if (this.lancamentoFaltasPorDisciplina && !this.store.disciplina) return;
            if (this.store.turma) {
                this.fecthAlunos();
            }
        });
        // $FlowFixMe
        this.save = this.save.bind(this);
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
        const { turma, data, disciplina } = this.store;
        if (!turma || !data) return;
        const dataString = moment(data).format('YYYY-MM-DD');
        const service = new AlunoService();
        const resultAlunos = await service.findByTurma(turma.pk);
        const faltaService = new FaltaService();
        let alunosId = [];
        let result;
        try {
            if (this.lancamentoFaltasPorDisciplina && !!disciplina) {
                console.warn('disciplina', disciplina.id, 'data', dataString);
                result = await faltaService.findByDisciplinaAndData(disciplina.id, dataString);
            } else {
                result = await faltaService.findByData(dataString);
            }
            alunosId = result.alunos.map(a => a.id);
            this.falta = new Falta(result);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                this.falta = new Falta({});
                this.falta.disciplina = disciplina;
                this.falta.data = moment(data).startOf('day');
            } else {
                throw error;
            }
        }
        const alunos = Aluno.fromArray(resultAlunos.alunos).map((t) => {
            if (alunosId.indexOf(t.id) !== -1) {
                t._selected = true; // eslint-disable-line
            }
            return [t.pk, t];
        });

        this.alunosMap.replace(alunos);
    }

    async save() {
        // const falta = this.falta;
        // if (!falta.id) {
        //     console.warn('Nova falta');
        //     const faltaData = this.falta.toJS();
        //     faltaData.data = moment(faltaData.data).format('YYYY-MM-DD');
        //     console.warn('', faltaData);
        // } else {
        //     console.warn('Falta Já Existe');
        // }

        const { navigate } = this.props.navigation;
        try {
            const service = new FaltaService();
            let falta = this.falta;
            if (!falta.id) {
                const faltaData = this.falta.toJS();
                faltaData.data = moment(faltaData.data).format('YYYY-MM-DD');
                const response = await service.post(faltaData);
                falta = new Falta(response);
            }
            // $FlowFixMe
            const alunosSelected = this.alunosMap.values().filter(a => a._selected);
            const alunosLink = alunosSelected.map(a => a._selfLink);
            await service.one(falta.pk).all('alunos').put(alunosLink.join('\n'), true);
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
        // const alunosSelected = this.alunosMap.values().filter(a => a._selected);
        // return !!(this.falta.data && this.falta.disciplina && alunosSelected.length);
        return !!this.falta;
    }

    @computed
    get lancamentoFaltasPorDisciplina(): boolean {
        return escolaStore.getConfig('lancamentoFaltas') === 'POR_DISCIPLINA';
    }

    get screenShellProps(): ScreenShellProps {
        const { navigate } = this.props.navigation;
        return {
            navigate,
            title: 'Faltas',
            rightPress: this.save,
            rightText: 'Salvar',
            showRight: this.canSave,
        };
    }

    render() {
        return (
          <ScreenShell {...this.screenShellProps} loading={this.loading}>
            <DatePickerField label="Data" store={this.store} storeKey="data" />
            {this.lancamentoFaltasPorDisciplina &&
                    createForeignKeyField(
                        'Disciplina',
                        professorStore.disciplinasMap,
                        this.store,
                        'disciplina',
                    )}
            {createForeignKeyField('Ano', professorStore.anosMap, this.store, 'ano')}
            {createForeignKeyField('Turma', this.turmasMap, this.store, 'turma')}
            <StudentPicker alunos={this.alunosMap.values()} />
          </ScreenShell>
        );
    }
}
