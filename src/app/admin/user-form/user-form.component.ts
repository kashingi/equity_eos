import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GolobalConstants } from '../../shared/global-constants';
import { UserService } from '../../services/user.service';



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
    private service: UserService
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
    this.service.getRoles().subscribe(
      (resp: any)=>{
        console.log(resp)
        this.roles = resp;
      },
      (error: any)=>{
        console.log(error);
      }
    );
  }

  //Implement your submit action here
  handleSubmit() {}
}
