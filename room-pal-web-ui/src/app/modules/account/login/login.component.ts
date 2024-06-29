import { Component,OnInit } from '@angular/core';
import { NgClass,JsonPipe  } from '@angular/common';
import {  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators, } from '@angular/forms';

  @Component({
      selector: 'app-login',
      standalone: true,
      imports: [ReactiveFormsModule, NgClass, JsonPipe],
      templateUrl: './login.component.html',
      styleUrl: './login.component.scss',
    })
export class LoginComponent implements OnInit {
 
  loginFormGroup: FormGroup<{
    mobileNumber: FormControl;
    password: FormControl;
  }> = new FormGroup({
    mobileNumber: new FormControl('', [
      Validators.required,
      this.mobileNumberValidator,
    ]),
   password: new FormControl('',[Validators.required, 
     Validators.minLength(6), 
     Validators.maxLength(16)
    ])
  });
  

  mobileNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = new String(control.value).trim();
    if (!value) {
      return null;
    }
    if (value.length <= 1 && value.length < 10) return { minlength: true };
    if (value.length > 10) return { maxlength: true };
    return null;
  }
 
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = new String(control.value).trim();
    if (!value) {
      return null;
    }
    if (value.length <= 1 && value.length < 6) return { minlength: true };
    if (value.length > 16) return { maxlength: true };
    return null;
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onLoginClick() {
    this.loginFormGroup.markAllAsTouched();
    console.log(this.loginFormGroup.value);
     console.log(this.loginFormGroup.controls);
  
  }
}