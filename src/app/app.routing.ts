import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './pages/home/home.component';
import { ListTechnicalComponent } from './pages/list-technical/list-technical.component';

const routes: Routes = [
    {
      path: '',
      component: DefaultComponent,
      children: [
        {
          path: '',
          component: HomeComponent
        },
        {
          path: 'technical',
          component: ListTechnicalComponent
        }
  
      ]
    }];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }