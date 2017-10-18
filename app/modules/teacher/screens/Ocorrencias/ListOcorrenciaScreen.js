// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react/native';
import ActionButton from 'react-native-action-button';

import { Ocorrencia } from './../../../../models';

import logger from './../../../../lib/logger';
import dialog from './../../../../lib/dialog';

import ScreenShell from './../../../../components/ScreenShell';
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

    get screenShellProps(): any {
        const { navigate } = this.props.navigation;
        return {
            navigate,
            title: 'Ocorrências',
            loading: this.state.loading,
            padder: false,
            refreshControl: {
                refreshing: this.state.reloading,
                onRefresh: this.onReload,
            },
            fab: Fab,
        };
    }

    render() {
        return (
          <ScreenShell {...this.screenShellProps}>
            {this.state.ocorrencias.map(o => (
              <OcorrenciaCard
                onDelete={this.onDelete}
                onEdit={this.onEdit}
                key={o.pk}
                ocorrencia={o}
              />
                ))}
            <View style={{ marginBottom: 25 }} />
          </ScreenShell>
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
