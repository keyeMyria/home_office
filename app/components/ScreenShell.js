/* @flow */
import React, { Component } from 'react';
import { TouchableOpacity, RefreshControl } from 'react-native';
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
    refreshControl?: any,
    fab?: *,
    fabProps?: *,
    emptyScreen?: *,
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
        emptyScreen: false,
    };

    /**
     * Render's the right portion of the StatusBar
     *
     * only renders the
     */
    renderRight() {
        const { rightText, rightPress, showRight, rightIcon } = this.props;
        const hitSlop = { top: 30, left: 30, bottom: 30, right: 30 };
        const onPress = rightPress || emptyFunc;

        if (!showRight || !(rightText || rightIcon)) return <Right />;

        return (
          <Right style={{
              flex: 0,
              paddingLeft: 20,
          }}
          >
            <Touchable
              onPress={onPress}
              hitSlop={hitSlop}
            >
              {!rightIcon ? <Text>{rightText}</Text> : <Icon name={rightIcon} />}
            </Touchable>
          </Right>
        );
    }

    render() {
        const {
            navigate,
            title,
            padder,
            leftIcon,
            leftPress,
            fab: Fab,
            fabProps,
            emptyScreen,
        } = this.props;
        const _leftPress = leftPress || (() => navigate('DrawerOpen'));
        const hitSlop = { top: 30, left: 30, bottom: 30, right: 30 };
        const wrappedPress = (...args) => requestAnimationFrame(() => _leftPress(...args));
        const refreshControl = this.props.refreshControl;
        const contentProps = refreshControl
            ? {
                refreshControl: (
                  <RefreshControl
                    refreshing={refreshControl.refreshing}
                    onRefresh={refreshControl.onRefresh}
                  />
                  ),
            }
            : {};
        const OutterContainer = emptyScreen ? Container : Content;
        const backGround = emptyScreen ? { style: { backgroundColor: 'rgb(239, 239, 239)' } } : {};
        return (
          <Container>
            <Header
              appHeader
            >
              <Left style={{
                  flex: 0,
                  paddingRight: 20,
              }}
              >
                <Touchable hitSlop={hitSlop} onPress={wrappedPress}>
                  <Icon name={leftIcon} />
                </Touchable>
              </Left>
              <Body style={{
                  flex: 1,
              }}
              >
                <Title>{title}</Title>
              </Body>
              {this.renderRight()}
            </Header>
            <LoadingModal loading={this.props.loading}>
              <OutterContainer padder={padder} {...contentProps} {...backGround}>
                {this.props.children}
              </OutterContainer>
            </LoadingModal>
            {Fab ? <Fab navigate={navigate} {...fabProps} /> : null}
          </Container>
        );
    }
}
