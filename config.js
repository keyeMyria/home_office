// @flow
export default {
    ASYNC_STORE: {
        // Define the keys used to save data to the AsyncStore
        TOKEN: '@educare:auth:token',
        USER: '@educare:auth:current_user',
        PUSH_TOKEN: '@educare:push:token',
        PUSH_ENDPOINT: '@educare:push:endpoint',
        ESCOLA_ENDPOINT: '@educare:escola:endpoint',
        ESCOLA_CONFIG: '@educare:escola:config',
        ESCOLA_NOME: '@educare:escola:nome',
    },
    PUSH: {
        REGION: 'us-east-1',
        IDENTITY_POOL_ID: 'us-east-1:4ee00cb4-9d9b-49e3-b9d1-eabbd931d533',
        APPLICATION_ARN: {
            get ios() {
                if (__DEV__) {
                    return 'arn:aws:sns:us-east-1:234924483865:app/APNS_SANDBOX/Educarebox-ios-dev';
                }
                return 'arn:aws:sns:us-east-1:234924483865:app/APNS/Educarebox-ios';
            },
            android: 'arn:aws:sns:us-east-1:234924483865:app/GCM/Educarebox-gcm',
        },
        SENDER_ID: '447786875542',
    },
    CODE_PUSH: {
        isDev: false,
        IOS: {
            DEV: 'fcBnEn6lTDi0x_vcCd8wc9ESOdDn5d3fb5cc-f2fc-4c4f-8353-0a5e5213f3e3',
            PROD: 'PJxXYvB0EUGhAOr6xAmcybgpsUxX5d3fb5cc-f2fc-4c4f-8353-0a5e5213f3e3',
        },
        ANDROID: {
            DEV: 'g2Lk-5jTM7g6_zvqOE9ERvSpO7cJ5d3fb5cc-f2fc-4c4f-8353-0a5e5213f3e3',
            PROD: 'E4Uk9azyqXw3CtXwJAWh0JerD_Is5d3fb5cc-f2fc-4c4f-8353-0a5e5213f3e3',
        },
        get iosKey() {
            if (this.isDev || __DEV__) return this.IOS.DEV;
            return this.IOS.PROD;
        },
        get androidKey() {
            if (this.isDev || __DEV__) return this.ANDROID.DEV;
            return this.ANDROID.PROD;
        },
    },
    LOGIN: {},
    API: {
        DOMAIN: 'https://escola.educarebox.com/',
        ESCOLAS_URL: 'https://api.educarebox.com/api/escolas',
        get BASE_URL() {
            return `${this.DOMAIN}api/`;
        },
        get AUTH_URL() {
            return `${this.DOMAIN}auth/`;
        },
    },
    AGENDA: {
        groupByDay: true,
        tipoColorMap: {
            TRABALHO: '#74D108',
            PROVA: 'rgb(231,76,60)',
            EXERCICIO: '#673AB7',
            LISTA_ONLINE: '#FFF176',
        },
        tipoTextColorMap: {
            TRABALHO: 'rgba(0, 0, 0, 0.75)',
            PROVA: 'rgba(255, 255, 255, .95)',
            EXERCICIO: 'rgba(255, 255, 255, .95)',
            LISTA_ONLINE: 'rgba(255, 255, 255, .95)',
        },
        tipoAbbrMap: {
            TRABALHO: 'T',
            PROVA: 'P',
            EXERCICIO: 'D',
            LISTA_ONLINE: 'L',
        },
        tipoNameMap: {
            TRABALHO: 'Trabalho',
            PROVA: 'Prova',
            EXERCICIO: 'Dever',
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
    OCORRENCIAS: {
        tipoNameMap: {
            ATIVIDADE_AULA: 'Não participou das atividades em aula corretamente',
            AGRESSAO_FISICA: 'Agressão física à colega(s)',
            AGRESSAO_VERBAL: 'Agressão verbal à colega(s)',
            INDISCIPLINA: 'Indisciplina em sala de aula',
            CONVERSA: 'Conversa excessiva em sala de aula',
            FALTA_MATERIAL: 'Falta de material necessário para aula',
            CELULAR: 'Uso do celular na sala de aula',
            DESRESPEITO: 'Desrespeito a funcionário(s) do colégio',
            UNIFORME: 'Uso inadequado do uniforme',
            CORTE_CABELO: 'Corte de cabelo inadequado',
            OUTROS: 'Outros motivos.',
        },
    },
};
