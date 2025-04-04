import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { ConfirmationComponent } from '../../dialogs/confirmation/confirmation.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  constructor (
    private router: Router,
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    
  }
  //Logout function
  // logout(){
  //   this.router.navigate(['/']);
  //   this.snackbar.success("You logged out successfully.", "X")
  // }

  logout(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Logout',
      confirmation: true
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/']);
      this.snackbar.success("You logged out successfully.", "X")
    })
  }
}
