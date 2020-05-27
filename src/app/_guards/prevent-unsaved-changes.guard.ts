import {Injectable} from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { TodoEditComponent } from '../todos/todo-edit/todo-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<TodoEditComponent> {
    canDeactivate(component: TodoEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue?  Any unsaved changes will be lost');
        }
        return true;
    }
}
