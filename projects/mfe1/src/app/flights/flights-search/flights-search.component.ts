import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'projects/authentication/src/app/authentication.service';

@Component({
  selector: 'app-flights-search',
  templateUrl: './flights-search.component.html',
})
export class FlightsSearchComponent implements OnDestroy {
  private subscription: Subscription;

  constructor(private authService: AuthenticationService) {
    // Suscribirse al Observable currentUsername para obtener el valor actual
    this.subscription = this.authService.currentUsername.subscribe(
      (username) => {
        console.log('User Name:', username);
      }
    );
  }

  // Implementa la interfaz OnDestroy para desuscribirte y evitar fugas de memoria
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
