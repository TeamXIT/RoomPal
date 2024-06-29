import { NgClass,JsonPipe } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import {  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup<{
    mobileNumber:FormControl;
    preference1: FormControl;
    preference2: FormControl;
    preference3: FormControl;
    preference4: FormControl;
    password:FormControl;
    confirmPassword:FormControl;
  }>= new FormGroup({
    mobileNumber: new FormControl('', [
      Validators.required,
      this.mobileNumberValidator,
    ]),
    preference1: new FormControl(false),
    preference2: new FormControl(true),
    preference3: new FormControl(true),
    preference4: new FormControl(false),
    password: new FormControl('',[Validators.required, 
     Validators.minLength(6), 
     Validators.maxLength(16)
    ]),
    confirmPassword: new FormControl ('',[ Validators.required,
      Validators.minLength(6), 
      Validators.maxLength(16)
    ]),

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


  onSubmit() {
    this.registrationForm.markAllAsTouched();
    console.log(this.registrationForm.value);
    console.log(this.registrationForm.controls);
  
  }

 
}
