import { Routes } from '@angular/router';

import { LoginComponent }
from './pages/login/login.component';

import { RegisterComponent }
from './pages/register/register.component';

import { ExpensesComponent }
from './pages/expenses/expenses.component';

import { authGuard }
from './guards/auth-guard';

export const routes: Routes = [

  {
    path:'',
    component:LoginComponent
  },

  {
    path:'register',
    component:RegisterComponent
  },

  // 🔐 PROTECTED ROUTES

  {
    path:'expenses',
    component:ExpensesComponent,
    canActivate:[authGuard]
  },

  // 🔁 DEFAULT

  {
    path:'**',
    redirectTo:''
  }

];