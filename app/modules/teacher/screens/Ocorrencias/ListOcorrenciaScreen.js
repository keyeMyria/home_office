// @flow
import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Container } from 'native-base';
import { observer } from 'mobx-react/native';
import ActionButton from 'react-native-action-button';

import { Ocorrencia } from './../../../../models';

import logger from './../../../../lib/logger';
import dialog from './../../../../lib/dialog';

import Header from './../../../../components/Header';
import OcorrenciaCard from './../../../../components/OcorrenciaCard';

@observer
export default class OcorrenciaScreen extends Component {
    state = {
        ocorrencias: [],
        loading: true,
        reloading: false,
    };

    fetchOcorrencias(reload: boolean = false) {
        Ocorrencia.all()
            .then((ocorrencias) => {
                this.setState({ ocorrencias, loading: false, reloading: false });
            })
            .catch((err) => {
                logger.error(err);
                this.setState({ loading: false, reloading: false });
            });
        if (reload) {
            this.setState({ reloading: true });
        }
    }

    componentWillMount() {
        this.fetchOcorrencias();
    }

    onReload = () => {
        this.fetchOcorrencias(true);
    };

    onEdit = (ocorrencia: Ocorrencia) => {
        this.props.navigation.navigate('EditarOcorrenciasScreen', { ocorrencia });
    };

    onRepeat = (ocorrencia: Ocorrencia) => {
        this.props.navigation.navigate('RepetirOcorrenciasScreen', { ocorrencia });
    };

    onDelete = async (ocorrencia: Ocorrencia) => {
        const confirm = await dialog.confirm(
            'Tem certeza?',
            'Tem certeza que deseja excluir essa ocorrência?',
            'Sim',
            'Não',
        );
        if (!confirm) return;

        ocorrencia
            .delete()
            .then((obj) => {
                this.setState({ ocorrencias: this.state.ocorrencias.filter(o => o !== obj) });
            })
            .catch(err => console.error(err));
    };

    leftPress = () => {
        this.props.navigation.navigate('DrawerOpen');
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
          <Container>
            <Header
              title="Ocorrências"
              leftIcon="menu"
              leftPress={this.leftPress}
              rightIcon="refresh"
              rightPress={this.onReload}
            />
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.reloading}
                  onRefresh={this.onReload}
                />
                    }
            >
              {this.state.ocorrencias.map(o => (
                <OcorrenciaCard
                  onDelete={this.onDelete}
                  onEdit={this.onEdit}
                  onRepeat={this.onRepeat}
                  key={o.pk}
                  ocorrencia={o}
                />
                    ))}
              <View style={{ marginBottom: 25 }} />
            </ScrollView>
            <Fab navigate={navigate} />
          </Container>
        );
    }
}

function Fab({ navigate }) {
    return (
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={() => {
            navigate('NovaOcorrenciasScreen');
        }}
      />
    );
}
