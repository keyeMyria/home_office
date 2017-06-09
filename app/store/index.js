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

  // Dynamics
  @observable userSelected = this.users[0];
  @observable studentSelected = {};
  @observable studentCalendar = {};
  @observable studentAlerts = [];
  @observable studentSubjectAreas = [];
  @observable studentPlanning = {};
  @observable plannings = [];
  @observable alertBadgeCount = 0;

  // Controller
  @observable formChanged = false;
  @observable absenses = [];

  // Navigation (Using BubbleMenu)

  selectStudent(id) {

    this.studentSelected = this.childStudents.filter(o => o.id === id)[0];
    this.studentCalendar = this.calendars.filter(o => o.studentId === id)[0];
    this.studentSubjectAreas = this.subjectAreas.filter(o => o.studentId === id)[0];

    this.studentAlerts = this.alerts.filter(o => o.studentId === id)[0];
    this.alertBadgeCount = this.studentAlerts != null ? this.studentAlerts.items.filter(o => !o.readed).length : 0;

    this.studentPlanning = this.plannings.length > 0 ? this.plannings.filter(o => o.studentId === id)[0] || {} : {};
    this.formChanged = true;
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

  removerFaltaTodosAlunos() {
    this.absenses = [];
  }
}

export default new AppStore();