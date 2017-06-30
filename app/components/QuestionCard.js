// @flow
import React, { Component } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Text, Card, CardItem, Body, Icon, H3 } from 'native-base';
import { action } from 'mobx';
import { observer } from 'mobx-react/native';

import type Question from '../store/models/Question';

@observer
export default class QuestionCard extends Component {

    renderAnswer(resposta: string, index: number, arr: Array<string>) {
        const isChecked = index === this.props.item.respostaMarcada;
        const iconName = isChecked ? 'radio-button-checked' : 'radio-button-unchecked';
        const isFirst = resposta === arr[0];
        const border = isFirst ? 0 : 1;
        const onPress = () => this.props.item.marcarResposta(index);
        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{ borderTopWidth: border, borderColor: '#eaeaea', paddingHorizontal: 15 }}
          >
            <View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
              <View style={{ width: 40 }}>
                <Icon name={iconName} />
              </View>
              <Text style={{ flex: 1 }}>
                {resposta}
              </Text>
            </View>
          </TouchableOpacity>
        );
    }

    render() {
        const item: Question = this.props.item;
        const numero = String(this.props.index + 1);

        return (
          <Card style={{ marginBottom: 15 }}>
            <CardItem style={{ backgroundColor: '#fff' }}>
              <Body>
                <H3 style={{ marginVertical: 15 }}>Questão {numero})</H3>
                {!item.texto && !item.enunciado &&
                <Text>
                  {item.allText}
                </Text>}
                {!!item.texto &&
                <Text style={{ marginTop: 15 }}>
                  {item.texto}
                </Text>}
                {!!item.enunciado &&
                <Text style={{ fontWeight: 'bold', marginTop: 15 }}>
                  {item.enunciado}
                </Text>}
                {!!item.imagem &&
                <Image style={{width: 300, alignSelf:'stretch', height: 200, resizeMode: 'contain', marginTop: 20}} source={{ uri: item.imagem }} />
                }
              </Body>
            </CardItem>
            <View style={{ backgroundColor: '#f2f2f2' }}>
              <H3 style={{ margin: 15 }}>Resposta:</H3>
              {item.respostas.map(this.renderAnswer, this)}
            </View>
          </Card>
        );
    }
}
