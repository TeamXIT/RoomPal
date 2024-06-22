import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemComponent } from './items/item/item.component';
import { LoginComponent } from './modules/account/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, ItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'room-pal-web-ui';

  getRegisterData(event: any) {
    console.log('app component', event);
  }
}
