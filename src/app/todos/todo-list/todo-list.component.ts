import { TodoService } from './../../_services/todo.service';
import { Pagination, PaginatedResult } from './../../_models/pagination';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../_models/todo';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];
  pagination: Pagination;


  constructor(private alertify: AlertifyService,
    private route: ActivatedRoute,private todoService: TodoService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.todos = data['todos'].result;
      this.pagination = data['todos'].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Todo[]>) => {
        this.todos = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

}
