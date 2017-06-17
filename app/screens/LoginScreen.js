import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Form, Item, Input, Button, Text, Thumbnail, Title, ActionSheet } from 'native-base';

// import { observer } from 'mobx-react/native';
// import store from '../../../store';

const LOGIN_OPTIONS = [
  'Pai ou Responsável',
  'Professor',
  'Aluno',
  'Coordenador',
  'Cancelar',
];

// @observer
export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    // this.props.navigation.navigate('TeacherHomeRouter');
  }

  handleSubmit = () => {
    this.actionSheet._root.showActionSheet(
      {
        options: LOGIN_OPTIONS,
        cancelButtonIndex: LOGIN_OPTIONS.length - 1,
        title: 'Entrar como...'
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            this.props.navigation.navigate('ParentHomeRouter');
            break;
          case 1:
            this.props.navigation.navigate('TeacherHomeRouter');
            break;
        }
      }
    );
  };

  render() {

    return (
      <Image source={require('../img/login.jpg')} style={styles.loginBackgroundImage}>
        <View style={styles.loginView}>
          <Thumbnail source={require('../img/icon.png')} style={styles.loginImage} />
          <Title style={styles.loginTitle}>EducareBox</Title>
          <Form style={styles.loginForm}>
            <Item rounded style={styles.loginInput}>
              <Input placeholder='Email' />
            </Item>
            <Item rounded style={styles.loginInput}>
              <Input placeholder='Senha' secureTextEntry={true} />
            </Item>
          </Form>
          <Button rounded block onPress={this.handleSubmit}>
            <Text>Entrar</Text>
          </Button>
        </View>
        <ActionSheet ref={(c) => { this.actionSheet = c; }} />
      </Image>
    );
  }
}

const styles = {
  loginBackgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    width: null,
    height: null,
    backgroundColor: 'transparent'
  },
  loginView: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  loginForm: {
    marginTop: 20,
    marginBottom: 20,
  },
  loginInput: {
    backgroundColor: '#FFFFFF',
    marginTop: 2
  },
  loginImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  loginTitle: {
    fontSize: 25,
    color: '#000000',
  }
};