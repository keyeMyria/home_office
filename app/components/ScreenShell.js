/* @flow */
import React, { Component } from 'react';
import { TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';
import { Container, Header, Left, Right, Icon, Title, Content, Body, Text } from 'native-base';

const emptyFunc = () => {};

/**
 * Render a plataform especific Touchable Area
 */
const Touchable = (props) => {
    const { onPress } = props;

    if (Platform.OS === 'android') {
        return (
          <TouchableNativeFeedback onPress={onPress}>
            {props.children}
          </TouchableNativeFeedback>
        );
    }
    return (
      <TouchableOpacity onPress={onPress}>
        {props.children}
      </TouchableOpacity>
    );
};

/**
 * Render the `Outter Shell` for a screen
 * Props
 * - navigate: `PropTypes.func.isRequired`
 * - title: `PropTypes.string.isRequired`
 * - rightText?: `PropTypes.string`
 * - rightPress?: `PropTypes.func`
 * - showRight?: `PropTypes.bool`
 *
 * @example
 * ```javascript
 *  class ExampleScreen extends Component{
 *      render(){
 *          return (
 *            <ScreenShell title="Example" navigate={this.props.navigation.navigate}>
 *              <Text> Your content goes here </Text>
 *            </ScreenShell>
 *          );
 *      }
 *  }
 *
 * ```
 *
 */
export default class ScreenShell extends Component {
    static propTypes = {
        navigate: React.PropTypes.func.isRequired,
        title: React.PropTypes.string.isRequired,
        padder: React.PropTypes.bool.isRequired,
        rightText: React.PropTypes.string,
        rightPress: React.PropTypes.func,
        showRight: React.PropTypes.bool,
    };

    static defaultProps = {
        padder: true,
    };

    /**
     * Render's the right portion of the StatusBar
     *
     * only renders the
     */
    renderRight() {
        const { rightText, rightPress, showRight } = this.props;
        if (!showRight || !rightText) return <Right />;

        const onPress = rightPress || emptyFunc;

        return (
          <Right>
            <Touchable onPress={onPress}>
              <Text>
                {rightText}
              </Text>
            </Touchable>
          </Right>
        );
    }

    render() {
        const { navigate, title, padder } = this.props;
        return (
          <Container>
            <Header appHeader>
              <Left>
                <Touchable onPress={() => navigate('DrawerOpen')}>
                  <Icon name="menu" />
                </Touchable>
              </Left>
              <Body>
                <Title>
                  {title}
                </Title>
              </Body>
              {this.renderRight()}
            </Header>
            <Content padder={padder}>
              {this.props.children}
            </Content>
          </Container>
        );
    }
}
