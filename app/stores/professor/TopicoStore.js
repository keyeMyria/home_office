// @flow
import { observable, computed } from 'mobx';
import type { ObservableMap } from 'mobx';

import logger from './../../lib/logger';

import { TopicoService } from '../../services';
import { Topico } from '../../models';

type topicosUnflattenType = [
    {
        topico: Topico,
        subtopicos: Array<Topico>,
    },
];

class TopicoStore {
    service: TopicoService;
    @observable topicosMap: ObservableMap<Topico> = observable.map({});

    constructor() {
        this.service = new TopicoService();
    }

    @computed
    get topicoSelecionados(): Array<Topico> {
        return this.topicosMap.values().filter(t => t._selected);
    }

    async fetchTopicos(disciplina: number, ano: number) {
        try {
            const response = await new TopicoService().findByDisciplinaAndAno(disciplina, ano);
            const topicos = Topico.fromArray(response.topicos).map(t => [t.pk, t]);
            this.topicosMap.replace(topicos);
        } catch (error) {
            logger.error(error);
            logger.warn('error.response', error.response);
        }
    }

    @computed
    get topicosUnflatten(): topicosUnflattenType {
        const topicos: Array<Topico> = this.topicosMap.values();
        // $FlowFixMe
        return topicos
            .map((topico, index, array) => {
                if (topico.parent === null) {
                    return {
                        topico,
                        subtopicos: array.filter(
                            item => item.parent && item.parent.pk === topico.pk,
                        ),
                    };
                }
                return undefined;
            })
            .filter(t => !!t);
    }
}

const topicoStore = new TopicoStore();

export default topicoStore;
