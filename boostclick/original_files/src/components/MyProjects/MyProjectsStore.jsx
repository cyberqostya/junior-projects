const { makeObservable, observable, action } = require("mobx");

class MyProjectsStore {
  constructor() {
    makeObservable(this, {
      projects: observable,
      setProjects: action,

      paidProjects: observable,
      setPaidProjects: action,
    });
  }

  projects = [];
  setProjects(projects) {
    this.projects = projects;
  }

  paidProjects = [];
  setPaidProjects(projects) {
    this.paidProjects = projects;
  }
}

export default new MyProjectsStore();
