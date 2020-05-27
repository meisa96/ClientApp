import { LoadTodosAction } from './../store/actions/MissedTodos.actions';
import { StoreInterface } from './../store/store';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../_models/todo';
import { TodoService } from '../_services/todo.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todos-noty-dropdown',
  templateUrl: './todos-noty-dropdown.component.html',
  styleUrls: ['./todos-noty-dropdown.component.css'],
})
export class TodosNotyDropdownComponent implements OnInit {
  todos$: Observable<Todo[]> = this.store.select((state) => state.missedTodos);

  todos: Todo[];

  constructor(
    private todoService: TodoService,
    private store: Store<StoreInterface>
  ) {}

  ngOnInit() {
    this.store.dispatch(new LoadTodosAction());
    this.todoService.GetTimeOverToDos().subscribe((res) => {
      this.todos = res;
    });
  }
}
