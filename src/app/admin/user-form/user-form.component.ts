import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GolobalConstants } from '../../shared/global-constants';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';



@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {

  userForm: any = FormGroup;
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  dialogAction: any = "Add";
  action: any = "Add";
  responseMessage: any;
  roles: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GolobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GolobalConstants.emailRegex)]],
      role: [null, [Validators.required, Validators.pattern(GolobalConstants.nameRegex)]],
    });
    if (this.dialogData.action === "Edit") {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.userForm.patchValue(this.dialogData.data);
    };
    this.getUserRoles();
  }

  //Fetch users roles here
  getUserRoles() {
    this.userService.getRoles().subscribe(
      (resp: any) => {
        console.log(resp)
        this.roles = resp;
      },
      (error: any) => {
        console.log(error);
      }
    );
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
    var formData = this.userForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    }

    this.userService.addUser(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.ngxService.stop();
        this.onAddProduct.emit();
        this.snackbar.success("User added successfully.", "X");
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
    var formData = this.userForm.value;
    var userData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    }
    console.log(userId, userData)
    this.userService.updateUser(userId, userData).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditProduct.emit();
        this.responseMessage = response.Message;
        this.snackbar.success("User updated successfully.", "X");
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
