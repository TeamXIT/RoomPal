import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formGroup: FormGroup<{
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
    if (!control.value) {
      return null;
    }

    const value = new String(control.value).trim();

    if (value.length < 10) return { minlength: true };
    if (value.length > 10) return { maxlength: true };
    return null;
  }

  submitForm() {
    this.formGroup.markAllAsTouched()
  }
}
