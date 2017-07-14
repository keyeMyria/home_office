// @flow
import { observable } from 'mobx';

import BaseCollection from './BaseCollection';
import Exercise from '../models/Exercise';
import type { ExercicioRawData } from '../models/Exercise';

// MOCK
const exercisesJson = require('../../mock/exercises.json');

export default class ExercisesColletion extends BaseCollection {
    $mapName = 'exercises';
    exercises: Map<string, Exercise> = observable.map({});

    constructor($rootStore: any) {
        super($rootStore);
        this.fetchData();
    }

    fetchData() {
        const exercises: Array<ExercicioRawData> = exercisesJson;
        console.warn(exercisesJson);
        const exercisesMap: { [string]: ExercicioRawData } = exercises.reduce(
            (p, c) => Object.assign(p, { [String(c.id)]: new Exercise(c, this.$rootStore) }),
            {},
        );
        // $FlowFixMe
        this.exercises.merge(exercisesMap);
    }
}
