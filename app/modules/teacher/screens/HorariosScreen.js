// @flow
import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react/native';

import { Text, ListItem, List } from 'native-base';

import logger from './../../../lib/logger';

import { Aula } from './../../../models';

// import professorStore from '../../../stores/ProfessorStore';

import ScreenShell from '../../../components/ScreenShell';
import type { ScreenShellProps } from '../../../components/ScreenShell';

@observer
export default class HorariosScreen extends Component {
    @observable
    store = {
        aula: [],
    };

    @observable pesquisa: any;

    @observable aulas: Array<Aula>;

    constructor(props: *) {
        super(props);

        this.store.aula = ['Teste 1', 'Teste 2', 'Teste 3'];

        this.aulas = this.fetchAulas();

        logger.warn(this.aulas[1].disciplina);
    }

    async fetchAulas() {
        await Aula
            .findByProfessor(83)
            .then(aulas => Aula.fromArray(aulas))
            .catch(() => logger.warn('fetchAulas error'));
    }

    get screenShellProps(): ScreenShellProps {
        const { navigate } = this.props.navigation;
        return {
            navigate,
            title: 'Horários',
            // leftIcon: 'arrow-back',
            // leftPress: this.navigate.goBack(),
        };
    }

    renderTest(item: any) {
        return (
          <ListItem>
            <Text>{item}</Text>
          </ListItem>
        );
    }

    renderItems(item: any) {
        return (
          <ListItem>
            <Text>{item.disciplina}</Text>
          </ListItem>
        );
    }

    render() {
        return (
          <ScreenShell {...this.screenShellProps}>
            <Text>
              {' '}
                    Teste{'\n'}
              {'\n'}{' '}
            </Text>

            <List>{this.store.aula.map(this.renderTest)}</List>

          </ScreenShell>
        );
    }
}
