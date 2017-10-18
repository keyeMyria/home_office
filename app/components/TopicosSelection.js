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
    ({
        topico,
        isChild = false,
        isOpen = false,
        subTopicos = [],
        onPress,
        hasChild,
    }: TopicoItemProps) => {
        const subtopicosSelected = subTopicos.filter(t => t._selected);
        const allSelected =
            subTopicos.length > 0 && subtopicosSelected.length === subTopicos.length;
        const someSelected = !allSelected && !!subtopicosSelected.length;

        const onSelect = () => {
            // eslint-disable-next-line no-param-reassign, no-return-assign
            topico._selected = !topico._selected;

            subTopicos.forEach((subTopico) => {
                // eslint-disable-next-line no-param-reassign, no-return-assign
                subTopico._selected = topico._selected;
            });
        };

        const style = {
            height: 'auto',
            flexDirection: 'row',
            marginLeft: isChild ? 15 : 0,
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderBottomColor: '#ddd',
            borderBottomWidth: 0.5,
            padding: 10,
        };

        let iconName = isChild ? 'subdirectory-arrow-right' : 'chevron-right';

        if (hasChild && !isOpen) {
            iconName = 'expand-more';
        } else if (hasChild && isOpen) {
            iconName = 'expand-less';
        }

        // $FlowFixMe
        const listPress = isChild || !onPress ? onSelect : () => onPress(topico.pk);

        let selected = topico._selected;
        let checkBoxStyle = {};
        if (someSelected || allSelected) {
            selected = true;
        }
        if (someSelected && !allSelected) {
            checkBoxStyle = {
                backgroundColor: 'rgba(0,0,0,.57)',
                borderColor: 'transparent',
            };
        }

        return (
          <ListItem onPress={listPress} style={style} icon>
            <Icon
              name={iconName}
              style={{
                  fontSize: isChild ? 18 : 30,
                  color: 'rgba(0,0,0,.57)',
              }}
            />
            <Text
              style={{
                  flex: 1,
                  paddingLeft: isChild ? 20 : 10,
                  paddingRight: 10,
                  fontSize: 14,
              }}
            >
              {topico.titulo}
            </Text>
            <CheckBox checked={selected} onPress={onSelect} style={checkBoxStyle} />
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
        topicos.sort((a, b) => a.topico.id - b.topico.id);

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
                      subTopicos={subtopicos}
                    />
                    {this.renderSubTopics(subtopicos)}
                  </View>
                );
            }

            return (
              <TopicoItem
                key={topico.pk}
                onPress={this.toogleOpenTopic}
                topico={topico}
                hasChild={!isEmpty}
                subTopicos={subtopicos}
              />
            );
        };

        return topicos.map(mapFunc);
    }

    render() {
        return <List>{this.renderTopicsSelection()}</List>;
    }
}
