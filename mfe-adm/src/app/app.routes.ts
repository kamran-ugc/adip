import { Routes } from '@angular/router';
import { TodoListModule } from './todo-list/todo-list.module';

export const routes: Routes = [
    { path: '', component: TodoListModule },
    { path: 'home', component: TodoListModule },
];
