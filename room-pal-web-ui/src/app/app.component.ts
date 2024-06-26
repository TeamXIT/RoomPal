import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './modules/account/login/login.component';
import { RegisterComponent } from './modules/account/register/register.component';
import { SetPasswordComponent } from './modules/account/set-password/set-password.component';
import { ValidateOtpComponent } from './modules/account/validate-otp/validate-otp.component';
import { HomeComponent } from './modules/account/home/home.component';
import { SetPasswordFailureComponent } from './modules/account/set-password-failure/set-password-failure.component';
import { SetPasswordSuccessComponent } from './modules/account/set-password-success/set-password-success.component';
import { ForgetPasswordComponent } from './modules/account/forget-password/forget-password.component';
import { WelcomeScreenComponent } from './modules/account/welcome-screen/welcome-screen.component';
import { IntroductionScreenComponent } from './modules/account/introduction-screen/introduction-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            LoginComponent,
            RegisterComponent,
            ForgetPasswordComponent,
            ValidateOtpComponent,
            HomeComponent,
            SetPasswordFailureComponent,
            SetPasswordSuccessComponent,
            WelcomeScreenComponent,
            IntroductionScreenComponent,
            SetPasswordComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'room-pal-web-ui';
}
