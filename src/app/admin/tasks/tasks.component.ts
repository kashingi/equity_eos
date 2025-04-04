import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../dialogs/task-form/task-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['id', 'taskName', 'invited', 'date', 'status', 'action'];
  dataSource: any;
  responseMessage: any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;


  constructor(
    private ngxService: NgxUiLoaderService,
    private taskService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getAllTasks();
  }

  //get all tasks from the database
  getAllTasks() {
    this.ngxService.start();
    this.taskService.getTasks().subscribe(
      (resp: any) => {
        this.ngxService.stop();
        console.log("Tasks: ", resp);
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
      }
    );
  }

  //handle add action here
  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    console.log("Clicked : ")
    dialogConfig.data = {
      action: 'Add'
    };
    dialogConfig.width = "850px";
    dialogConfig.enterAnimationDuration = '300ms';
    const dialogRef = this.dialog.open(TaskFormComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddProduct.subscribe((response) => {
      this.getAllTasks();
    })
  }

  //Handle edit action here
  handleEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values
    };
    dialogConfig.width = "850px";
    dialogConfig.enterAnimationDuration = '300ms';
    const dialogRef = this.dialog.open(TaskFormComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditProduct.subscribe((response) => {
      this.getAllTasks();
    })
  }

  //Handle delete action here
  handleDeleteAction(values: any) { }

  //Implement delete method here
  deleteUser(id: any) { }

  //apply filter here
  applyfilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
