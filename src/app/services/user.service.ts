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
  public addUser(userData: any): Observable<any> {
    const userUrl =  `${this.url}users`;

    return this.httpClient.post<any>(userUrl, userData)
  }

  //Update user in the database
  public updateUser(userId: number, userData: any): Observable<any> {
    const updateUrl =  `${this.url}users/${userId}`;

    return this.httpClient.patch<any>(updateUrl, userData);
  }

  //get all ausers from the database
  public getUsers(): Observable<any[]> {
     const usersUrl = `${this.url}users`;

     return this.httpClient.get<any[]>(usersUrl);
  }

  //delete user from the database here
  public deleteUser(userId: number): Observable<any> {
    const deleteUrl = `${this.url}users/${userId}`;

    return this.httpClient.delete<any>(deleteUrl)
  }
  public getRoles(){
    const rolesUrl = `${this.url}roles`
    return this.httpClient.get<any[]>(rolesUrl);
  }

  //Update user status
  public updateUserStatus(userId: number, status: string): Observable<any> {
    const updateUrl = `${this.url}users/${userId}`;

    return this.httpClient.patch<any>(updateUrl, status)
  }

  //add tasks into the database
  public addTasks(taskData: any): Observable<any> {
    const taskUrl = `${this.url}taks`;

    return this.httpClient.post<any>(taskUrl, taskData);
  }
  //get tasks from the database
  public getTasks(): Observable<any[]> {
    const taskUrl = `${this.url}tasks`;

    return this.httpClient.get<any[]>(taskUrl);
  }
  //Update taks in the database
  public updateTask(taskId: number, updateData: any): Observable<any> {
    const updateUrl = `${this.url}tasks/${taskId}`;

    return this.httpClient.patch<any>(updateUrl, updateData);
  }
 
  //Delete task from the database
  public deleteTask(taskId: number): Observable<any> {
    const deleteUrl = `${this.url}taks/${taskId}`;

    return this.httpClient.delete<any>(deleteUrl);
  }
}
