// @flow
export default {
    ASYNC_STORE: {
        // Define the keys used to save data to the AsyncStore
        TOKEN: '@educare:auth:token',
        USER: '@educare:auth:current_user',
        PUSH_TOKEN: '@educare:push:token',
        PUSH_ENDPOINT: '@educare:push:endpoint',
    },
    PUSH: {
        REGION: 'us-east-1',
        IDENTITY_POOL_ID: 'us-east-1:4ee00cb4-9d9b-49e3-b9d1-eabbd931d533',
        APPLICATION_ARN: 'arn:aws:sns:us-east-1:234924483865:app/GCM/Educarebox-gcm',
        SENDER_ID: '447786875542',
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
    AVISOS: {
        tipoIconMap: {
            COMUNICADO: 'note',
            FALTA: 'event-busy',
            ATRASO: 'assignment-late',
            OCORRENCIA: 'new-releases',
            NOTA: 'library-books',
            NAO_ENTREGA: 'mood-bad',
        },
    },
};
