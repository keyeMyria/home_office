// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, Body, Right, CheckBox, Text, Left, Icon, List } from 'native-base';

import { observer } from 'mobx-react/native';
import { observable } from 'mobx';

import { Topico } from './../models';

type TopicoItemProps = {
    topico: Topico,
    isChild?: boolean, // eslint-disable-line react/require-default-props
    isOpen?: boolean, // eslint-disable-line react/require-default-props
    onPress?: (id: number) => void, // eslint-disable-line react/require-default-props
};

const TopicoItem = observer(
    ({ topico, isChild = false, isOpen = false, onPress }: TopicoItemProps) => {
        // eslint-disable-next-line no-param-reassign, no-return-assign
        const onSelect = () => (topico._selected = !topico._selected);

        const style = isChild ? { marginLeft: 60 } : {};
        const iconName = isOpen ? 'keyboard-arrow-down' : 'keyboard-arrow-right';
        // $FlowFixMe
        const listPress = isChild || !onPress ? onSelect : () => onPress(topico.pk);

        return (
          <ListItem onPress={listPress} icon style={style}>
            {!isChild &&
            <Left>
              <Icon name={iconName} />
            </Left>}
            <Body>
              <Text>
                {topico.titulo}
              </Text>
            </Body>
            <Right>
              <CheckBox
                checked={topico._selected}
                style={{ marginRight: 20 }}
                onPress={onSelect}
              />
            </Right>
          </ListItem>
        );
    },
);

@observer
export default class TopicosSelection extends Component {
    props: {
        topicos: [
            {
                topico: Topico,
                subtopicos: Array<Topico>,
            },
        ],
    };

    @observable openTopics: Array<number> = [];

    toogleOpenTopic = (id: number) => {
        const index = this.openTopics.indexOf(id);
        // eslint-disable-next-line no-bitwise
        if (~index) {
            this.openTopics.splice(index, 1);
        } else {
            this.openTopics.push(id);
        }
    };

    renderSubTopics(subtopicos: Array<Topico>) {
        return subtopicos.map(topico => <TopicoItem key={topico.pk} topico={topico} isChild />);
    }

    renderTopicsSelection() {
        const topicos = this.props.topicos;
        const mapFunc = ({ topico, subtopicos }) => {
            const isOpen = this.openTopics.includes(topico.pk);
            const isEmpty = !subtopicos.length;

            if (isEmpty) {
                return <TopicoItem key={topico.pk} topico={topico} />;
            }

            if (isOpen) {
                return (
                  <View key={topico.pk}>
                    <TopicoItem topico={topico} onPress={this.toogleOpenTopic} />
                    {this.renderSubTopics(subtopicos)}
                  </View>
                );
            }
            return <TopicoItem key={topico.pk} onPress={this.toogleOpenTopic} topico={topico} />;
        };

        return topicos.map(mapFunc);
    }

    render() {
        return (
          <List>
            {this.renderTopicsSelection()}
          </List>
        );
    }
}
