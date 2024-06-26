// import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
// import { NgClass, NgIf } from '@angular/common';

// @Component({
//   selector: 'app-set-password',
//   standalone: true,
//   imports: [ReactiveFormsModule, NgClass , NgIf],
//   templateUrl: './set-password.component.html',
//   styleUrls: ['./set-password.component.scss']
// })
// export class SetPasswordComponent implements OnInit {
//   setPassword: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.setPassword = this.fb.group({
//       password: new FormControl('', [
//         Validators.required,
//         Validators.minLength(6),
//         Validators.maxLength(16)
//       ]),
//       confirmPassword: new FormControl('', [
//         Validators.required
//       ])
//     }, {
//       validators: this.passwordsMatchValidator
//     });
//   }

//   ngOnInit(): void {
//   }

//   passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
//     const password = group.get('password')?.value;
//     const confirmPassword = group.get('confirmPassword')?.value;
//     return password === confirmPassword ? null : { passwordsMismatch: true };
//   }

//   hasPasswordsMismatchError(): boolean {
//     return this.setPassword.errors?.['passwordsMismatch'] && this.setPassword.controls['confirmPassword'].touched;
//   }

//   onLoginClick() {
//     this.setPassword.markAllAsTouched();
//          console.log(this.setPassword.value);
//       console.log(this.setPassword.controls);
//   }
// }



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
