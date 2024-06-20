import { JsonPipe, NgClass } from '@angular/common';
import { Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-item',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgClass],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  registerFormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(16),
      Validators.required,
    ]),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required]),
    age: new FormControl('', [
      Validators.min(18),
      Validators.max(30),
      Validators.required,
    ]),
    phoneNumber: new FormControl('', [
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.required,
    ]),
  });

  registerData = output();

  onSubmit() {
    console.log(this.registerFormGroup.controls);
    // this.registerData.emit(this.registerFormGroup.value as any);
    // console.log(this.registerFormGroup.value);
  }
}
