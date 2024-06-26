import { Routes } from '@angular/router'

const AccountComponent = () =>
  import('./account.component').then(c => c.AccountComponent)

const ForgetPasswordComponent = () =>
  import('./forget-password/forget-password.component').then(
    c => c.ForgetPasswordComponent
  )

const HomeComponent = () =>
  import('./home/home.component').then(c => c.HomeComponent)

const IntroductionScreenComponent = () =>
  import('./introduction-screen/introduction-screen.component').then(c => c.IntroductionScreenComponent)

const WelcomeScreenComponent = () =>
  import('./welcome-screen/welcome-screen.component').then(c => c.WelcomeScreenComponent)

const LoginComponent = () =>
  import('./login/login.component').then(c => c.LoginComponent)

const RegisterComponent = () =>
  import('./register/register.component').then(c => c.RegisterComponent)

const SetPasswordComponent = () =>
  import('./set-password/set-password.component').then(c => c.SetPasswordComponent)

const SetPasswordFailureComponent = () =>
  import('./set-password-failure/set-password-failure.component').then(
    c => c.SetPasswordFailureComponent
  )

const SetPasswordSuccessComponent = () =>
  import('./set-password-success/set-password-success.component').then(
    c => c.SetPasswordSuccessComponent
  )

const ValidateOtpComponent = () =>
  import('./validate-otp/validate-otp.component').then(c => c.ValidateOtpComponent)

export const routes: Routes = [
  {
    path: '',
    loadComponent: AccountComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', loadComponent: HomeComponent },
      { path: 'welcome-screen', loadComponent: WelcomeScreenComponent },
      { path: 'introduction-screen', loadComponent: IntroductionScreenComponent },
      { path: 'login', loadComponent: LoginComponent },
      { path: 'register', loadComponent: RegisterComponent },
      { path: 'forget-password', loadComponent: ForgetPasswordComponent },
      { path: 'set-password', loadComponent: SetPasswordComponent },
      { path: 'set-password-failure', loadComponent: SetPasswordFailureComponent },
      { path: 'set-password-success', loadComponent: SetPasswordSuccessComponent },
      { path: 'validate-otp', loadComponent: ValidateOtpComponent },
    ],
  },
]
