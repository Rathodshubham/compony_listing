import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  companies: Company[] = [];
  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 5;
  editingCompany: Company | null = null;
  showAddCompanyModal: boolean = false;
  showToast: boolean = false;
  sortColumn: keyof Company | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  private apiUrl = 'http://localhost:3000/companies';
  newCompany: Company = {
    id: '',
    name: '',
    category: '',
    description: '',
    rating: 0,
    companyImage: '',
    type: '',
    location: '',
    products: [] // this will be entered as a comma-separated string in the form
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCompanies();
  }

  fetchCompanies() {
    this.http.get<Company[]>(this.apiUrl).subscribe({
      next: companies => {
        this.companies = companies;
        console.log('Fetched companies:', this.companies);
      },
      error: err => {
        console.error('Error fetching companies:', err);
      }
    });
  }

  get filteredCompanies() {
    const term = this.searchTerm.toLowerCase();
    return this.companies
      .filter(company => {
        const products = Array.isArray(company.products) ? company.products.join(', ').toLowerCase() : (company.products as string).toLowerCase();
        return (
          company.id.toString().toLowerCase().includes(term) ||
          company.name.toLowerCase().includes(term) ||
          company.category.toLowerCase().includes(term) ||
          company.description.toLowerCase().includes(term) ||
          company.rating.toString().toLowerCase().includes(term) ||
          company.type.toLowerCase().includes(term) ||
          company.location.toLowerCase().includes(term) ||
          products.includes(term)
        );
      })
      .sort((a, b) => {
        const compare = (x: any, y: any) => (x < y ? -1 : x > y ? 1 : 0);
        const direction = this.sortDirection === 'asc' ? 1 : -1;
        if (this.sortColumn) {
          return compare(a[this.sortColumn], b[this.sortColumn]) * direction;
        }
        return 0;
      });
  }

  paginatedCompanies() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredCompanies.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredCompanies.length / this.pageSize);
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  editCompany(company: Company) {
    this.editingCompany = { ...company };
  }

  deleteCompany(companyId: string) {
    this.http.delete(`${this.apiUrl}/${companyId}`).subscribe({
      next: () => {
        this.companies = this.companies.filter(company => company.id !== companyId);
        this.showToast = true;
        setTimeout(() => this.showToast = false, 3000);
      },
      error: err => {
        console.error('Error deleting company:', err);
      }
    });
  }

  closeModal() {
    this.editingCompany = null;
  }

  saveChanges() {
    if (this.editingCompany) {
      const index = this.companies.findIndex(c => c.id === this.editingCompany!.id);
      this.http.put(`${this.apiUrl}/${this.editingCompany.id}`, this.editingCompany).subscribe({
        next: () => {
          this.companies[index] = this.editingCompany!;
          this.closeModal();
          this.showToast = true;
          setTimeout(() => this.showToast = false, 3000);
        },
        error: err => {
          console.error('Error updating company:', err);
        }
      });
    }
  }

  setSortColumn(column: keyof Company) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  openAddCompanyModal() {
    this.showAddCompanyModal = true;
  }

  closeAddCompanyModal() {
    this.showAddCompanyModal = false;
    this.resetNewCompanyForm();
  }

  resetNewCompanyForm() {
    this.newCompany = {
      id: '',
      name: '',
      category: '',
      description: '',
      rating: 0,
      companyImage: '',
      type: '',
      location: '',
      products: [] // this will be entered as a comma-separated string in the form
    };
  }

  addCompany(form: NgForm) {
    if (form.valid) {
      const newCompany = {
        ...this.newCompany,
        id: this.generateId(),
        products: (this.newCompany.products as any).split(',').map((p: string) => p.trim()) // ensure products is a string before splitting
      };
      this.http.post<Company>(this.apiUrl, newCompany).subscribe({
        next: company => {
          this.companies.push(company);
          form.resetForm();
          this.closeAddCompanyModal();
          this.showToast = true;
          setTimeout(() => this.showToast = false, 3000);
        },
        error: err => {
          console.error('Error adding company:', err);
        }
      });
    }
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  getProductsDisplay(products: any): string {
    return Array.isArray(products) ? products.join(', ') : products;
  }
}
