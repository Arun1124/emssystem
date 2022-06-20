
import { Component, ViewChild} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddEmployeeComponent } from './components/employee-dialog/add-employee.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AD Groups EMS';

  constructor(
    private dialog: MatDialog, 
    ){}

    @ViewChild(DashboardComponent) dashboard !: DashboardComponent;

  addEmployee() {
    this.dialog.open(AddEmployeeComponent, {
      width: '40%'
    }).afterClosed().subscribe((res) => {
      if(res === 'saved'){ this.dashboard.getAllEmployees(); }
    })
  }

  
}
