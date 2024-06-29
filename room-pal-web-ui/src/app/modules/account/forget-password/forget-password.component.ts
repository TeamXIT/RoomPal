// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


// @Component({
//   selector: 'app-forget-password',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './forget-password.component.html',
//   styleUrl: './forget-password.component.scss'
// })
// export class ForgetPasswordComponent {
//   resetPasswordForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.resetPasswordForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]]
//     });
//   }

//   onSubmit(): void {
//     if (this.resetPasswordForm.valid) {
//       console.log('Form submitted', this.resetPasswordForm.value);
//     }
//   }
// }

import { NgClass } from '@angular/common';
import{Component, OnInit} from '@angular/core';
import {  FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})

export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup= new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email])
  })



  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(): void {
    this.forgetPasswordForm.markAllAsTouched();
    console.log(this.forgetPasswordForm.value);
    console.log(this.forgetPasswordForm.controls);
  }

}
