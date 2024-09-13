// src/app/components/company-admin-dashboard/company-admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h2>Company Admin Dashboard</h2>
      <div *ngIf="company">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input id="name" [(ngModel)]="company.name" class="form-control">
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">Category</label>
          <input id="category" [(ngModel)]="company.category" class="form-control">
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <input id="description" [(ngModel)]="company.description" class="form-control">
        </div>
        <button (click)="updateCompany()" class="btn btn-success">Update</button>
      </div>
    </div>
  `,
  styles: []
})
export class CompanyAdminDashboardComponent implements OnInit {
  company: Company | null = null;

  constructor(private companyService: CompanyService, private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user && user.companyId) {
      this.companyService.getCompany(user.companyId).subscribe(company => {
        this.company = company;
      });
    }
  }

  updateCompany() {
    if (this.company) {
      this.companyService.updateCompany(this.company).subscribe();
    }
  }
}
