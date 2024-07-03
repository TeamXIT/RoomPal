import { Component } from '@angular/core'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { RouterLink } from '@angular/router'
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registrationForm: FormGroup<FormType> = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      mobileNumber: new FormControl('', [
        Validators.required,
        this.mobileNumberValidator,
      ]),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      lookingForRoom: new FormControl(false),
      lookingForRoomMate: new FormControl(false),
      preferences: new FormGroup({
        clean: new FormControl(false),
        pets: new FormControl(false),
        smoking: new FormControl(''),
        drinking: new FormControl(''),
      }),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl(''),
    },
    {
      validators: this.confirmPasswordValidator as ValidatorFn,
    },
  ) as FormGroup

  confirmPasswordValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.controls['password']
    const confirmPasswordControl = formGroup.controls['confirmPassword']
    if (passwordControl.value !== confirmPasswordControl.value)
      formGroup.controls['confirmPassword'].setErrors({
        invalid: true,
      })
    else formGroup.controls['confirmPassword'].setErrors(null)
  }

  mobileNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = new String(control.value).trim()
    if (!value) {
      return null
    }
    if (value.length < 10) return { minlength: true }
    if (value.length > 10) return { maxlength: true }
    return null
  }

  onSubmit() {
    this.registrationForm.markAllAsTouched()
  }
}

type FormType = {
  name: FormControl<string>
  mobileNumber: FormControl
  dateOfBirth: FormControl
  gender: FormControl
  lookingForRoomMate: FormControl<boolean>
  lookingForRoom: FormControl<boolean>
  preferences: FormGroup<PreferencesType>
  password: FormControl
  confirmPassword: FormControl
}

type PreferencesType = {
  clean: FormControl<boolean>
  pets: FormControl<boolean>
  smoking: FormControl<boolean>
  drinking: FormControl<boolean>
}
