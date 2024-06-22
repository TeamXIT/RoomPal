import { JsonPipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

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
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
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
  ngOnInit(): void {}

  onSubmit() {
    this.loginFormGroup.markAllAsTouched();
    // console.log(this.loginFormGroup.value);
  }
}
