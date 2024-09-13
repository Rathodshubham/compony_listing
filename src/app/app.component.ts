// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppRoutingModule, HeaderComponent],
  template: `
  <app-header></app-header> 
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {}
