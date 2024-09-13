import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class SignupComponent {
  signupForm: FormGroup;
  users: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z\s]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)]],
      repassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('repassword')?.value ? null : { mismatch: true };
  }

  togglePasswordVisibility(field: string) {
    const inputField = document.getElementById(field) as HTMLInputElement;
    if (inputField.type === 'password') {
      inputField.type = 'text';
    } else {
      inputField.type = 'password';
    }
  }
 
  onSubmit() {
    if (this.signupForm.valid) {
      this.http.get('http://localhost:3000/users').subscribe((data: any) => {
        this.users = data.users || [];
        if (this.users.some(user => user.email === this.signupForm.value.email)) {
          alert('A user with the same email already exists.');
          console.log(this.users.some(user => user.email === this.signupForm.value.email))
         
        } else {
          this.users.push(this.signupForm.value);
          this.http.post('http://localhost:3000/users', { users: this.users }).subscribe(() => {
            alert('Form submitted successfully!');
            this.router.navigate(['/login']);
          });
        }
      });
    } else {
      alert('Please fix the errors and try again.');
    }
  }
}