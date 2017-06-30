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
// import store from '../../../store';

import QuestionCard from '../../../components/QuestionCard';

@observer
export default class ExerciseAnswerScreen extends Component {

    renderQuestoes(item, index) {
        return (<QuestionCard key={index} index={index} item={item} />);
    }

    render() {
        const { state: { item, visible }, onClose } = this.props;

        return (
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={visible}
            onRequestClose={onClose}
          >
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
                 {/*<Right>
                  <TouchableWithoutFeedback onPress={this.save}>
                    <Text>OK</Text>
                  </TouchableWithoutFeedback>
                </Right>*/}
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
