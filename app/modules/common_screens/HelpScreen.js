import React, { Component } from 'react';
import { Linking, View, Platform, AsyncStorage, Alert, Dimensions } from 'react-native';
import { Text, List, ListItem, Left, Body, Icon } from 'native-base';
import codePush from 'react-native-code-push';
import _ from 'lodash';

import ScreenShell from './../../components/ScreenShell';
import logger from './../../lib/logger';

const CONTATO_INFO = [
    {
        icon: 'mail',
        display: 'contato@educare.digital',
        url: 'mailto:contato@educare.digital',
        helpText: 'Enviar e-mail',
    },
    {
        icon: 'phone',
        display: '0800-006-3050',
        url: 'tel:08000063050',
        helpText: 'Ligue para nosso 0800',
    },
    {
        icon: 'message',
        display: '+55 31 7574-2891',
        url: 'https://api.whatsapp.com/send?phone=553175742891',
        helpText: 'Entre em contato via whatsapp',
    },
];

const DEVICE_SIZE = `${Dimensions.get('window').width}x${Dimensions.get('window').height} (dp)`;

export default class AnalysisScreen extends Component {
    state = {
        supportInfo: [
            Platform.select({
                ios: { label: 'Versão iOS', value: Platform.Version },
                android: { label: 'Android API Version', value: Platform.Version },
            }),
            { label: 'Dimensões Dispositivo', value: DEVICE_SIZE },
        ],
    };

    openLink(url: string) {
        if (Linking.canOpenURL(url)) {
            Linking.openURL(url);
        } else {
            logger.warn(`Não é possível abrir a URL: "${url}"`);
        }
    }

    codePushPress() {
        codePush.sync({
            updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE,
        });
    }

    clearStorageAndRestart() {
        Alert.alert(
            'Tem Certeza?',
            'Isso vai apagar todos os dados salvos no aplicativo, incluindo seu login a senha',
            [
                { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
                {
                    text: 'OK',
                    onPress: () => {
                        AsyncStorage.clear().then(() => codePush.restartApp());
                    },
                },
            ],
        );
    }

    componentWillMount() {
        codePush.getUpdateMetadata(codePush.UpdateState.LATEST).then((pack) => {
            if (!pack) return;
            const supportInfo = this.state.supportInfo.concat(
                ...[
                    { label: 'Versão APP', value: _.get(pack, 'appVersion') || 'N/A' },
                    { label: 'Versão CodePush', value: _.get(pack, 'label') || 'N/A' },
                    { label: 'Descrição', value: _.get(pack, 'description') || 'N/A' },
                    { label: 'Key Deploy', value: _.get(pack, 'deploymentKey') || 'N/A' },
                    { label: 'Hash do Pacote', value: _.get(pack, 'packageHash') || 'N/A' },
                    { label: 'Tamanho do Pacote', value: _.get(pack, 'packageSize') || 'N/A' },
                ],
            );
            this.setState({ supportInfo });
        });
    }

    renderContactInfo(item, index) {
        return (
          <ListItem icon onPress={_.partial(this.openLink, item.url)} key={`contato-${index}`}>
            <Left>
              <Icon name={item.icon} />
            </Left>
            <Body>
              <Text>{item.display}</Text>
              <Text note>{item.helpText}</Text>
            </Body>
          </ListItem>
        );
    }

    renderSupportInfo(item, index) {
        const key = `support${index}`;
        return (
          <ListItem key={key}>
            <Body>
              <Text>{item.value}</Text>
              <Text note>{item.label}</Text>
            </Body>
          </ListItem>
        );
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
          <ScreenShell navigate={navigate} title="Ajuda" padder={false}>
            <List>
              <ListItem itemDivider>
                <Text>Entre em Contato</Text>
              </ListItem>
              {CONTATO_INFO.map(this.renderContactInfo, this)}
              <ListItem itemDivider>
                <Text>Informações de Suporte</Text>
              </ListItem>
              {this.state.supportInfo.map(this.renderSupportInfo, this)}
              <ListItem itemDivider>
                <Text>Utilitários</Text>
              </ListItem>
              <ListItem onPress={this.codePushPress}>
                <Text>Forçar Atualização</Text>
              </ListItem>
              <ListItem onPress={this.clearStorageAndRestart}>
                <Text>Limpar dados do APP</Text>
              </ListItem>
              <ListItem onPress={() => codePush.restartApp()}>
                <Text>Reiniciar o APP</Text>
              </ListItem>
            </List>
            <View style={{ marginBottom: 50 }} />
          </ScreenShell>
        );
    }
}
