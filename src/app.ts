import { inject } from 'aurelia-dependency-injection';
import { Store } from 'aurelia-store';
import { User } from 'models/user';
import { Subscription } from 'rxjs';
import { UserService } from 'services/user.service';
import { AppState, setUsers } from './state/app.state';

@inject(Store, UserService)
export class App {
  allUsers: User[];
  usersWithHobby: User[];
  

  private subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>, private userService: UserService) {
    this.store = store;
    this.store.registerAction('SetUsers', setUsers);
  }

  bind() {
    this.subscriptions.push(
      this.store.state.subscribe((state) => {
        this.allUsers = state.users
      }),

      // TODO: Get users with hobby 'hockey'
      this.store.state.subscribe((state) => {
        this.usersWithHobby = state.users.filter(user => user.hobbies.includes('hockey'))
      }),

      // TODO: Use some rxjs operators
    );
  }

  attached() {
    this.userService.getUsers();
  }

  unbind() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
