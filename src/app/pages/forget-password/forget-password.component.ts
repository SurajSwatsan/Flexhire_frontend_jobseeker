import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, interval, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  forgotPasswordForm: FormGroup;
  otpSent: boolean = false;
  otpVerified = false;
  timerActive:boolean = false;
  countdown: number = 30; // 30 seconds
  loading = false; // New loading state
  timerSubscription: Subscription | undefined; // Declare here

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      emailOrMobile: ['', [
        Validators.required,
        Validators.pattern(/(^\d{10}$)|(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/)
      ]],
      otp: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },{ validators: this.passwordMatchValidator() });
  }

  ngOnInit():void {}

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      if (this.otpVerified) {
        // If OTP is verified, proceed with resetting the password
        const formData = {
          email: this.forgotPasswordForm.get('email')?.value,
          password: this.forgotPasswordForm.get('password')?.value,
        };
        // Call your service to handle password reset
        console.log('Password reset data:', formData);
        // Example: this.passwordService.resetPassword(formData).subscribe(...)
      } else {
        console.log('OTP not verified. Please verify OTP first.');
      }
    } else {
      console.log('Form is invalid');
    }
  }
  
  
  
    sendOtp() {
      if (this.forgotPasswordForm.get('emailOrMobile')?.valid) {
        this.otpSent = true;
        this.startOtpTimer();
  
        // Simulate sending OTP (replace with actual API call)
        console.log('OTP sent to:', this.forgotPasswordForm.get('emailOrMobile')?.value);
      } else {
        this.forgotPasswordForm.markAllAsTouched(); // Show validation errors
      }
  }

  verifyOtp(): void {
    if (this.forgotPasswordForm.get('otp')?.valid) {
      // Simulate OTP verification (replace with actual API call)
      console.log('OTP verified:', this.forgotPasswordForm.get('otp')?.value);
      // Proceed to the next step
    }
  }

  resendOtp(): void {
    if (!this.timerActive) {
      this.sendOtp();
    }
  }

  private startOtpTimer(): void {
    this.timerActive = true;
    this.countdown = 30;

    const timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(timer);
        this.timerActive = false;
      }
    }, 1000);
  }

  resetPassword() {
    // Logic to reset the password
  }

  startTimer() {
    this.timerActive = true;
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.timerActive = false;
        this.countdown = 30; // Reset for next resend
        this.timerSubscription?.unsubscribe();
      }
    });
  }



  passwordMatchValidator() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
  
      return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
    };
  }

  otpValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    const isValid = value === '' || /^[0-9]*$/.test(value); // Allow empty value or numeric only
    return isValid ? null : { invalidOtp: true }; // Return error if not valid
  }


  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
