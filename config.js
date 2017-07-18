export default {
    ASYNC_STORE: { // Define the keys used to save data to the AsyncStore
        TOKEN: '@educare:auth:token',
        USER: '@educare:auth:current_user',
    },
    LOGIN: {
        // BG_IMG: require('./app/img/bg.jpg'), // eslint-disable-line global-require
        // ICON_IMG: require('./app/img/logo.png'), // eslint-disable-line global-require
    },
    API: {
        DOMAIN: 'http://escola.educarebox.com/',
        get BASE_URL() {
            return `${this.DOMAIN}api/`;
        },
        get AUTH_URL() {
            return `${this.DOMAIN}auth/`;
        },
    },
    AGENDA: {
        tipoColorMap: {
            TRABALHO: '#808080',
            PROVA: '#E57373',
            EXERCICIO: '#64B5F6',
            LISTA_ONLINE: '#FFF176',
        },
        tipoAbbrMap: {
            TRABALHO: 'T',
            PROVA: 'P',
            EXERCICIO: 'E',
            LISTA_ONLINE: 'L',
        },
        tipoNameMap: {
            TRABALHO: 'Trabalho',
            PROVA: 'Prova',
            EXERCICIO: 'Exercício',
            LISTA_ONLINE: 'Lista Online',
        },
    },
};
