import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from '../layout/home/home.component';
import { TasksComponent } from './dashboard/tasks/tasks.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'users', component: UsersComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tasks', component: TasksComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
