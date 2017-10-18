// @flow
import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import { Card, CardItem, Body, Button, Text, Right } from 'native-base';

import { Ocorrencia } from './../models';

export default class OcorrenciaCard extends Component {
    state = {
        showButtons: false,
    };

    props: {
        ocorrencia: Ocorrencia,
        onDelete: Ocorrencia => void,
        onEdit: Ocorrencia => void,
    };

    onEdit = () => {
        const { ocorrencia, onEdit } = this.props;
        onEdit(ocorrencia);
    };

    onDelete = () => {
        const { ocorrencia, onDelete } = this.props;
        onDelete(ocorrencia);
    };

    renderDate() {
        const formatOptions = {
            lastDay: '[Ontem]',
            sameDay: '[Hoje]',
            lastWeek: '[Ultima] dddd',
            nextWeek: '[Proxima] dddd',
            sameElse: 'L',
        };

        return (
          <Text note style={{ position: 'absolute', top: 0, right: 0, fontSize: 11 }}>
            {this.props.ocorrencia.data.calendar(null, formatOptions)}
          </Text>
        );
    }

    onCardPress= () => {
        this.setState({ showButtons: !this.state.showButtons });
        LayoutAnimation.easeInEaseOut();
    }

    render() {
        const { ocorrencia } = this.props;

        return (
          <Card style={{ flex: 0 }}>
            <CardItem onPress={this.onCardPress} button>
              <Body>
                {this.renderDate()}
                <Text style={{ marginTop: 15, fontWeight: 'bold' }}>{ocorrencia.tipoName}</Text>
                <Text note numberOfLines={3}>{ocorrencia.detalhes}</Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Alunos:</Text>
                <Text note>{ocorrencia.alunos.map(a => a.nomeCompleto).join(', ')}</Text>
              </Body>
            </CardItem>
            {this.state.showButtons && (
            <CardItem>
              <Right style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button small bordered style={{ marginRight: 10 }} onPress={this.onEdit}>
                  <Text>Editar</Text>
                </Button>
                <Button small bordered onPress={this.onDelete}>
                  <Text>Excluir</Text>
                </Button>
              </Right>
            </CardItem>
                )}
          </Card>
        );
    }
}
