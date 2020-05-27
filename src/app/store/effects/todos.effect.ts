import { TodoService } from './../../_services/todo.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { load, SuccessAction, FailedAction } from '../actions/MissedTodos.actions';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class TodosEffect {

    todosEffect = createEffect(() => this.actions.pipe(
        ofType(load),
        mergeMap(() => this.todosService.GetTimeOverToDos().pipe(
            map((data) => new SuccessAction(data)),
            catchError((err) => of(new FailedAction(err)))
        ))
    ))
    constructor(private actions: Actions, private todosService:TodoService){}
}