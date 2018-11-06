import { observable, computed, autorun, action } from 'mobx';
import { loginQuery } from 'js/data';

class AppStore {
  @observable loggedIn = false;
  @observable email = '';
  @observable todos = [];
  @observable pendingRequests = 0;

  constructor() {
    autorun(() => console.log('EMAIL ', this.email));
  }

  @computed get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  @computed get report() {
    if (this.todos.length === 0)
      return "<none>";
    return `Next todo: "${this.todos[0].task}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }

  @action
  login(email, pwd, history) {
    console.log(history)
    loginQuery(email, pwd).then(x => {
      console.log(x)
      this.loggedIn = true;
      this.email = email;
      history.push('/')
    }).catch(err => {
      console.log(err)
      history.push('signup')
    })
  }

  @action
  logout(history) {
    console.log('LOGOUT')
    this.loggedIn = false;
    this.email = '';
    console.log(this.email, '')
    history.push('/')
  }
}


const appStore = new AppStore();

export default appStore;
