import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface EmployeeModel {
  empId: number;
  name: string;
  contactNo: string;
  emailId: string;
  city: string;
  state: string;
  pinCode: string;
  address: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm: FormGroup;
  employeeList: EmployeeModel[] = [];
  isEdit: boolean = false;
  editIndex: number = -1;

  constructor() {
    this.employeeForm = new FormGroup({
      name: new FormControl(''),
      contactNo: new FormControl(''),
      emailId: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      pinCode: new FormControl(''),
      address: new FormControl(''),
    });

    const data = localStorage.getItem('EmpData');
    if (data) {
      this.employeeList = JSON.parse(data);
    }
  }

  onSave() {
    if (this.isEdit) {
      this.employeeList[this.editIndex] = {
        empId: this.employeeList[this.editIndex].empId,
        ...this.employeeForm.value
      };
      this.isEdit = false;
      this.editIndex = -1;
    } else {
      const newEmp: EmployeeModel = {
        empId: this.employeeList.length + 1,
        ...this.employeeForm.value
      };
      this.employeeList.push(newEmp);
    }
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    this.employeeForm.reset();
  }

  onEdit(index: number) {
    this.employeeForm.patchValue(this.employeeList[index]);
    this.isEdit = true;
    this.editIndex = index;
  }

  onDelete(index: number) {
    this.employeeList.splice(index, 1);
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
  }
}
