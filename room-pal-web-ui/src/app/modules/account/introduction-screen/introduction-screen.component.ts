import { Component } from '@angular/core';

@Component({
  selector: 'app-introduction-screen',
  standalone: true,
  imports: [],
  templateUrl: './introduction-screen.component.html',
  styleUrl: './introduction-screen.component.scss'
})
export class IntroductionScreenComponent {
  onNextClick() {
    console.log('Next button clicked');
  }
}
