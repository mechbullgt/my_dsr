import { Component, OnInit } from '@angular/core';

// Injecting Service
import { IssueService } from '../../issue.service';
import { Router } from '@angular/router';

// Import for MatTable Data Source
import { MatTableDataSource } from '@angular/material';
import { Issue } from '../../issue.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

// List Component Class
export class ListComponent implements OnInit {

  issues: Issue[];
  displayedColumns = [
    'title',
    'responsible',
    'description',
    'severity',
    'status'
  ]

  constructor(
    private issueService: IssueService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("Fetching Issues!");
    this.fetchIssues();
  }

  fetchIssues() {
    this.issueService.getIssues()
      .subscribe((data: Issue[]) => {
        this.issues = data;
        console.log('Data Requested...');
        console.log('Data'+this.issues);
      });
  }

  editIssue(id){
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id){
    this.issueService.deleteIssue(id)
    .subscribe(()=>{
      this.fetchIssues();
    });
  }

}
