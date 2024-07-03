import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ])
}
