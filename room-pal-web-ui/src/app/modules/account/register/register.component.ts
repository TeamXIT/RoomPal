import { Component } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms'
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registrationForm: FormGroup<FormType>
  constructor(private readonly _formBuilder: FormBuilder) {
    this.registrationForm = this._formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(6)]],
        mobileNumber: ['', [Validators.required, this.mobileNumberValidator]],
        dateOfBirth: ['', Validators.required],
        gender: ['', Validators.required],
        lookingForRoom: [false],
        lookingForRoomMate: [false],
        preferences: this._formBuilder.group({
          clean: [false],
          pets: [false],
          smoking: [false],
          drinking: [false],
        }),
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
      },
      {
        validators: this.confirmPasswordValidator,
      },
    ) as FormGroup<FormType>
  }

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
