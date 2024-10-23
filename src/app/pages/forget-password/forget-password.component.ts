
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  forgotPasswordForm: FormGroup;
  otpSent = false;
  otp!: string;
  newPassword!: string;

  constructor(private fb: FormBuilder, private router:Router, private snackBar: MatSnackBar) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      otp: ['', Validators.required],
    });
  }

  sendOtp() {
    const emailControl = this.forgotPasswordForm.get('email');
    if (emailControl) {
      const email = emailControl.value;
      // Call your service to send OTP
      console.log(`Sending OTP to ${email}`);
      this.otpSent = true;
      this.otp = this.generateOtp(); // Simulate OTP generation
    }
  }
  
  resetPassword() {
    if (this.forgotPasswordForm.valid) {
      const otpControl = this.forgotPasswordForm.get('otp');
      const passwordControl = this.forgotPasswordForm.get('password');
  
      if (otpControl && passwordControl) {
        const enteredOtp = otpControl.value;
        if (enteredOtp === this.otp) {
          const newPassword = passwordControl.value;
          // Call your service to reset the password
          console.log(`Resetting password for ${this.forgotPasswordForm.get('email')?.value}`);
          this.router.navigate(['/login']); 
        } else {
          alert('Invalid OTP');
        }
      }
    }
  }
  showToast(message: string, action: string = 'Close', duration: number = 2500) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
  generateOtp() {
    return '123456'; // Simulate OTP generation
  }
}
