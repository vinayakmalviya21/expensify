import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { AuthService }
from '../../services/auth.service';

import { MatCardModule }
from '@angular/material/card';

import { MatFormFieldModule }
from '@angular/material/form-field';

import { MatInputModule }
from '@angular/material/input';

import { MatButtonModule }
from '@angular/material/button';

import { MatIconModule }
from '@angular/material/icon';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],

  templateUrl: './register.component.html',

  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerData = {

    name:'',
    email:'',
    password:''

  };

  hidePassword = true;

  constructor(
    private auth:AuthService,
    private router:Router,
    private snackBar:MatSnackBar
  ){}

  register(){

    // ✅ REQUIRED VALIDATION

    if(
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password
    ){

      this.showMessage(
        "All fields are required"
      );

      return;
    }

    // ✅ EMAIL VALIDATION

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(
      !emailRegex.test(
        this.registerData.email
      )
    ){

      this.showMessage(
        "Enter valid email address"
      );

      return;
    }

    // ✅ PASSWORD VALIDATION

    if(
      this.registerData.password.length < 6
    ){

      this.showMessage(
        "Password must be at least 6 characters"
      );

      return;
    }

    // ✅ REGISTER API

    this.auth.register(this.registerData)
      .subscribe({

        next:(res:any)=>{

          this.showMessage(
            "Registration Successful"
          );

          setTimeout(()=>{

            this.router.navigate([
              '/'
            ]);

          },1000);

        },

        error:(err)=>{

          this.showMessage(
            "User already exists"
          );

        }

      });

  }

  // ✅ SNACKBAR

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