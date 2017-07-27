// @flow
import { observable, computed } from 'mobx';
import type { ObservableMap, IObservableArray } from 'mobx';
import { TopicoService } from '../../services';
import { Topico } from '../../models';

type topicosUnflattenType = [
    { id: number, name: string, subtopics: [{ id: number, name: string }] },
];

class TopicoStore {
    service: TopicoService;
    @observable topicosMap: ObservableMap<Topico> = observable.map({});
    @observable examTopics: IObservableArray<number> = observable([]);
    @observable loading: boolean = false;

    constructor() {
        this.service = new TopicoService();
    }

    async getTopicos(disciplina: number, ano: number) {
        try {
            this.loading = true;
            const response = await new TopicoService().findByDisciplinaAndAno(disciplina, ano);
            const topicos = response.topicos.map(t => [t.id, new Topico(t)]);
            this.topicosMap.replace(topicos);
            this.loading = false;
        } catch (error) {
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.error(error);
            }
            this.loading = false;
        }
    }

    checkExamTopic(topicId: number) {
        this.examTopics.remove(topicId);
    }

    uncheckExamTopic(topicId: number) {
        this.examTopics = this.examTopics.filter(id => id !== topicId);
    }

    @computed
    get topicosUnflatten(): topicosUnflattenType {
        const topicos = this.topicosMap.values();
        // $FlowFixMe
        return topicos
            .map((topico, index, array) => {
                if (topico.parent === null) {
                    return {
                        id: topico.id,
                        name: topico.titulo,
                        subtopicos: array
                            .filter(item => item.parent && item.parent.id === topico.id)
                            .map(t => ({ id: t.id, name: t.titulo })),
                    };
                }
                return undefined;
            })
            .filter(t => !!t);
    }
}

const topicoStore = new TopicoStore();

export default topicoStore;
