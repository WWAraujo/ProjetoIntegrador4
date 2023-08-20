import { BackofficeComponent } from './componentes/backoffice/backoffice.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/logins/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'solicitarLogin',
    pathMatch: 'full'
  },
  {
    path: 'solicitarLogin',
    component: LoginComponent
  },
  {
    path:'backoffice',
    component: BackofficeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
