import { observable } from 'mobx';

import * as MOCK from '../mock';

class AppStore {

  // Statics
  @observable users = MOCK.users;
  @observable childStudents = MOCK.childStudents;
  @observable calendars = MOCK.calendars;
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

  // Dynamics
  @observable userSelected = this.users[0];
  @observable studentSelected = {};
  @observable plannings = [];
  @observable schoolYearSelected = this.schoolYears[0];
  @observable teacher = {
    alerts: this.alerts[0],
    subjectAreas: this.subjectAreas
  }

  // Controller
  @observable formChanged = false;
  @observable absenses = [];
  @observable occurrences = [];
  @observable examTopics = [];
  @observable exerciceQuestions = [];

  // Navigation (Using BubbleMenu - Student)

  selectStudent(id) {
    this.studentSelected = this.childStudents.filter(o => o.id === id)[0];
    this.studentSelected.calendar = this.calendars.filter(o => o.studentId === id)[0];
    this.studentSelected.subjectAreas = this.studentSubjectAreas.filter(o => o.studentId === id)[0];
    this.studentSelected.alerts = this.alerts.filter(o => o.studentId === id)[0];
    this.studentSelected.planning = this.plannings.length > 0 ? this.plannings.filter(o => o.studentId === id)[0] || {} : {};
    this.formChanged = true;
  }

   // Navigation (Using BubbleMenu - School Year)

  selectSchoolYear(id) {
    this.schoolYearSelected = this.schoolYears.filter(o => o.id === id)[0];
  }

  // Form

  toogleFormChanged() {
    this.formChanged = !this.formChanged;
  }

  // Planning

  saveStudentPlanning(values) {
    values.studentId = this.studentSelected.id;
    this.studentSelected.planning = values;
    if (this.plannings.length > 0) {
      this.plannings = this.plannings.filter(o => o.studentId !== this.studentSelected.id);
    }
    this.plannings.push(this.studentSelected.planning);
  }

  // ABSENSE

  checkStudentAbsense(studentId) {
    this.absenses.push(studentId);
  }

  uncheckStudentAbsense(studentId) {
    this.absenses = this.absenses.filter(id => id !== studentId);
  }

  // OCCURRENCE

  checkStudentOccurrence(studentId) {
    this.occurrences.push(studentId);
  }

  uncheckStudentOccurrence(studentId) {
    this.occurrences = this.occurrences.filter(id => id !== studentId);
  }

  // EXAM TOPICS

  checkExamTopic(topicId) {
    this.examTopics.push(topicId);
  }

  uncheckExamTopic(topicId) {
    this.examTopics = this.examTopics.filter(id => id !== topicId);
  }

  // EXERCICE QUESTIONS

  checkExerciceQuestion(questionId) {
    this.exerciceQuestions.push(questionId);
  }

  uncheckExerciceQuestion(questionId) {
    this.exerciceQuestions = this.exerciceQuestions.filter(id => id !== questionId);
  }

  // IMAGES

  getStudentImagebyId(studentId) {
    switch (studentId) {
      case 1:
        return require('../img/caio.png');
      case 2:
        return require('../img/filipe.png');
      case 3:
        return require('../img/arwen.png');
      default:
        return require('../img/user.png');
    }
  }

}

export default new AppStore();