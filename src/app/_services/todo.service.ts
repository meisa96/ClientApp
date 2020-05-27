import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../_models/todo';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: "root",
})
export class TodoService {
  baseUrl = environment.apiUrl;
  todoId: any;

  constructor(private http: HttpClient) {}

  addTodo(model: any) {
    return this.http.post(this.baseUrl + "todos", model, httpOptions).pipe(
      map((response: any) => {
        const id = response;
        if (id) {
          this.todoId = id;
          console.log(this.todoId);
        }
      })
    );
  }

  getTodos(page?, itemsPerPage?): Observable<PaginatedResult<Todo[]>> {
    const paginatedResult: PaginatedResult<Todo[]> = new PaginatedResult<Todo[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    
    return this.http.get<Todo[]>(this.baseUrl + 'todos', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }),observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
          }
          return paginatedResult;
        })
      );
  }

  GetTimeOverToDos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl + 'todos/GetTimeOverToDos', httpOptions);
  }

  getTodo(id): Observable<Todo> {
    return this.http.get<Todo>(this.baseUrl + "todos/" + id, httpOptions);
  }

  updateTodo(id: number, todo: Todo) {
    return this.http.put(this.baseUrl + "todos/" + id, todo, httpOptions);
  }
  deleteTodo(id: number) {
    return this.http.delete(this.baseUrl + "todos/" + id, httpOptions);
  }
  deleteImage(todoId: number, id: number) {
    return this.http.delete(this.baseUrl + "todos/" + todoId + "/images/" + id, httpOptions);
  }
}



