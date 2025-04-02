import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  //Function to add user into the database
  addUser(userData: any): Observable<any> {
    const userUrl =  `${this.url}users`;

    return this.httpClient.post<any>(userUrl, userData)
  }

  //get all ausers from the database
  getUsers(): Observable<any[]> {
     const usersUrl = `${this.url}users`;

     return this.httpClient.get<any[]>(usersUrl);
  }

  getRoles(){
    const rolesUrl = `${this.url}roles`
    return this.httpClient.get<any[]>(rolesUrl);
  }

  //Update user status
  updateUserStatus(userId: number, status: string): Observable<any> {
    const updateUrl = `${this.url}users/${userId}`;

    return this.httpClient.patch<any>(updateUrl, status)
  }
 
}
