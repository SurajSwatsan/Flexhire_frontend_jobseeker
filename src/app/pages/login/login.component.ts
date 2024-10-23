import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Corrected "styleUrl" to "styleUrls"
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the form group with validation
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, this.invalidIdentifierValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  // Custom validation for email or mobile number
  invalidIdentifierValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    // Regular expressions for email and mobile number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    const mobileRegex = /^\d{10}$/; // Example for 10-digit mobile numbers

    // Check if the value matches either the email or mobile pattern
    if (!value || emailRegex.test(value) || mobileRegex.test(value)) {
      return null; // Valid
    }

    return { invalidIdentifierValidator: true }; // Invalid
  }

  onFocus() {
    // Mark the identifier control as touched when focused
    this.loginForm.get('identifier')?.markAsTouched();
  }

  onInput() {
    // Mark the identifier control as dirty on input to trigger validation
    this.loginForm.get('identifier')?.markAsDirty();
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      // Perform login logic (e.g., API call)
      console.log('Login successful:', this.loginForm.value);
      // Redirect to another route after successful login
      this.router.navigate(['/dashboard']); // Change '/dashboard' to your desired route
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
    }
  }

  // Navigate to the forgot password page
  navigateTo() {
    this.router.navigate(['/forget-password']); // Change '/forgot-password' to your desired route
  }
}
