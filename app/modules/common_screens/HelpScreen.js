import React, { Component } from 'react';
import { Linking, View, Platform, AsyncStorage, Alert, Dimensions } from 'react-native';
import { Text, List, ListItem, Left, Body } from 'native-base';
import codePush from 'react-native-code-push';
import _ from 'lodash';

import CONFIG from './../../../config';
import ScreenShell from './../../components/ScreenShell';
import logger from './../../lib/logger';

// eslint-disable-next-line
import IconFA from 'react-native-vector-icons/FontAwesome';

const CONTATO_INFO = [
    {
        icon: 'envelope',
        display: 'contato@educare.digital',
        url: 'mailto:contato@educare.digital',
        helpText: 'Enviar e-mail',
    },
    {
        icon: 'phone',
        display: '0800-006-3050',
        url: 'tel:08000063050',
        helpText: 'Iniciar Chamada',
    },
    {
        icon: 'whatsapp',
        display: '+55 31 7574-2891',
        url: 'https://api.whatsapp.com/send?phone=553175742891',
        helpText: 'Abrir no WhatsApp',
    },
];

function humanFileSize(size) {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    // eslint-disable-next-line no-restricted-properties
    return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`;
}

const DEVICE_SIZE = `${Dimensions.get('window').width.toFixed(0)}x${Dimensions.get(
    'window',
).height.toFixed(0)} (dp)`;

export default class AnalysisScreen extends Component {
    clickCount = 0;
    state = {
        supportInfo: [
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

    componentWillUnmount() {
        clearInterval(this.intervalCancel);
    }

    codePushPress() {
        codePush.sync({
            updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE,
            deploymentKey: Platform.select({
                ios: CONFIG.CODE_PUSH.iosKey,
                android: CONFIG.CODE_PUSH.androidKey,
            }),
        });
    }

    codePushChangeDeploy() {
        codePush.sync({
            updateDialog: {
                title: 'Versão de Testes',
                optionalIgnoreButtonLabel: 'Cancelar',
                optionalInstallButtonLabel: 'Continuar',
                optionalUpdateMessage: 'Se continuar você ira mudar para a versão de testes',
            },
            installMode: codePush.InstallMode.IMMEDIATE,
            deploymentKey: Platform.select({
                ios: CONFIG.CODE_PUSH.IOS.DEV,
                android: CONFIG.CODE_PUSH.ANDROID.DEV,
            }),
        });
    }

    onVersionClick = () => {
        if (this.clickCount < 10) {
            this.clickCount = this.clickCount + 1;
            clearTimeout(this.intervalCancel);
            this.intervalCancel = setTimeout(() => {
                this.clickCount = 0;
            }, 1000);
            return;
        }
        Alert.alert('Tem Certeza?', 'Você ira mudar para a versão de testes', [
            { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
            {
                text: 'OK',
                onPress: () => {
                    this.codePushChangeDeploy();
                },
            },
        ]);
    };

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
        codePush.getUpdateMetadata(codePush.UpdateState.RUNNING).then((pack) => {
            if (!pack) return;
            const supportInfo = this.state.supportInfo.concat(
                ...[
                    { label: 'Versão APP', value: _.get(pack, 'appVersion') || 'N/A' },
                    { label: 'Versão CodePush', value: _.get(pack, 'label') || 'N/A' },
                    { label: 'Descrição', value: _.get(pack, 'description') || 'N/A' },
                    { label: 'Key Deploy', value: _.get(pack, 'deploymentKey') || 'N/A' },
                    { label: 'Hash do Pacote', value: _.get(pack, 'packageHash') || 'N/A' },
                    {
                        label: 'Tamanho do Pacote',
                        value: humanFileSize(_.get(pack, 'packageSize')) || 'N/A',
                    },
                ],
            );
            this.setState({ supportInfo });
        });
    }

    renderContactInfo(item, index) {
        return (
          <ListItem icon onPress={_.partial(this.openLink, item.url)} key={`contato-${index}`}>
            <Left>
              <IconFA name={item.icon} size={24} style={{ width: 24, textAlign: 'center' }} />
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
              <ListItem onPress={this.onVersionClick}>
                <Body>
                  <Text>{Platform.Version}</Text>
                  <Text note>
                    {Platform.select({
                        ios: 'Versão iOS',
                        android: 'Versão API Android',
                    })}
                  </Text>
                </Body>
              </ListItem>
              {this.state.supportInfo.map(this.renderSupportInfo, this)}
              <ListItem itemDivider>
                <Text>Utilitários</Text>
              </ListItem>
              <ListItem onPress={this.codePushPress} onLongPress={this.onLongPress}>
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
