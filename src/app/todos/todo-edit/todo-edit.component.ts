import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Todo } from '../../_models/todo';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { NgForm } from '@angular/forms';
import { TodoService } from '../../_services/todo.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})

export class TodoEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  todo: Todo;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private todoService: TodoService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.todo = data['todo'];
      localStorage.setItem('todo', JSON.stringify(this.todo));

    });
    // this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  // updateTodo() {
  //   this.todoService.updateTodo(this.todoService.todoId, this.todo).subscribe(next => {
  //     this.alertify.success('Profile updated successfully');
  //     this.editForm.reset(this.todo);
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

  updateMainPhoto(photoUrl) {
    this.todo.photoUrl = photoUrl;
  }
}
