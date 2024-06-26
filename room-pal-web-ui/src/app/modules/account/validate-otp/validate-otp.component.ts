import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-validate-otp',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './validate-otp.component.html',
  styleUrl: './validate-otp.component.scss'
})
export class ValidateOtpComponent {
  otpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.otpForm = this.fb.group({
      otp: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('^[0-9]*$')
      ]]
    });
  }

  onSubmit() {
    if (this.otpForm.valid) {
      console.log('OTP Submitted', this.otpForm.value);
    } else {
      this.markFormGroupTouched(this.otpForm);
    }
  }

  resendOTP(event: Event) {
    event.preventDefault();
    console.log('Resend OTP clicked');
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}