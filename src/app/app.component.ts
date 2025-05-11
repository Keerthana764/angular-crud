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
  title = 'CRUD'; // for testing
  employeeForm: FormGroup;
  employeeList: EmployeeModel[] = [];
  isEdit: boolean = false;
  currentEmpId: number | null = null;

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
    const newEmp: EmployeeModel = {
      empId: this.employeeList.length > 0
        ? Math.max(...this.employeeList.map(emp => emp.empId)) + 1
        : 1,
      ...this.employeeForm.value,
    };

    this.employeeList.push(newEmp);
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));

    fetch('http://localhost:3000/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmp)
    })
      .then(res => res.json())
      .then(data => console.log('Saved to server:', data))
      .catch(err => console.error('Save error:', err));

    this.employeeForm.reset();
  }

  onEdit(index: number) {
    const emp = this.employeeList[index];
    this.employeeForm.patchValue(emp);
    this.isEdit = true;
    this.currentEmpId = emp.empId;
  }

onUpdate() {
    if (this.currentEmpId === null) return;

    const updatedEmp: EmployeeModel = {
      empId: this.currentEmpId,
      ...this.employeeForm.value,
    };

    // Find the employee in the list using the currentEmpId
    const index = this.employeeList.findIndex(emp => emp.empId === this.currentEmpId);
    if (index !== -1) {
      // Update the existing employee object at the found index with new values
      this.employeeList[index] = updatedEmp;

      // Save the updated employee list to localStorage
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    }

    // Reset the form and UI state
    this.employeeForm.reset();
    this.isEdit = false;
    this.currentEmpId = null;

  }

  onDelete(index: number) {
    this.employeeList.splice(index, 1);
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
  }
}
