import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {

    
  heading = 'TaskFlow';
  subheading = 'Add A Task';
  icon = 'pe-7s-plus icon-gradient bg-purple-1 ';   //bg-plum-plate

  constructor() { }

  ngOnInit() {
  }

}
