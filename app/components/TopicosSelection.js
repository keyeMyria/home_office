// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, CheckBox, Text, Icon, List } from 'native-base';

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
    ({ topico, isChild = false, isOpen = false, onPress, hasChild }: TopicoItemProps) => {
        // eslint-disable-next-line no-param-reassign, no-return-assign
        const onSelect = () => (topico._selected = !topico._selected);

        const style = {
            height: 'auto',
            flexDirection: 'row',
            marginLeft: isChild ? 60 : 0,
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderBottomColor: '#ddd',
            borderBottomWidth: 0.5,
            padding: 10,
        };

        const iconName = isOpen ? 'keyboard-arrow-down' : 'keyboard-arrow-right';
        // $FlowFixMe
        const listPress = isChild || !onPress ? onSelect : () => onPress(topico.pk);

        return (
          <ListItem
            onPress={listPress}
            style={style}
            icon
          >
            {
                !isChild && hasChild ?
                  <Icon
                    name={iconName}
                  />
                : null
            }
            <Text style={{
                flex: 1,
                paddingLeft: isChild ? 0 : 20,
                paddingRight: 20,
            }}
            >
              {topico.titulo}
            </Text>
            <CheckBox
              checked={topico._selected}
              onPress={onSelect}
            />
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
                    <TopicoItem
                      topico={topico}
                      onPress={this.toogleOpenTopic}
                      isOpen={isOpen}
                      hasChild={!isEmpty}
                    />
                    {this.renderSubTopics(subtopicos)}
                  </View>
                );
            }

            return (<TopicoItem
              key={topico.pk}
              onPress={this.toogleOpenTopic}
              topico={topico}
              hasChild={!isEmpty}
            />
            );
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
