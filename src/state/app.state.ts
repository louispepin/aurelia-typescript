import { User } from 'models/user';

export interface AppState {
  users: User[];
  loading: boolean;
}

export const initialState: AppState = {
  users: [],
  loading: false
}

export function setUsers(currentState: AppState, users: User[]) {
  // TODO: Implement action to set users to the state
  return { ...currentState, users };
} 

export function setLoading(currentState: AppState, loading: boolean) {
  // TODO: Implement action to set wether the app is loading
  return { ...currentState, loading };
}
