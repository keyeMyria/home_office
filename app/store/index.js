import { observable } from 'mobx';

import * as MOCK from '../mock';

class AppStore {

  // Statics
  @observable users = MOCK.users;
  @observable childStudents = MOCK.childStudents;
  @observable calendars = MOCK.calendars;
  @observable alerts = MOCK.alerts;
  @observable subjectAreas = MOCK.subjectAreas;
  @observable planningTimes = MOCK.planningTimes;
  @observable students = MOCK.students;
  @observable classes = MOCK.classes;
  @observable occurrenceReasons = MOCK.occurrenceReasons;
  @observable schoolYears = MOCK.schoolYears;

  // Dynamics
  @observable userSelected = this.users[0];
  @observable studentSelected = {};
  @observable studentCalendar = {};
  @observable studentAlerts = [];
  @observable studentSubjectAreas = [];
  @observable studentPlanning = {};
  @observable plannings = [];
  @observable schoolYearSelected = this.schoolYears[0];
  @observable teacherAlerts = this.alerts[0];
  @observable teacherSubjectAreas = this.subjectAreas[0].items;

  // Controller
  @observable formChanged = false;
  @observable absenses = [];
  @observable occurrences = [];

  // Navigation (Using BubbleMenu - Student)

  selectStudent(id) {
    this.studentSelected = this.childStudents.filter(o => o.id === id)[0];
    this.studentCalendar = this.calendars.filter(o => o.studentId === id)[0];
    this.studentSubjectAreas = this.subjectAreas.filter(o => o.studentId === id)[0];
    this.studentAlerts = this.alerts.filter(o => o.studentId === id)[0];
    this.studentPlanning = this.plannings.length > 0 ? this.plannings.filter(o => o.studentId === id)[0] || {} : {};
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
    this.studentPlanning = values;
    if (this.plannings.length > 0) {
      this.plannings = this.plannings.filter(o => o.studentId !== this.studentSelected.id);
    }
    this.plannings.push(this.studentPlanning);
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