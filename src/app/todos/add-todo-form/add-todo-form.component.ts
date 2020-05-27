import { LoadTodosAction } from './../../store/actions/MissedTodos.actions';
import { TodoService } from './../../_services/todo.service';
import { Todo } from './../../_models/todo';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreInterface } from 'src/app/store/store';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css'],
  providers: [DatePipe],
})
export class AddTodoFormComponent implements OnInit {
  todo: Todo;
  baseUrl = environment.apiUrl;
  myImages: string[] = [];
  addTodoform: FormGroup;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private router: Router,
    private alertify: AlertifyService,
    private datePipe: DatePipe,
    private store: Store<StoreInterface>
  ) {}

  ngOnInit() {
    this.addTodoform = this.formBuilder.group({
      description: ['', Validators.required],
      datetime: ['', Validators.required],
    });
    this.initializeUploader();
  }

  submit() {
    if (this.addTodoform.valid) {
      const body = this.addTodoform.value;
      this.todo = Object.assign({}, this.addTodoform.value);

      this.todoService.addTodo(this.todo).subscribe(
        () => {
          this.alertify.success('added successfully');
          this.store.dispatch(new LoadTodosAction());

        },
        (error) => {
          this.alertify.error(error);
        },
        () => {
          this.uploader.setOptions({
            url: this.baseUrl + 'todos/' + this.todoService.todoId + '/Images',
          });
          this.uploader.uploadAll();
          this.router.navigate(['/todos']);
        }
      );
    }
  }
  initializeUploader() {
    this.uploader = new FileUploader({
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
  }
}
