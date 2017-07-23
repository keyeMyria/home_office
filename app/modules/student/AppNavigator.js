import React, { Component } from 'react';

import DrawerMenu from '../../components/DrawerMenu';

export default class AppNavigator extends Component {
    get items() {
        return [
            { title: 'Visão Geral', icon: 'home', route: 'HomeRouter' },
            // { title: 'Mensagens', icon: 'question-answer', route: 'MessageScreen' },
            { title: 'Enviar feedback', icon: 'announcement', route: 'FeedBackScreen' },
            { title: 'Ajuda', icon: 'help', route: 'HelpScreen' },
        ];
    }

    render() {
        const { navigation } = this.props;
        return <DrawerMenu navigation={navigation} items={this.items} />;
    }
}
