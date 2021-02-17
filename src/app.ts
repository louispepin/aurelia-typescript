import { inject } from 'aurelia-dependency-injection';
import { Store } from 'aurelia-store';
import { User } from 'models/user';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
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
      this.store.state.pipe(filter((state) => !!state)).subscribe((state) => {
        this.allUsers = state.users
      }),

      // TODO: Get users with hobby 'something'?

      // TODO: Do some tricky thing with observables?
    );
  }

  attached() {
    // TODO: Call getUsers() and set the results in the store
    this.userService.getUsers().then(users => this.store.dispatch('SetUsers', users))
  }

  unbind() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
