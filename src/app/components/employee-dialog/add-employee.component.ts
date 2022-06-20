import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeesMgntService } from 'src/app/services/employees-mgnt.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public rowData: any,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    private fb: FormBuilder,
    private employeeService: EmployeesMgntService,
    private snackBar: MatSnackBar) { }

  genderList = [
    {genderName: "Male", genderFlag: true},
    {genderName: "Female", genderFlag: false}
  ]

  addEmployeeForm !: FormGroup;
  btnText: string = "Add Employee";
  minDate = this.mindate();

  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.minLength(9)]],
      gender: [true, Validators.required],
      company: ['', Validators.required],
      position: ['', Validators.required]
    })

    if(this.rowData){
      this.btnText = "Update Details"
      this.addEmployeeForm.setValue({
        fullName: this.rowData.fullName,
        email: this.rowData.email,
        dob: this.rowData.dob,
        phone: this.rowData.phone,
        gender: this.rowData.gender,
        company: this.rowData.company,
        position: this.rowData.position
      })
    }
  }

  addEmployee(){
    if(!this.rowData){
      if(this.addEmployeeForm.valid){
        this.employeeService.addEmployeeData(this.addEmployeeForm.value).subscribe({
          next: (res) => {
            console.log(res)
            this.dialogRef.close('saved');
            this.addEmployeeForm.reset();
            this.snackBar.open("Employee Added Successfully...", "Ok");
          },
          error: () => {
            this.snackBar.open("We're Sorry, Error in adding Employee...", "Ok");
          }
        })
      } 
    } else {
      this.updateEmployeeDetails();
    }
  }

  updateEmployeeDetails(){
    this.employeeService.updateEmployeeDetails(this.addEmployeeForm.value, this.rowData.id).subscribe({
      next: (res) => {
        this.snackBar.open("Record updated successfully...", "Ok");
        this.addEmployeeForm.reset();
        this.dialogRef.close("update");
      }, 
      error: (err) => {
        this.snackBar.open("We're Sorry, Error in updating Employee...", "Ok");
      }
    })
  }

  onClose(){
    this.dialogRef.close('Operation cancelled by user');
  }

  mindate(): Date{
    let minDate = new Date();
    minDate.setFullYear(minDate.getFullYear()-18);
    return minDate;
  }

}
