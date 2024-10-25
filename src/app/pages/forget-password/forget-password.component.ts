import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { delay, interval, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  forgotPasswordForm: FormGroup;
  otpSent: boolean = false;
  otpVerified = false;
  timerActive:boolean = false;
  countdown: number = 30; // 30 seconds
  loading = false; // New loading state
  timerSubscription: Subscription | undefined; 
  otp: string = '';
  identifier: string = ''; 
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  submitted: boolean = false;
  otpInvalid = false;

  constructor(private fb: FormBuilder,private http: HttpClient, private router: Router,private messageService: MessageService ) {
    this.forgotPasswordForm = this.fb.group({
      emailOrMobile: ['', [
        Validators.required,
        Validators.pattern(/(^\d{10}$)|(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/)
      ]],
      otp: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },{ validators: this.passwordMatchValidator });
  }

  ngOnInit():void {}
  
  sendOtp() {
    if (this.forgotPasswordForm.get('emailOrMobile')?.valid) {
      this.otpSent = true;
      this.otp = this.generateOtp();
      this.startOtpTimer();
  
      // Simulate sending OTP (replace with actual API call)
      console.log('OTP sent to:', this.forgotPasswordForm.get('emailOrMobile')?.value);
      console.log('Generated OTP:', this.otp);
  
      // Show success message
      this.messageService.add({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'OTP has been sent successfully!' 
      });
    } else {}
  }

  //this is used for testing purpose only 
  private generateOtp(): string {
    // Generate a random 6-digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }

  // Verify the otp 
  verifyOtp() {
    const enteredOtp = this.forgotPasswordForm.get('otp')?.value;
    const expectedOtp = 'expected-otp'; // Replace with actual expected OTP logic

    if (enteredOtp === expectedOtp) {
      this.otpInvalid = false;
      // Proceed to set otpVerified = true
      this.otpVerified = true;
    } else {
      this.otpInvalid = true; // Set to true if OTP is invalid
    }
  }

  //Resend OTP
  resendOtp(): void {
    if (!this.timerActive) {
      this.sendOtp();
    }
  }

  // OTP Timer countdown
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

  //Resend OTP Timer 
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

  // Validate the OTP
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


  // password validator
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { passwordMismatch: true };
  }
  // New and old password are different
  passwordDifferentValidator(form: FormGroup): { [key: string]: boolean } | null {
    const oldPassword = form.get('oldPassword')?.value;
    const newPassword = form.get('newPassword')?.value;
    return oldPassword !== newPassword ? null : { passwordsMatch: true };
  }

  // Submit button
  onSubmit() {
    this.submitted = true;
  
    // Check if the form is valid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

     // Verify if the old password and new password are different
  // if (this.forgotPasswordForm.errors?.['passwordsMatch']) {
  //   console.log('New password must be different from old password.');
  //   return; // Exit if they are the same
  // }
  
    // Verify the OTP before proceeding
    const enteredOtp = this.forgotPasswordForm.get('otp')?.value;
    const expectedOtp = this.otp; // Use the OTP generated when sent
  
    if (enteredOtp !== expectedOtp) {
      this.otpInvalid = true; // Set OTP invalid flag if OTP does not match
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid OTP, please try again.' });
      return; // Exit if OTP is invalid
    } else {
      this.otpInvalid = false; // Reset the OTP invalid flag if OTP is valid
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password reset successful!' });
    }
  
    
    console.log('Form Submitted:', this.forgotPasswordForm.value);
  }


  onFocus() {
    // Mark the identifier control as touched when focused
    this.forgotPasswordForm.get('emailorMbile')?.markAsTouched();
  }

  onInput() {
    // Mark the identifier control as dirty on input to trigger validation
    this.forgotPasswordForm.get('emailorMobile')?.markAsDirty();
  }

  onSendOtpClick(event: MouseEvent) {
    event.stopPropagation();
    this.sendOtp();
}
}
