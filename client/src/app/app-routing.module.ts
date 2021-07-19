import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service'
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MyblogsComponent } from './components/myblogs/myblogs.component';
import { UsersComponent } from './components/users/users.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { AddarticleComponent } from './components/addarticle/addarticle.component';


const routes: Routes = [
  { path: 'myblogs', component: MyblogsComponent, canActivate: [AuthGuardService], data: { roles: ['admin', 'user'] } },
  { path: 'addArticle', component: AddarticleComponent, canActivate: [AuthGuardService], data: { roles: ['admin','user'] } },
  { path: 'editUser', component: AdduserComponent, canActivate: [AuthGuardService], data: { roles: ['admin','user'] } },

  { path: 'signUp', component: AdduserComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
