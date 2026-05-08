import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatSnackBar }
  from '@angular/material/snack-bar';

import { MatSnackBarModule }
  from '@angular/material/snack-bar';

import { MatFormFieldModule }
  from '@angular/material/form-field';

import { MatInputModule }
  from '@angular/material/input';

import { MatButtonModule }
  from '@angular/material/button';

import { MatIconModule }
  from '@angular/material/icon';

import { AuthService }
  from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './login.component.html',

  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    email: '',
    password: ''
  };

  errorMessage = '';

  hidePassword = true;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  login() {

    // ✅ REQUIRED VALIDATION
    if (
      !this.loginData.email ||
      !this.loginData.password
    ) {

      this.showMessage(
        "All fields are required"
      );

      return;
    }

    // ✅ EMAIL FORMAT VALIDATION
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        this.loginData.email
      )
    ) {

      this.showMessage(
        "Enter valid email address"
      );

      return;
    }

    // ✅ LOGIN API
    this.auth.login(this.loginData)
      .subscribe({

        next: (res: any) => {

          this.auth.saveToken(res.token);

          this.router.navigate([
            '/expenses'
          ]);

        },

        error: (err) => {

          this.showMessage(
            "Invalid email or password"
          );

        }

      });

  }

  showMessage(message:string){

  this.snackBar.open(

    message,

    'Close',

    {
      duration:3000,
      horizontalPosition:'center',
      verticalPosition:'top'
    }

  );

}

}