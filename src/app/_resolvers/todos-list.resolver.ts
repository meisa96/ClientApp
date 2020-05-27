import { TodoService } from './../_services/todo.service';
import {Injectable} from '@angular/core';
import {Todo} from '../_models/todo';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TodosListResolver implements Resolve<Todo[]> {
    pageNumber = 1;
    pageSize = 4;
    constructor(private todoService: TodoService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Todo[]> {
        return this.todoService.getTodos(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
