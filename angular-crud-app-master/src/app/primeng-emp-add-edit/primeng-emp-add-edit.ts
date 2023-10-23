import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-primeng-emp-add-edit',
  templateUrl: './primeng-emp-add-edit.html',
  styleUrls: ['./primeng.emp-add-edit.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    'Liceu',
    'Facultate',
    'Master',
  ];

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.empForm = fb.group({
      firstName: '',
      email: '',
      position: '',
    });
  }

  ngOnInit(): void {
    if (this.config.data) {
      this.empForm.patchValue(this.config.data);
    }
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.config.data) {
        this.empService.updateEmployee(this.config.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
          
            this.ref.close(true);
          },
          error: (err: any) => {
           
            console.error(err);
          },
        });
      } else {
        this.empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
          
            this.ref.close(true);
          },
          error: (err: any) => {
          
            console.error(err);
          },
        });
      }
    }
  }
}
