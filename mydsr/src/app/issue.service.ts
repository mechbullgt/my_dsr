import { Injectable } from '@angular/core';

// Import HTTPClient to communicate between frontend and backend.
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// This is the IssueService class which contains the methods that communicate with the back-end
export class IssueService {
  
  uri = 'http://localhost:4000';

  // Constructor
  constructor(private http: HttpClient) { }

  // To GET all the issues.
  getIssues(){
    return this.http.get(`${this.uri}/issues`);
  }

  // To GET an issue by Id.
  getIssueById(id){
    return this.http.get(`${this.uri}/issues/${id}`);
  }

  // To POST an issue
  addIssue(title, responsible, description, severity){
    const issue = {
      title : title,
      responsible: responsible,
      description: description,
      severity: severity
    };
    return this.http.post(`${this.uri}/issues/add`, issue);
  }

  // To UPDATE an issue
  updateIssue(id, title, responsible, description, severity){
    const issue = {
      title:title,
      responsible:responsible,
      description:description,
      severity:severity
    };
    return this.http.post(`${this.uri}/issues/update/$id`,issue);
  }

  // To DEL an issue
  deleteIssue(id){
    return this.http.get(`${this.uri}/issues/delete/${id}`);
  }

}
