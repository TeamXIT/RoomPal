


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
CreateRoomForm: any;
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

  
  

