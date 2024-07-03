import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-validate-otp',
  standalone: true,
  imports: [ ReactiveFormsModule,CommonModule],
  templateUrl: './validate-otp.component.html',
  styleUrl: './validate-otp.component.scss'
})
export class ValidateOtpComponent implements OnInit {
  ngOnInit(): void {
  }

  otpForm: FormGroup<{
    otp:FormControl;
  }> = new FormGroup({
    otp: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern('^[0-9]*$')
    ])
  })

onSubmit(): void {
  if (this.otpForm.valid) {
    console.log('OTP Submitted', this.otpForm.value);
  } 
}
}
