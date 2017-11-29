// @flow
import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react/native';

import { Text, ListItem, List } from 'native-base';

import logger from './../../../lib/logger';

import { Aula } from './../../../models';

import professorStore from '../../../stores/ProfessorStore';
import userStore from '../../../stores/UserStore';

import ScreenShell from '../../../components/ScreenShell';
import type { ScreenShellProps } from '../../../components/ScreenShell';

@observer
export default class HorariosScreen extends Component {

    @observable pesquisa: any;

    constructor(props: *) {
        super(props);

        this.fetchAulas();
    }

    fetchAulas() {
        Aula.findByProfessor(professorStore.id)
            .then((aulas) => {
                this.pesquisa = Aula.fromArray(aulas);
                logger.warn(this.pesquisa);
            })
            .catch(() => logger.warn('fetchAulas error'));
    }

    get screenShellProps(): ScreenShellProps {
        const { navigate } = this.props.navigation;
        return {
            navigate,
            title: 'Horários',
        };
    }

    renderItems(item: any) {
        return (
          <ListItem key={item.id}>
            <Text>{String(item.disciplina)} {String(item.horario.inicio)} {' - '} {String(item.horario.fim)}</Text>
          </ListItem>
        );
    }

    render() {
        return (
          <ScreenShell {...this.screenShellProps}>
            <Text style={{ padding: 8, paddingHorizontal: 16, justifyContent: 'center', flex: 1 }}>
              {' '}
              {'Professor(a) '}{userStore.nomeCompleto}{'\n'}
              {'\n'}{' '}
            </Text>

            <List>{this.pesquisa.map(this.renderItems)}</List>
          </ScreenShell>
        );
    }
}
