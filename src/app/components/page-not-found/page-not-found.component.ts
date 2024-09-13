// src/app/components/page-not-found/page-not-found.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist. <a routerLink="/">Go back to home</a></p>
    </div>
  `,
  styles: []
})
export class PageNotFoundComponent {}
