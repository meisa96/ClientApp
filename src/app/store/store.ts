import { MissedTodosReducer } from './reducers/missedTodos.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { Todo } from '../_models/todo';

export interface StoreInterface {
  missedTodos: Todo[];
}

export interface CustomAction {
    type: string,
    payload: any
}

export const reducers: ActionReducerMap<StoreInterface> = {
         missedTodos: MissedTodosReducer,
       };