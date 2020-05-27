import { success, failed } from '../actions/MissedTodos.actions';
import { CustomAction } from '../store';
import { Todo } from 'src/app/_models/todo';


export function MissedTodosReducer(state: Todo[], action: CustomAction) {
    switch (action.type) {
    case success:
        return action.payload;
    case failed:
        console.log('error', action.payload);
        return state;
    }
}
