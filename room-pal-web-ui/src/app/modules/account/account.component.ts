import { Component, inject, OnInit, TemplateRef } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { ThemeService } from '../../shared/services/theme.service'
import { AsyncPipe, JsonPipe } from '@angular/common'
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe, JsonPipe],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  themeService = inject(ThemeService)
}
