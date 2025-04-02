import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';



@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  constructor (
    private router: Router,
    private snackbar: SnackbarService
  ){}

  ngOnInit(): void {
    
  }
  //Logout function
  logout(){
    this.router.navigate(['/']);
    this.snackbar.success("You logged out successfully.", "X")
  }
}
