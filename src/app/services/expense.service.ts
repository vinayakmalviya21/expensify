import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  // private apiUrl = 'http://localhost:8080/expenses';
  private apiUrl = 'https://expensify-backend-qkkm.onrender.com/expenses';

  constructor(private http: HttpClient) {}

  // ✅ GET ALL EXPENSES
  getExpenses(params:any){

  return this.http.get(
    this.apiUrl,
    { params }
  );

}

  // ✅ ADD EXPENSE
  addExpense(data:any){

  return this.http.post(
    this.apiUrl,
    data
  );

}

  // ✅ UPDATE EXPENSE
  updateExpense(id: number, data: any): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      data
    );

  }

  // ✅ DELETE EXPENSE
  deleteExpense(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

  // ✅ FILTER EXPENSES
  filterExpenses(
    category: string,
    start: string,
    end: string,
    userId: number
  ): Observable<any> {

    let params = new HttpParams()
      .set('page', 0)
      .set('size', 10)
      .set('userId', userId);

    if (category) {
      params = params.set('category', category);
    }

    if (start) {
      params = params.set('start', start);
    }

    if (end) {
      params = params.set('end', end);
    }

    return this.http.get(
      this.apiUrl,
      { params }
    );

  }

  // ✅ EXPORT CSV
  exportCSV(expenses: any[]): void {

    const headers = [
      'Amount',
      'Category',
      'Date',
      'Description'
    ];

    const rows = expenses.map(e => [
      e.amount,
      e.category,
      e.date,
      e.description
    ]);

    const csvContent =
      [headers, ...rows]
        .map(e => e.join(','))
        .join('\n');

    const blob = new Blob(
      [csvContent],
      { type: 'text/csv;charset=utf-8;' }
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;

    link.setAttribute(
      'download',
      'expenses.csv'
    );

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  }

}