/* @flow */
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Header, Left, Right, Icon, Title, Content, Body, Text } from 'native-base';
import { observer } from 'mobx-react/native';
import LoadingModal from './LoadingModal';

const emptyFunc = () => {};

/**
 * Render a plataform especific Touchable Area
 */
const Touchable = (props) => {
    const { onPress, ...other } = props;
    return (
      <TouchableOpacity {...other} onPress={onPress}>
        {props.children}
      </TouchableOpacity>
    );
};

export type ScreenShellProps = {
    navigate: string => any,
    title: string,
    padder?: boolean,
    rightText?: string,
    rightIcon?: string,
    rightPress?: () => any,
    showRight?: boolean,
    loading?: boolean,
    children?: any,
    leftIcon?: string,
    leftPress?: () => any,
    fab?: *,
    fabProps?: *,
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
    props: ScreenShellProps;

    static defaultProps = {
        padder: true,
        loading: false,
        leftIcon: 'menu',
        leftPress: undefined,
        fab: null,
        fabProps: {},
        showRight: true,
        style: {
            flex: 1,
        },
    };

    /**
     * Render's the right portion of the StatusBar
     *
     * only renders the
     */
    renderRight() {
        const { rightText, rightPress, showRight, rightIcon } = this.props;
        if (!showRight || !(rightText || rightIcon)) return <Right />;

        const onPress = rightPress || emptyFunc;

        return (
          <Right>
            <Touchable onPress={onPress}>
              {!rightIcon ? <Text>{rightText}</Text> : <Icon name={rightIcon} />}
            </Touchable>
          </Right>
        );
    }

    render() {
        const { navigate, title, padder, leftIcon, leftPress, fab: Fab, fabProps } = this.props;
        const _leftPress = leftPress || (() => navigate('DrawerOpen'));
        const hitSlop = { top: 30, left: 30, bottom: 30, right: 30 };
        const wrappedPress = (...args) => requestAnimationFrame(() => _leftPress(...args));
        return (
          <Container>
            <Header appHeader>
              <Left>
                <Touchable hitSlop={hitSlop} onPress={wrappedPress}>
                  <Icon name={leftIcon} />
                </Touchable>
              </Left>
              <Body>
                <Title>{title}</Title>
              </Body>
              {this.renderRight()}
            </Header>
            <LoadingModal loading={this.props.loading}>
              <Content padder={padder}>{this.props.children}</Content>
            </LoadingModal>
            {Fab ? <Fab navigate={navigate} {...fabProps} /> : null}
          </Container>
        );
    }
}
