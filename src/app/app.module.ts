import { TodosEffect } from './store/effects/todos.effect';
/*import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
   declarations: [
      AppComponent,
      TodosNotyDropdownComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
*/
import { EditTodoFormComponent } from './todos/edit-todo-form/edit-todo-form.component';
import { FileUploadComponent } from './todos/add-todo-form/file-upload/file-upload.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { FileUploadModule } from 'ng2-file-upload';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery-9';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { TodosListResolver } from './_resolvers/todos-list.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { TodoCardComponent } from './todos/todo-card/todo-card.component';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoDetailComponent } from './todos/todo-detail/todo-detail.component';
import { TodoEditComponent } from './todos/todo-edit/todo-edit.component';
import { TodoDetailResolver } from './_resolvers/todo-detail.resolver';
import { TodoEditResolver } from './_resolvers/todo-edit.resolver';
import { AddTodoFormComponent } from './todos/add-todo-form/add-todo-form.component';
import { TodosNotyDropdownComponent } from './todos-noty-dropdown/todos-noty-dropdown.component';
import { reducers } from './store/store';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    TodoCardComponent,
    TodoListComponent,
    EditTodoFormComponent,
    TodoDetailComponent,
    AddTodoFormComponent,
    FileUploadComponent,
    TodosNotyDropdownComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    FileUploadModule,
    DateTimePickerModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TodosEffect]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:3130"],
        blacklistedRoutes: ["localhost:3130/api/auth"],
      },
    }),
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    UserService,
    TodosListResolver,
    TodoDetailResolver,
    TodoEditResolver,
    PreventUnsavedChanges,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
