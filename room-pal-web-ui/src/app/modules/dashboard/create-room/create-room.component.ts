
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

// 

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


import { JsonPipe, NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, AbstractControl,FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,JsonPipe,NgFor],
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  roomForm: FormGroup=new FormGroup({
    roomName:new FormControl('', Validators.required),
    description:new FormControl('', Validators.required),
    capacity:new FormControl('', [Validators.required, Validators.min(1), Validators.max(7)]),
    whatsappLink:new FormControl('', [Validators.required,Validators.pattern('https?://.+')]),
    telegramLink:new FormControl('', [Validators.required,Validators.pattern('https?://.+')]),
    amenity1:new FormControl(false),
    amenity2:new FormControl(false),
    amenity3:new FormControl(false),
    address:new FormControl('', [Validators.required ]),
    location:new FormControl('', Validators.required),
    roomImages:new FormControl([], Validators.required),
    rent:new FormControl('', [Validators.required]),
    preference1:new FormControl(false),
    preference2:new FormControl(false),
    preference3:new FormControl(false)
  });
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  
   get roomImages(): FormArray {
     return this.roomForm.get('roomImages') as FormArray;
   }

  onSubmit() {
    this.roomForm.markAllAsTouched();
    console.log(this.roomForm.value);
    console.log(this.roomForm.controls);
  }
  
  
}

  
  

