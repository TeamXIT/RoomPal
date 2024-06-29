import { Component,OnInit } from '@angular/core';
import { NgClass,JsonPipe  } from '@angular/common';
import {  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators, } from '@angular/forms';


  @Component({
    selector: 'app-create-room',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, JsonPipe],
    templateUrl: './create-room.component.html',
    styleUrl: './create-room.component.scss',
  })
  export class CreateRoomComponent implements OnInit {

    CreateRoomForm: FormGroup<{
      roomName: FormControl;
      description: FormControl;
      capacity: FormControl;
      whatsappLink: FormControl;
      telegramLink: FormControl;
      amenity1: FormControl;
      amenity2: FormControl;
      amenity3: FormControl;
      amenity4: FormControl;
      amenity5: FormControl;
      address: FormControl;
      location: FormControl;
      roomImages: FormControl;
      rent: FormControl;
      preference1: FormControl;
      preference2: FormControl;
      preference3: FormControl;
      preference4: FormControl;
     
    }> = new FormGroup({
      roomName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('',[Validators.required,Validators.maxLength(500),Validators.minLength(3)] ),
      capacity: new FormControl('', [Validators.required,Validators.min(1),Validators.max(5)]),
      // whatsappLink: new FormControl('', [Validators.required, Validators.pattern('https?://(www\.?)?wa\.me/(?:join|)+[a-zA-Z0-9_-]+')]),
      // telegramLink: new FormControl('', [Validators.required, Validators.pattern('https?://t.me/(?:joinchat|messages|)+[a-zA-Z0-9_-]+')]),
      whatsappLink: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
      telegramLink: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
      amenity1: new FormControl(true),
      amenity2: new FormControl(true),
      amenity3: new FormControl(false),
      amenity4: new FormControl(false),
      amenity5: new FormControl(false),
      address: new FormControl('', Validators.required),
      location: new FormControl('',Validators.required),
      roomImages: new FormControl('', Validators.required),
      rent: new FormControl('', [Validators.required,Validators.minLength(100),Validators.maxLength(50000)]),
      preference1: new FormControl(true),
      preference2: new FormControl(false),
      preference3: new FormControl(false),
      preference4: new FormControl(false)          
  });


  ngOnInit(){
  }

  onSubmit() {
    this.CreateRoomForm.markAllAsTouched();
    console.log(this.CreateRoomForm.value);
    console.log(this.CreateRoomForm.controls);
  
  }

}


























































// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
// @Component({
//     selector:'app-create-room',
//     standalone:true,
//     imports:[ReactiveFormsModule],
//     templateUrl:'./create-room.component.html',
//     styleUrl:'./create-room.component.scss',
// })
// export class CreateRoomComponent{
//     roomForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.roomForm = this.fb.group({
//       roomName: ['', Validators.required],
//       description: ['', Validators.required],
//       capacity: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
//       whatsappLink: ['', [Validators.pattern('https?://.+')]],
//       telegramLink: ['', [Validators.pattern('https?://.+')]],
//       amenity1: [false],
//       amenity2: [false],
//       amenity3: [false],
//       address: ['', Validators.required],
//       location: ['', Validators.required],
//       roomImages: this.fb.array([], Validators.required),
//       rent: ['', [Validators.required, Validators.min(0)]],
//       preference1: [false],
//       preference2: [false],
//       preference3: [false]
//     });
//   }

//   get roomImages(): FormArray {
//     return this.roomForm.get('roomImages') as FormArray;
//   }

//   onSubmit() {
//     if (this.roomForm.valid) {
//       console.log(this.roomForm.value);
//     } else {
//       this.markFormGroupTouched(this.roomForm);
//     }
//   }

//   markFormGroupTouched(formGroup: FormGroup) {
//     Object.values(formGroup.controls).forEach(control => {
//       control.markAsTouched();

//       if (control instanceof FormGroup) {
//         this.markFormGroupTouched(control);
//       }
//     });
//   }

//   onFileChange(event: any) {
//     const files = event.target.files;
//     for (let file of files) {
//       this.roomImages.push(this.fb.control(file));
//     }
//   }
// }