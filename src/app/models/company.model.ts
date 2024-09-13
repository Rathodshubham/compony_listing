// src/app/models/company.model.ts
export interface Company {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  companyImage: string; // Path or link to the image
  type: string;
  location: string;
  products: string[]; // Array of products
}
