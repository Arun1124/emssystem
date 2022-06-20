
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeesMgntService } from 'src/app/services/employees-mgnt.service';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddEmployeeComponent } from '../employee-dialog/add-employee.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['fullName', 'email', 'phone', 'dob', 'gender', 'company', 'position', 'actionItem'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeesMgntService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getAllEmployees();

    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.fullName.toLowerCase().includes(filter) || data.email.toLowerCase().includes(filter) || data.phone.toString().includes(filter) || data.company.toLowerCase().includes(filter) || data.position.toString().includes(filter);
  };
  }

  getAllEmployees(){
    this.employeeService.getAllEmployees().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
      }, 
      error: (err: any) => {
        this.snackBar.open("Sorry, Error Occured in fetching records, we are working on it, Please try later", "Ok");
        console.error(err);
      },
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEditEmployee(row: any){
    this.dialog.open(AddEmployeeComponent, {
      width: '40%',
      data: row,
    }).afterClosed().subscribe((res) => {
      if(res === 'update'){ 
        this.getAllEmployees(); 
        this.dataSource.filter = "";
      }
    })
  }

  onDeleteEmployee(employee_Id: number){
    this.employeeService.deleteEmployeeDetails(employee_Id).subscribe({
      next: (res) => {
        this.snackBar.open("Employee deleted Successfully...", "Ok");
        this.getAllEmployees();
      }, 
      error: (err) => {
        this.snackBar.open("We're Sorry, Error in deleting Employee, Please try later..", "Ok");
      }
    })
  }
}


