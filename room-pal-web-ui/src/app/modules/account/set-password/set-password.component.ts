import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import {  NgClass } from '@angular/common';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss'
})
export class SetPasswordComponent implements OnInit {
    setPassword: FormGroup<{
      password:FormControl;
      confirmPassword:FormControl;
    }>= new FormGroup({
        password: new FormControl('',[Validators.required, 
       Validators.minLength(6), 
       Validators.maxLength(16)
      ]),
      confirmPassword: new FormControl ('',[ Validators.required,
        Validators.minLength(6), 
        Validators.maxLength(16),

      ])
    });

    passwordValidator(control: AbstractControl): ValidationErrors | null {
      const value = new String(control.value).trim();
      if (!value) {
        return null;
      }
      if (value.length <= 1 && value.length < 6) return { minlength: true };
      if (value.length > 16) return { maxlength: true };
      return null;
    }
      
    confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
      const value = new String(control.value).trim();
      if (!value) {
        return null;
      }
      if (value.length <= 1 && value.length < 6) return { minlength: true };
      if (value.length > 16) return { maxlength: true };
      return null;
    }
  
    ngOnInit(): void {
    }


    onLoginClick() {
      this.setPassword.markAllAsTouched();
      // console.log(this.loginFormGroup.value);
      // console.log(this.loginFormGroup.controls);
    
    }
}
