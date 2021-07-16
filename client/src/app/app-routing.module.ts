import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service'
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = [
  { path: 'hhhhhhome', component: HomeComponent, canActivate: [AuthGuardService], data: { roles: ['admin', 'user'] } },

  { path: 'home', component: HomeComponent },
  { path: '**', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
