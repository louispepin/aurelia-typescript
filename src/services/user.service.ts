import { inject } from 'aurelia-dependency-injection';
import { Store } from "aurelia-store";
import { AppState } from "state/app.state";

const url = 'https://eniyqwt36cn3awt.m.pipedream.net';

@inject(Store)
export class UserService {
    constructor(private store: Store<AppState>) {}
    
    async getUsers() {
        // TODO: Fetch users using the fetch() api
        const response = await fetch(url);
        const users = await response.json();


        this.store.dispatch('SetUsers', users);
    }
}
