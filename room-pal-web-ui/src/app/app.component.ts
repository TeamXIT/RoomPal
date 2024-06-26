import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemComponent } from './items/item/item.component';
import { LoginComponent } from './modules/account/login/login.component';
import { SetPasswordSuccessComponent } from './modules/account/set-password-success/set-password-success.component';
import { SetPasswordFailureComponent } from './modules/account/set-password-failure/set-password-failure.component';
import { RegisterComponent } from './modules/account/register/register.component';
import { ValidateOtpComponent } from './modules/account/validate-otp/validate-otp.component';
import { SetPasswordComponent } from './modules/account/set-password/set-password.component';
import { HomeComponent } from './modules/account/home/home.component';
import { ForgetPasswordComponent } from './modules/account/forget-password/forget-password.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent,SetPasswordSuccessComponent,SetPasswordFailureComponent,
    RegisterComponent,ValidateOtpComponent,SetPasswordComponent,HomeComponent,ForgetPasswordComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'room-pal-web-ui';

  getRegisterData(event: any) {
    console.log('app component', event);
  }
}
