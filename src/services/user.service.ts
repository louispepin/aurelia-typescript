import { inject } from 'aurelia-dependency-injection';
import { Store } from "aurelia-store";
import { User } from 'models/user';
import { AppState } from "state/app.state";

const url = 'https://eniyqwt36cn3awt.m.pipedream.net';

@inject(Store)
export class UserService {
    constructor(private store: Store<AppState>) {}
    
    async getUsers(): Promise<User[]> {
        return fetch(url).then(response => response.json());
    }
}
