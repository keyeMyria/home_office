// @flow
import React, { Component } from 'react';

import { observable, action } from 'mobx';
import { observer } from 'mobx-react/native';

// Store
import { rootStore } from '../../../store';

// Types
import type Exercise from '../../../store/models/Exercise';

//Components
import ScreenShell from '../../../components/ScreenShell';
import ExerciseCard from '../../../components/ExerciseCard';

import ExerciseAnswerScreen from './ExerciseAnswerScreen';

@observer
export default class ExerciseScreen extends Component {
    @observable
    store = {
        item: {},
        visible: false,
    };

    @action.bound
    showModal(item: Exercise) {
        if (!item) return;
        this.store.item = item;
        this.store.visible = true;
    }

    @action.bound
    hideModal() {
        this.store.item = {};
        this.store.visible = false;
    }

    renderExerciseCard(item: Exercise) {
        return <ExerciseCard key={item.id} item={item} onPress={this.showModal} />;
    }

    render() {
        const { navigate } = this.props.navigation;
        const items = rootStore.exercices.values();
        return (
          <ScreenShell title="Exercícios" navigate={navigate}>
            <ExerciseAnswerScreen state={this.store} onClose={this.hideModal} />
            {items.map(this.renderExerciseCard, this)}
          </ScreenShell>
        );
    }
}
