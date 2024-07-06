import { NgClass,JsonPipe } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import {  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators } from '@angular/forms';
  import intlTelInput from 'intl-tel-input';

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
    password:FormControl;
    confirmPassword:FormControl;
  }>= new FormGroup({
    mobileNumber: new FormControl('', [
      Validators.required,
      this.mobileNumberValidator,
    ]),
      password: new FormControl('',[Validators.required, 
     Validators.minLength(6), 
     Validators.maxLength(16)
    ]),
    confirmPassword: new FormControl ('',[ Validators.required,
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
    const element = document.getElementById('phone');
    const inputElement = element as HTMLInputElement;
    

    if (inputElement){
      intlTelInput(inputElement,{
        initialCountry: 'in',
        separateDialCode: true,
        utilsScript:'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.0/js/utils.js'
      })
    }else {
      console.error('The element is not an HTMLInputElement');
    }
  }


  onSubmit() {
    this.registrationForm.markAllAsTouched();
    console.log(this.registrationForm.value);
    console.log(this.registrationForm.controls);
  
  }

 
}