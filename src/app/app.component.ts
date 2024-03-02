import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  menuMode = 'static';

  lightMenu = true;

  theme = 'grey';

  inputStyle = 'outlined';

  ripple: boolean;

  constructor(private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
      this.primengConfig.ripple = true;
      this.ripple = true;
  }
}
