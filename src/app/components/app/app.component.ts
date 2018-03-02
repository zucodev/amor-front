import { Component } from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  autorized: boolean;
  constructor(private authService: AuthService) {
    authService.autorized$.subscribe(autorized => {
      this.autorized = autorized;
    });
  }
}
