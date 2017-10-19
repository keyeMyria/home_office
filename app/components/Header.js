/* @flow */
import React, { PureComponent } from 'react';
import { TouchableOpacity, Platform, View } from 'react-native';
import { Header, Icon, Title, Text } from 'native-base';

const Touchable = Platform.select({
    ios: TouchableOpacity,
    android: TouchableOpacity,
});

const hitSlop = { top: 30, left: 30, bottom: 30, right: 30 };

export default class HeaderComponent extends PureComponent {
    props: {
        title: string,
        leftIcon: string,
        leftPress: () => void,
        rightText?: string,
        rightIcon?: string,
        rightPress?: () => void,
    };

    static defaultProps = {
        title: 'Title is not defined',
        leftIcon: 'menu',
        leftPress: () => {},
        rightText: '',
        rightIcon: '',
        rightPress: () => {},
    };

    renderRight() {
        const { rightText, rightPress, rightIcon } = this.props;
        const hasRight = !!(rightText || rightIcon);

        if (!hasRight) return <View style={styles.right} />;

        return (
          <View style={styles.right}>
            <Touchable onPress={rightPress} hitSlop={hitSlop}>
              {!rightIcon ? <Text>{rightText}</Text> : <Icon name={rightIcon} />}
            </Touchable>
          </View>
        );
    }

    render() {
        const { leftIcon, leftPress, title } = this.props;

        return (
          <Header appHeader style={{ paddingLeft: 0, paddingRight: 0 }}>
            <View style={styles.container}>
              <View style={styles.left}>
                <Touchable hitSlop={hitSlop} onPress={leftPress} style={styles.leftButton}>
                  <Icon name={leftIcon} style={styles.leftIcon} />
                </Touchable>
              </View>
              <View style={styles.body}>
                <Title style={styles.title}>{title}</Title>
              </View>
              {this.renderRight()}
            </View>
          </Header>
        );
    }
}

const styles = {
    container: {
        padding: 0,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    left: {
        flex: 0,
    },
    leftButton: {
        padding: 9,
    },
    leftIcon: {
        width: 30,
        height: 30,
        color: 'rgba(255, 255, 255, 1)',
    },
    body: {
        flex: 1,
    },
    title: {
        textAlign: 'left',
        paddingLeft: 8, // Platform.select({ ios: 22, android: 8 }),
    },
    right: {
        flex: 0,
    },
};
