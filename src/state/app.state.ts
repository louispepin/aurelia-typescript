import { User } from 'models/user';

export interface AppState {
  users: User[];
}

export const initialState: AppState = {
  users: [{
   id: -1,
   name: 'TBD',
   age: -1,
   city: 'TBD',
   hobbies: []
 }]
}

export function setUsers(_currentState: AppState, users: User[]) {
  // TODO: Implement action to set users to the state
  const newState = { users };
  return newState;
} 
