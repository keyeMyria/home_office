// @flow
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class EmptyScreen extends Component {
    props: {
        image: any,
        title: string,
        text: string,
    };

    render() {
        const { image, title, text } = this.props;

        return (
          <View style={styles.container}>
            <Image source={image} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
        padding: 56,
    },
    title: {
        fontSize: 18,
        color: 'rgba(0,0,0,0.87)',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        color: 'rgba(0,0,0,0.50)',
        textAlign: 'center',
    },
    image: {
        width: 128,
        height: 128,
        marginBottom: 35,
        tintColor: 'rgba(0,0,0,0.37)',
    },
});
