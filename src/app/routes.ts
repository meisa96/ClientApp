import { EditTodoFormComponent } from './todos/edit-todo-form/edit-todo-form.component';
import { TodosListResolver } from './_resolvers/todos-list.resolver';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { TodoDetailResolver } from './_resolvers/todo-detail.resolver';
import { TodoDetailComponent } from './todos/todo-detail/todo-detail.component';
import { TodoEditResolver } from './_resolvers/todo-edit.resolver';
import { AddTodoFormComponent } from './todos/add-todo-form/add-todo-form.component';

export const appRoutes: Routes = [
         { path: "home", component: HomeComponent },
         {
           path: "",
           runGuardsAndResolvers: "always",
           canActivate: [AuthGuard],
           children: [
             {
               path: "todos",
               component: TodoListComponent,
               resolve: { todos: TodosListResolver },
             },
             {
               path: "todos/:id",
               component: TodoDetailComponent,
               resolve: { todo: TodoDetailResolver },
             },
             {
               path: "todos/edit/:id",
               component: EditTodoFormComponent,
               resolve: { todo: TodoEditResolver }
             },
             { path: "addtodo", component: AddTodoFormComponent },
           ],
         },
         { path: "**", redirectTo: "", pathMatch: "full" },
       ];
