import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-task-page',
  templateUrl: './add-task-page.component.html',
  styleUrls: ['./add-task-page.component.sass']
})
export class AddTaskPageComponent implements OnInit {


  
  heading = 'TaskFlow';
  subheading = 'Add A Task';
  icon = 'pe-7s-plus icon-gradient bg-purple-1 ';   //bg-plum-plate


  constructor() { }

  ngOnInit() {
  }

}
