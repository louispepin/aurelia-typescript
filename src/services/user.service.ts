import { User } from 'models/user';

const url = 'https://eniyqwt36cn3awt.m.pipedream.net';

export class UserService {
  async getUsers(): Promise<User[]> {
    return fetch(url).then(response => response.json());
  }
}
