import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe({
      next: data => {
        if (data.length > 0 && data[0].users) {
          this.users = data[0].users || [];
        }
        console.log('Fetched users:', this.users); // Log fetched users
      },
      error: err => {
        console.error('Error fetching users:', err);
      }
    });
  }

  onSubmit() {
    console.log('Form values:', this.loginForm.value); // Log form values

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const user = this.users.find(u => u.email === email && u.password === password);
      console.log('Matching user:', user); // Log matching user

      if (user) {
        alert('Login successful!');
        this.router.navigate(['/']); // Navigate to the dashboard or home page after login
      } else {
        alert('Invalid email or password.');
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
