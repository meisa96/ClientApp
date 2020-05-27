import { Todo } from './../_models/todo';
import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { TodoService } from '../_services/todo.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TodoEditResolver implements Resolve<Todo> {
    constructor(private todoService: TodoService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Todo> {
        return this.todoService.getTodo(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/todos']);
                return of(null);
            })
        );
    }
}
