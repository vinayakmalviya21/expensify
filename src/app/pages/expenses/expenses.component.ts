import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ExpenseService }
  from '../../services/expense.service';

import { NavbarComponent }
  from '../../shared/navbar/navbar.component';

import { MatCardModule }
  from '@angular/material/card';

import { MatFormFieldModule }
  from '@angular/material/form-field';

import { MatInputModule }
  from '@angular/material/input';

import { MatButtonModule }
  from '@angular/material/button';

import { MatTableModule }
  from '@angular/material/table';

import { MatIconModule }
  from '@angular/material/icon';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import {
  MatDatepickerModule
} from '@angular/material/datepicker';

import {
  MatNativeDateModule
} from '@angular/material/core';


@Component({
  selector: 'app-expenses',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],

  templateUrl: './expenses.component.html',

  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent
  implements OnInit {

  // ✅ TABLE DATA

  expenses: any[] = [];

  filteredExpenses: any[] = [];

  // ✅ EDIT MODE

  editingId: number | null = null;

  // ✅ FILTER

  filterCategory = '';

  // ✅ TABLE COLUMNS

  displayedColumns: string[] = [
    'category',
    'amount',
    'date',
    'description',
    'actions'
  ];

  // ✅ FORM DATA

  expenseData: any = {

    amount: '',
    category: '',
    date: '',
    description: ''

  };

  constructor(
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.loadExpenses();

  }

  // =========================
  // LOAD EXPENSES
  // =========================

  loadExpenses() {

    const params = {

      page: 0,
      size: 50

    };

    this.expenseService
      .getExpenses(params)
      .subscribe({

        next: (res: any) => {

          // ✅ completely new reference

          this.expenses =
            [...(res.content || [])];

          this.filteredExpenses =
            [...this.expenses];

          // ✅ force UI update

          this.cdr.detectChanges();

        },

        error: () => {

          this.showMessage(
            "Failed to load expenses"
          );

        }

      });

  }

  // =========================
  // FILTER
  // =========================

  applyFilter() {

    if (!this.filterCategory) {

      this.filteredExpenses =
        [...this.expenses];

      return;
    }

    this.filteredExpenses =
      this.expenses.filter(e =>

        e.category
          .toLowerCase()
          .includes(
            this.filterCategory.toLowerCase()
          )

      );

  }

  // =========================
  // ADD EXPENSE
  // =========================

  addExpense() {

    // REQUIRED VALIDATION

    if (
      !this.expenseData.amount ||
      !this.expenseData.category ||
      !this.expenseData.date
    ) {

      this.showMessage(
        "Please fill required fields"
      );

      return;
    }

    // NEGATIVE VALIDATION

    if (this.expenseData.amount <= 0) {

      this.showMessage(
        "Amount must be greater than 0"
      );

      return;
    }

    this.expenseService
      .addExpense(this.expenseData)
      .subscribe({

        next: () => {

          this.showMessage(
            "Expense Added"
          );

          this.resetForm();

          // ✅ reload latest data

          this.loadExpenses();

        },

        error: () => {

          this.showMessage(
            "Failed to add expense"
          );

        }

      });

  }

  // =========================
  // EDIT
  // =========================

  editExpense(exp: any) {

    this.editingId = exp.id;

    this.expenseData = {

      amount: exp.amount,
      category: exp.category,
      date: new Date(exp.date),
      description: exp.description

    };

    // SCROLL TO TOP

    window.scrollTo({

      top: 0,
      behavior: 'smooth'

    });

  }

  // =========================
  // UPDATE
  // =========================

  updateExpense() {

    if (!this.editingId) {

      return;

    }

    // VALIDATION

    if (
      !this.expenseData.amount ||
      !this.expenseData.category ||
      !this.expenseData.date
    ) {

      this.showMessage(
        "Please fill required fields"
      );

      return;
    }

    if (this.expenseData.amount <= 0) {

      this.showMessage(
        "Amount must be greater than 0"
      );

      return;
    }

    this.expenseService
      .updateExpense(
        this.editingId,
        this.expenseData
      )
      .subscribe({

        next: () => {

          this.showMessage(
            "Expense Updated"
          );

          this.resetForm();

          this.loadExpenses();

        },

        error: () => {

          this.showMessage(
            "Update Failed"
          );

        }

      });

  }

  // =========================
  // DELETE
  // =========================

  deleteExpense(id: number) {

    const confirmDelete =
      confirm(
        "Are you sure you want to delete?"
      );

    if (!confirmDelete) {

      return;

    }

    this.expenseService
      .deleteExpense(id)
      .subscribe({

        next: () => {

          this.showMessage(
            "Expense Deleted"
          );

          this.loadExpenses();

        },

        error: () => {

          this.showMessage(
            "Delete Failed"
          );

        }

      });

  }

  // =========================
  // RESET FORM
  // =========================

  resetForm() {

    this.editingId = null;

    this.expenseData = {

      amount: null,
      category: '',
      date: null,
      description: ''

    };

  }

  // =========================
  // SNACKBAR
  // =========================

  showMessage(message: string) {

    this.snackBar.open(

      message,

      'Close',

      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      }

    );

  }

}