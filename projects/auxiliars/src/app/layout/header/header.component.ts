import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  assetsBaseUrl = environment.assetsBaseUrl;
  languages = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
    { code: 'ca', label: 'Català' },
  ];
  selectedLanguage: string = 'ca';

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const pathLang = this.router.url.split('/')[1];
    this.selectedLanguage =
      this.languages.find((lang) => lang.code === pathLang)?.code || 'ca';
    this.translate.use(this.selectedLanguage);
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('userLang', lang);

    const currentRouteSegments = this.router.url.split('/').slice(2);
    const newRoute = ['/', lang, ...currentRouteSegments].join('/');

    // Navegar a la nueva ruta
    this.router.navigateByUrl(newRoute).then((success) => {
      if (success) {
        // Recargar la página para aplicar completamente el cambio de idioma
        window.location.reload();
      } else {
        // Manejar el caso en el que la navegación falló
        console.error('Navigation to new language route failed');
      }
    });
    this.selectedLanguage = lang;
  }

  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Serás desconectado de tu cuenta.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
    }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        this.authService.logout();
      }
    });
  }
}
