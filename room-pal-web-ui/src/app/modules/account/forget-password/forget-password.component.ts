

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
