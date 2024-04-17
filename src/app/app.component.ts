import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'app';
  // loadedFeature = 'recipe';
  // onNavigate(feature: any) {
  //   this.loadedFeature = feature;
  // }

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}
