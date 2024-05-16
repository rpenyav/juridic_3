// import { Component } from '@angular/core';
// import { I18nService } from 'shared-lib';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
// })
// export class AppComponent {
//   constructor(private I18nService: I18nService) {}

//   ngOnInit() {
//     const userLang = localStorage.getItem('userLang') || 'ca';
//     this.I18nService.use(userLang);
//   }
// }

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(http: HttpClient) {
    console.debug('http', http);
  }
}
