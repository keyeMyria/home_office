/* @flow */
import React, { Component } from 'react';
import { TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';
import { Container, Header, Left, Right, Icon, Title, Content, Body, Text } from 'native-base';
import { observer } from 'mobx-react/native';
import LoadingModal from './LoadingModal';

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
@observer
export default class ScreenShell extends Component {
    props: {
        navigate: string => any,
        title: string,
        padder?: boolean,
        rightText?: string,
        rightPress?: () => any,
        showRight?: boolean,
        loading: boolean,
        children?: any,
        leftIcon?: string,
        leftPress?: () => any,
    };

    static defaultProps = {
        padder: true,
        loading: false,
        leftIcon: 'menu',
        leftPress: undefined,
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
        const { navigate, title, padder, leftIcon, leftPress } = this.props;
        const _leftPress = leftPress || (() => navigate('DrawerOpen'));

        return (
          <Container>
            <Header appHeader>
              <Left>
                <Touchable onPress={_leftPress}>
                  <Icon name={leftIcon} />
                </Touchable>
              </Left>
              <Body>
                <Title>
                  {title}
                </Title>
              </Body>
              {this.renderRight()}
            </Header>
            <LoadingModal loading={this.props.loading}>
              <Content padder={padder}>
                {this.props.children}
              </Content>
            </LoadingModal>
          </Container>
        );
    }
}
