import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
    selector:'app-create-room',
    standalone:true,
    imports:[ReactiveFormsModule],
    templateUrl:'./create-room.component.html',
    styleUrl:'./create-room.component.scss',
})
export class CreateRoomComponent{
    roomForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.roomForm = this.fb.group({
      roomName: ['', Validators.required],
      description: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      whatsappLink: ['', [Validators.pattern('https?://.+')]],
      telegramLink: ['', [Validators.pattern('https?://.+')]],
      amenity1: [false],
      amenity2: [false],
      amenity3: [false],
      address: ['', Validators.required],
      location: ['', Validators.required],
      roomImages: this.fb.array([], Validators.required),
      rent: ['', [Validators.required, Validators.min(0)]],
      preference1: [false],
      preference2: [false],
      preference3: [false]
    });
  }

  get roomImages(): FormArray {
    return this.roomForm.get('roomImages') as FormArray;
  }

  onSubmit() {
    if (this.roomForm.valid) {
      console.log(this.roomForm.value);
    } else {
      this.markFormGroupTouched(this.roomForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    for (let file of files) {
      this.roomImages.push(this.fb.control(file));
    }
  }
}