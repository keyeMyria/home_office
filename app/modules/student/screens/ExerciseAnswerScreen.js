// @flow
import React, { Component } from 'react';
import { TouchableWithoutFeedback, Modal } from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Left,
    Icon,
    Body,
    Text,
    Footer,
    Col,
    Button,
} from 'native-base';

import { observer } from 'mobx-react/native';

import QuestionCard from '../../../components/QuestionCard';

@observer
export default class ExerciseAnswerScreen extends Component {
    props: {
        state: {
            item: Object,
            visible: boolean,
        },
        onClose: void => void,
    };

    renderQuestoes(item: Object, index: number) {
        return <QuestionCard key={item.id} index={index} item={item} />;
    }

    render() {
        const { state: { item, visible }, onClose } = this.props;
        const modalOptions = {
            animationType: 'slide',
            transparent: false,
            visible,
            onRequestClose: onClose,
        };
        return (
          <Modal {...modalOptions}>
            <Container>
              <Header appHeader>
                <Left>
                  <TouchableWithoutFeedback onPress={onClose}>
                    <Icon name="arrow-back" />
                  </TouchableWithoutFeedback>
                </Left>
                <Body>
                  <Title>
                    {item.title}
                  </Title>
                </Body>
              </Header>
              <Content padder>
                {!!item.questoes && item.questoes.map(this.renderQuestoes, this)}
              </Content>
              <Footer style={{ marginBottom: -10 }}>
                <Col>
                  <Button full info onPress={onClose}>
                    <Text>Salvar & Fechar</Text>
                  </Button>
                </Col>
                <Col>
                  <Button full success onPress={onClose}>
                    <Text>Concluir</Text>
                  </Button>
                </Col>
              </Footer>
            </Container>
          </Modal>
        );
    }
}
