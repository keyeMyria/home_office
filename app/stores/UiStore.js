// @flow
import { observable, computed } from 'mobx';
import { Dimensions, Keyboard, NetInfo } from 'react-native';
import EventEmitter from 'react-native-eventemitter';

import BaseStore from './../lib/BaseStore';

import logger from './../lib/logger';

type DimensionsChangeHandler = {
    window: { height: number, width: number },
    screen: { height: number, width: number },
};

class UiStore extends BaseStore {
    @observable screenWidth: number;
    @observable screenHeight: number;
    @observable windowWidth: number;
    @observable windowHeight: number;
    @observable hasInternet: boolean;
    @observable keyboardIsVisible: boolean;
    @observable userStoreFinishInit: boolean = false;
    @observable escolaStoreFinishInit: boolean = false;
    @observable codePushUpToDate: boolean = false;
    @observable codePushStatus: string = '';
    @observable codePushDownloadPercent: number = 0;

    @computed
    get appFinishInit(): boolean {
        return this.userStoreFinishInit && this.escolaStoreFinishInit;
    }

    constructor() {
        super();
        this._setupDimensionsEvents();
        this._setupInternetEvents();
        this._setupKeyboardEvents();

        EventEmitter.on('auth.user_loaded', () => {
            this.userStoreFinishInit = true;
        });
    }

    _setupDimensionsEvents() {
        const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
        const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;
        this.windowHeight = windowHeight;
        this.windowWidth = windowWidth;

        Dimensions.addEventListener('change', (dim: DimensionsChangeHandler) => {
            this.screenHeight = dim.screen.height;
            this.screenWidth = dim.screen.width;
            this.windowHeight = dim.window.height;
            this.windowWidth = dim.window.width;
        });
    }

    _setupKeyboardEvents() {
        this.keyboardIsVisible = false;

        Keyboard.addListener('keyboardDidShow', () => {
            this.keyboardIsVisible = true;
        });
        Keyboard.addListener('keyboardDidHide', () => {
            this.keyboardIsVisible = false;
        });
    }

    async _setupInternetEvents() {
        try {
            const isConnected = await NetInfo.isConnected.fetch();
            this.hasInternet = isConnected;
            NetInfo.isConnected.addEventListener('change', (isConected) => {
                this.hasInternet = isConected;
            });
        } catch (error) {
            logger.error('UiStore._setupInternetEvents', error);
        }
    }
}

const uiStore = new UiStore();

export default uiStore;
