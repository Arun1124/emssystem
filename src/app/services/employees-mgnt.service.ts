import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeesMgntService {

  constructor(private http: HttpClient) { }

  addEmployeeData(employeeData: any) {
    return this.http.post<any>(constants.employeesURL, employeeData).pipe(
      catchError(this.errorHandler)
    );
  }

  getAllEmployees() {
    return this.http.get<any>(constants.employeesURL).pipe(
      catchError(this.errorHandler)
    );
  }

  updateEmployeeDetails(employeeDetails: any, employee_Id: number) {
    return this.http.put<any>(constants.employeesURL + "/" + employee_Id, employeeDetails).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteEmployeeDetails(employee_Id: number) {
    return this.http.delete<any>(constants.employeesURL + "/" + employee_Id).pipe(
      catchError(this.errorHandler)
    );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }

  errorHandler = (error: any) => {
    let errorMsg: string;
    if (error.error instanceof ErrorEvent) {
        errorMsg = `Error: ${error.error.message}`;
    } else {
        errorMsg = this.getServerErrorMessage(error);
    }
    return throwError(() => errorMsg);
}
}
