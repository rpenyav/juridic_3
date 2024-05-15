import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
        },
        error: (error) => {
          console.error('Login failed', error);
          // Maneja el error de login aquí
        },
      });
    }
  }
}
