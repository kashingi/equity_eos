import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../services/snackbar.service';
import { GolobalConstants } from '../../shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';



@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'status'];
  dataSource: any;
  responseMessage: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;


  constructor(
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private snackbar: SnackbarService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }


  //call get all users function from users service
  getAllUsers() {
    this.ngxService.start();
    this.userService.getUsers().subscribe(
      (resp: any) => {
        console.log(resp);
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.Message) {
          this.responseMessage = error.error?.Message;
        } else {
          this.responseMessage = GolobalConstants.genericError;
        }
        this.snackbar.danger(this.responseMessage, GolobalConstants.error);
      }
    );
  }

  //Add user here
  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    console.log("Clicked : ")
    dialogConfig.data = {
      action: 'Add'
    };
    dialogConfig.width = "850px";
    dialogConfig.enterAnimationDuration = '300ms';
    const dialogRef = this.dialog.open(UserFormComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddProduct.subscribe((response) => {
      this.getAllUsers();
    })
  }

  //Handle edit user here
  handleEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values
    };
    dialogConfig.width = "850px";
    dialogConfig.enterAnimationDuration = '300ms';
    const dialogRef = this.dialog.open(UserFormComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditProduct.subscribe((response) => {
      this.getAllUsers();
    })
  }

  //Change user status
  onChange(status: any, id: any) {
    this.ngxService.start();

    var data = {
      status: status.toString(),
      id: id
    }
    // let userId = data.id;
    // let userStatus = data.status.toString();
    // console.log(userId, userStatus);
    this.userService.updateUserStatus(data.id, data.status).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response?.Message;
        this.snackbar.success("User status updated successfully.", "X");
      }, (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.Message) {
          this.responseMessage = error.error?.Message;
        } else {
          this.responseMessage = GolobalConstants.genericError;
        }
        this.snackbar.danger(this.responseMessage, GolobalConstants.error);
      }
    )
  }


  //apply filter here
  applyfilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
