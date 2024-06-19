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
  imports: [ReactiveFormsModule],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  registerFormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
  });

  registerData = output();

  onSubmit() {
    this.registerData.emit(this.registerFormGroup.value as any);
    // console.log(this.registerFormGroup.value);
  }
}
