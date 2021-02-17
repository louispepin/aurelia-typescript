import { inject } from 'aurelia-dependency-injection';
import { Store } from 'aurelia-store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserService } from 'services/user.service';
import { AppState, setLoading, setUsers } from './state/app.state';

@inject(Store, UserService)
export class App {
  state: AppState;
  
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>, private userService: UserService) {
    this.store = store;
    this.store.registerAction('SetUsers', setUsers);
    this.store.registerAction('SetLoading', setLoading);
  }

  bind() {
    this.subscriptions.push(
      this.store.state.pipe(filter((state) => !!state)).subscribe((state) => {
        this.state = state
      }),

      // TODO: Use javascript array functions to map/filter/sort data?

      // TODO: Do some tricky thing with observables?
    );
  }

  attached() {
    this.getUsers();
  }

  unbind() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  // TODO: Implement getUsers() which calls the service and sets users in the store
  private async getUsers() {
    this.store.dispatch('SetLoading', true);
    const users = await this.userService.getUsers();
    this.store.dispatch('SetUsers', users);
    this.store.dispatch('SetLoading', false);
  }
}
