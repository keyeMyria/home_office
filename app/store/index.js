import { observable, extendObservable, action, computed } from 'mobx';

import * as MOCK from '../mock';

class AppStore {
    // Statics
    @observable users = MOCK.users;
    @observable childStudents = MOCK.childStudents;
    @observable calendars = MOCK.calendars;
    @observable grades = MOCK.grades;
    @observable alerts = MOCK.alerts;
    @observable subjectAreas = MOCK.subjectAreas;
    @observable studentSubjectAreas = MOCK.studentSubjectAreas;
    @observable planningTimes = MOCK.planningTimes;
    @observable students = MOCK.students;
    @observable classes = MOCK.classes;
    @observable occurrenceReasons = MOCK.occurrenceReasons;
    @observable schoolYears = MOCK.schoolYears;
    @observable exerciceTypes = MOCK.exerciceTypes;
    @observable questionDatabaseTypes = MOCK.questionDatabaseTypes;
    @observable questionGenerationTypes = MOCK.questionGenerationTypes;
    @observable questions = MOCK.questions;
    @observable teacherCalendar = MOCK.teacherCalendar;
    @observable periods = MOCK.periods;

    // Dynamics
    @observable userSelected = this.users[0];
    @observable studentSelected = {};
    @observable plannings = [];
    @observable schoolYearSelected = this.schoolYears[0];
    @observable
    teacher = {
        alerts: this.alerts[0],
        subjectAreas: this.subjectAreas,
    };

    // Controller
    @observable formChanged = false;
    @observable absenses = [];
    @observable occurrences = [];
    @observable examTopics = [];
    @observable exerciseTopics = [];
    @observable exerciceQuestions = [];

    // Navigation (Using BubbleMenu - Student)

    selectStudent(id: number): void {
        this.studentSelected = this.childStudents.filter(o => o.id === id)[0];
        // this.studentSelected.grades = this.grades.filter(o => o.studentId === id)[0];
        this.studentSelected.calendar = this.calendars.filter(o => o.studentId === id)[0];
        this.studentSelected.subjectAreas = this.studentSubjectAreas.filter(
            o => o.studentId === id,
        )[0];
        this.studentSelected.alerts = this.alerts.filter(o => o.studentId === id)[0];
        this.studentSelected.planning =
            this.plannings.length > 0
                ? this.plannings.filter(o => o.studentId === id)[0] || {}
                : {};
        this.formChanged = true;
    }

    // Navigation (Using BubbleMenu - School Year)
    selectSchoolYear(id: number) {
        this.schoolYearSelected = this.schoolYears.filter(o => o.id === id)[0];
    }

    // Form

    toogleFormChanged() {
        this.formChanged = !this.formChanged;
    }

    // Planning

    saveStudentPlanning(values: any) {
        const data = values;
        data.studentId = this.studentSelected.id;
        this.studentSelected.planning = data;
        if (this.plannings.length > 0) {
            this.plannings = this.plannings.filter(o => o.studentId !== this.studentSelected.id);
        }
        this.plannings.push(this.studentSelected.planning);
    }

    // ABSENSE

    checkStudentAbsense(studentId: number) {
        this.absenses.push(studentId);
    }

    uncheckStudentAbsense(studentId: number) {
        this.absenses = this.absenses.filter(id => id !== studentId);
    }

    // OCCURRENCE

    checkStudentOccurrence(studentId: number) {
        this.occurrences.push(studentId);
    }

    uncheckStudentOccurrence(studentId: number) {
        this.occurrences = this.occurrences.filter(id => id !== studentId);
    }

    // EXAM TOPICS

    checkExamTopic(topicId: number) {
        this.examTopics.push(topicId);
    }

    uncheckExamTopic(topicId: number) {
        this.examTopics = this.examTopics.filter(id => id !== topicId);
    }

    // EXERCISE TOPICS
    checkExerciseTopic(topicId: number) {
        this.exerciseTopics.push(topicId);
    }

    uncheckExerciseTopic(topicId: number) {
        this.exerciseTopics = this.exerciseTopics.filter(id => id !== topicId);
    }

    // EXERCICE QUESTIONS

    checkExerciceQuestion(questionId: number) {
        this.exerciceQuestions.push(questionId);
    }

    uncheckExerciceQuestion(questionId: number) {
        this.exerciceQuestions = this.exerciceQuestions.filter(id => id !== questionId);
    }

    // IMAGES

    getStudentImagebyId(studentId: number): any {
        switch (studentId) {
        case 1:
                return require('../img/caio.png'); // eslint-disable-line
        case 2:
                return require('../img/filipe.png'); // eslint-disable-line
        case 3:
                return require('../img/arwen.png'); // eslint-disable-line
        default:
                return require('../img/user.png'); // eslint-disable-line
        }
    }
}

class StudentStore {
    students = observable([]);
    @observable isLoading = false;

    @action
    async fetchStudents({ limit = null, filter = null } = {}) {
        if (limit) {
            // Limit the Data Results
        }

        if (filter) {
            // Pass the filter params
        }

        this.isLoading = true;
        const data = await Promise.resolve(MOCK.students);
        const list = Student.init(data);
        this.students.replace(list);
        this.isLoading = false;
    }
}

class Student {
    static init(data) {
        if (Array.isArray(data)) {
            return data.map(o => new this(o));
        }
        return this(data);
    }

    constructor(rawData) {
        this.id = rawData.id;
        extendObservable(this, {
            name: rawData.name,
        });
    }

    get avatar() {
        switch (this.id) {
        case 1:
                return require('../img/caio.png'); // eslint-disable-line
        case 2:
                return require('../img/filipe.png'); // eslint-disable-line
        case 3:
                return require('../img/arwen.png'); // eslint-disable-line
        default:
                return require('../img/user.png'); // eslint-disable-line
        }
    }
}

class RootStore {
    constructor() {
        console.warn('DEPRECATED');
    }

    questions = { questions: new Map() };
    exercices = { exercises: new Map() };
}

const JSON_EVENTOS = require('./../mock/eventos.json');

export const eventosStore = observable(JSON_EVENTOS);

export const rootStore = new RootStore();

export const studentStore = new StudentStore();

export default new AppStore();
