import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { GolobalConstants } from '../../shared/global-constants';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit{

  taskForm: any = FormGroup;
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  dialogAction: any = "Add";
  action: any = "Add";
  responseMessage: any;

  statuses = [
    { name: "Pending" },
    { name: "Completed" }
  ]

  constructor (
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      taskName: [null, [Validators.required, Validators.pattern(GolobalConstants.nameRegex)]],
      invited: [null, [Validators.required]],
      date: [null, [Validators.required]],
      status: [null, [Validators.required, Validators.pattern(GolobalConstants.nameRegex)]]
    });
    if (this.dialogData.action === "Edit") {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.taskForm.patchValue(this.dialogData.data);
    };
    
  }

  //Implement your submit action here
  handleSubmit() {
    if (this.dialogAction === "Edit") {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    this.ngxService.start();
    var formData = this.taskForm.value;
    var taskData = {
      taskName: formData.name,
      invited: formData.email,
      date: formData.role,
      status: formData.status
    }

    this.userService.addTasks(taskData).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.ngxService.stop();
        this.onAddProduct.emit();
        this.snackbar.success("Task added successfully.", "X");
      },
      (error) => {
        console.log(error);
        this.ngxService.stop();
        if (error.error?.error) {
          this.responseMessage = error.error?.Message;
        } else {
          this.responseMessage = GolobalConstants.genericError;
        }
        this.snackbar.danger(this.responseMessage, GolobalConstants.error);
      }
    )
  }

  edit() {
    var userId = this.dialogData.data.id;
    var formData = this.taskForm.value;
    var updateData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    }
    console.log(userId, updateData)
    this.userService.updateUser(userId, updateData).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditProduct.emit();
        this.responseMessage = response.Message;
        this.snackbar.success("Task updated successfully.", "X");
      }, 
      (error) => {
        console.log(error);
        if (error.error?.error) {
          this.responseMessage = error.error?.Message;
        } else {
          this.responseMessage = GolobalConstants.genericError;
        }
        this.snackbar.danger(this.responseMessage, GolobalConstants.error);
      }
    )
  }
}
