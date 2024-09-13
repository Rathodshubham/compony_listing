// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
 import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
 import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'companies', component: CompanyListComponent },
   { path: 'admin-dashboard', component: AdminDashboardComponent },
   { path: '**', component: PageNotFoundComponent } // Add this line

];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
