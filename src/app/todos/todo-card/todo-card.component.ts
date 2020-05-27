import { AlertifyService } from 'src/app/_services/alertify.service';
import { TodoService } from './../../_services/todo.service';
import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../_models/todo';
import { Store } from '@ngrx/store';
import { StoreInterface } from 'src/app/store/store';
import { LoadTodosAction } from 'src/app/store/actions/MissedTodos.actions';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css'],
})
export class TodoCardComponent implements OnInit {
  @Input() todo: Todo;

  constructor(
    private todoService: TodoService,
    private alertify: AlertifyService,
    private store: Store<StoreInterface>
  ) {}

  ngOnInit() {}
  deleteTodo(id: number, event) {
    this.alertify.confirm('Are you sure you want to delete this todo?', () => {
      this.todoService.deleteTodo(id).subscribe(
        () => {
          event.toElement.parentElement.parentElement.parentElement.remove();
          this.store.dispatch(new LoadTodosAction());
          this.alertify.success('todo has been deleted');
        },
        (error) => {
          this.alertify.error('Failed to delete the todo');
        }
      );
    });
  }
}
