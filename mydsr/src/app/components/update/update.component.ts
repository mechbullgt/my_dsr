import { Component, OnInit } from '@angular/core';

// Injecting service
import {IssueService} from '../../issue.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(
    private issueService: IssueService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
