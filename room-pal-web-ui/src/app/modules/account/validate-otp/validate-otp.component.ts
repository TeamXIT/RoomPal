

import { NgClass } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-validate-otp',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './validate-otp.component.html',
  styleUrls: ['./validate-otp.component.scss']
})

export class ValidateOtpComponent implements OnInit {
  otpForm: FormGroup= new FormGroup ({
    otp:new FormControl('',[Validators.required,
                           Validators.minLength(6),
                            Validators.maxLength(6)])
  });


ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  
onSubmit(): void {
  this.otpForm.markAllAsTouched();
  console.log(this.otpForm.value);
  console.log(this.otpForm.controls);
  }

  resendOTP(event: Event) {
         event.preventDefault();
         console.log('Resend OTP clicked');
      }
    
}
