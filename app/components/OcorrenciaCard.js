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
        onRepeat: Ocorrencia => void,
    };

    onEdit = () => {
        const { ocorrencia, onEdit } = this.props;
        onEdit(ocorrencia);
    };

    onDelete = () => {
        const { ocorrencia, onDelete } = this.props;
        onDelete(ocorrencia);
    };

    onRepeat = () => {
        const { ocorrencia, onRepeat } = this.props;
        onRepeat(ocorrencia);
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

    onCardPress = () => {
        this.setState({ showButtons: !this.state.showButtons });
        LayoutAnimation.easeInEaseOut();
    };

    render() {
        const { ocorrencia } = this.props;
        const alunos = ocorrencia.alunos && ocorrencia.alunos.map
            ? ocorrencia.alunos.map(a => a.nomeCompleto).join(', ')
            : '';

        return (
          <Card style={{ flex: 0 }}>
            <CardItem onPress={this.onCardPress} button>
              <Body>
                {this.renderDate()}
                <Text style={{ marginTop: 25, fontWeight: 'bold' }}>
                  {ocorrencia.tipoName}
                </Text>
                <Text note numberOfLines={3}>
                  {ocorrencia.detalhes}
                </Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Alunos envolvidos:</Text>
                <Text note>{alunos}</Text>
              </Body>
            </CardItem>
            {this.state.showButtons && (
            <CardItem>
              <Right style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button small bordered style={{ marginRight: 10 }} onPress={this.onEdit} >
                  <Text>Editar</Text>
                </Button>

                <Button small bordered onPress={this.onDelete}>
                  <Text>Excluir</Text>
                </Button>

                <Button small bordered style={{ marginLeft: 10 }} onPress={this.onRepeat}>
                  <Text> Repetir </Text>
                </Button>
              </Right>
            </CardItem>
                )}
          </Card>
        );
    }
}
