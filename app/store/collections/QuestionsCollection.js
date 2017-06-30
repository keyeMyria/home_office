// @flow
import { observable } from 'mobx';

import BaseCollection from './BaseCollection';
import Question from '../models/Question';
import type { QuestionRawData } from '../models/Question';

// MOCK
const questionsJson = require('../../mock/question.json');

export default class QuestionsColletion extends BaseCollection {
    $mapName = 'questions';
    questions: Map<string, Question> = observable.map({});;

    constructor($rootStore: any) {
        super($rootStore);
        this.fetchData();
    }

    fetchData() {
        const questions: Array<QuestionRawData> = questionsJson;
        const questionsMap: { [string]: QuestionRawData } = questions.reduce(
            (p, c) => Object.assign(p, { [String(c.id)]: new Question(c, this.$rootStore) }),
            {},
        );
        // $FlowFixMe
        this.questions.merge(questionsMap);
    }
}
