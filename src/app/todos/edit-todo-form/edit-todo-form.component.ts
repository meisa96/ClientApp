import { StoreInterface } from './../../store/store';
import { LoadTodosAction } from './../../store/actions/MissedTodos.actions';
import { Store } from '@ngrx/store';
import { TodoService } from './../../_services/todo.service';
import { Todo } from './../../_models/todo';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-todo-form',
  templateUrl: './edit-todo-form.component.html',
  styleUrls: ['./edit-todo-form.component.css'],
  providers: [DatePipe],
})
export class EditTodoFormComponent implements OnInit {
  todo: Todo;
  baseUrl = environment.apiUrl;
  myImages: string[] = [];
  editTodoform: FormGroup;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  value: String;
  id: number;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router,
    private alertify: AlertifyService,
    private datePipe: DatePipe,
    private store: Store<StoreInterface>
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.todo = data['todo'];
    });
    this.id = this.todo.id;

    this.editTodoform = this.formBuilder.group({
      description: [this.todo.description, Validators.required],
      datetime: [this.todo.dateTime, Validators.required],
    });
    this.initializeUploader();
  }

  submit() {
    if (this.editTodoform.valid) {
      const body = this.editTodoform.value;
      //body.datetime = this.datePipe.transform(
      //  body.datetime,
      //  "yyyy-MM-dd HH:mm:ss"
      //);
      this.todo = Object.assign({}, this.editTodoform.value);
      this.todoService.updateTodo(this.id, this.todo).subscribe(
        () => {
          this.alertify.success('edited successfully');
          this.store.dispatch(new LoadTodosAction());
          this.router.navigate(['/todos']);
        },
        (error) => {
          this.alertify.error(error);
        },
        () => {
          this.uploader.uploadAll();
        }
      );
    }
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'todos/' + this.id + '/Images',
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

  deleteImage(id: number, event) {
    this.alertify.confirm('Are you sure you want to delete this image?', () => {
      this.todoService.deleteImage(this.id, id).subscribe(
        () => {
          event.toElement.parentElement.remove();
          this.alertify.success('image has been deleted');
        },
        (error) => {
          this.alertify.error('Failed to delete the image');
        }
      );
    });
  }
}
