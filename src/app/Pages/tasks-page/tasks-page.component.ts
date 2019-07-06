import { AuthService } from './../../services/auth.service';
import { Task } from './../../models/task';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.sass']
})
export class TasksPageComponent implements OnInit {

  tasksCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;

  items =[];


  timerRunning = false;

  timeLeft: any;
  userr: User;

  allocatedTime: any;
  timeElapsedSeconds = 0; //in seconds
  timeElapsedMinutes = 0; //the mins
  currentIndex:any;

  reviewSubmitToast = false;

  postsRef:any;
  post$:any;

 
  interval;

  heading = 'TaskFlow';
  subheading = 'Your Tasks';
  icon = 'pe-7s-diamond icon-gradient bg-purple-1 ';   //bg-plum-plate

  constructor( private afs: AngularFirestore, public authService: AuthService) { 

    this.authService.user.subscribe(user => this.userr = user)
    console.log(authService.getCurrentUser  , 'this user') ;
  }

  ngOnInit() {

 
//initalize tasks collection
// this.tasksCollection = this.afs.collection('tasks', q => q.orderBy('priority', 'desc')); //reference
//this.tasks = this.tasksCollection.valueChanges(); //observable of task data

this.postsRef = this.afs.collection('tasks', s => s.orderBy('priority', 'desc')).snapshotChanges().subscribe(data => {
  this.items = [];
  data.forEach(a => {
    let item: any = a.payload.doc.data();
    item.id = a.payload.doc.id;
    this.items.push(item);
  });
});






  }




  startTimer(item,index){

    this.currentIndex = index;

  
    this.timerRunning = true;
    this.timeLeft = item.allocatedTime * 60; //change mins to secs for the timer

    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.timeElapsedSeconds++;

        if(this.timeElapsedSeconds >= 60){
          this.timeElapsedMinutes++;
          this.timeElapsedSeconds = 0;
        }


      } else {
        this.timeLeft = item.allocatedTime * 60; //change mins to secs for the timer;
      }
    },1000)

  }

  stopTimer(item){

    this.timerRunning = false;
    clearInterval(this.interval);
    
    this.timeElapsedMinutes+= this.timeElapsedSeconds/60;
    //save time to firebase
    this.updateTime(item);

    

    this.timeElapsedSeconds = 0;
    this.timeElapsedMinutes = 0;

  }

  updateTime(item){

    let newTime = item.timeTaken + this.timeElapsedMinutes;

    this.afs.doc(`tasks/${item.id}`).update({
      timeTaken: newTime,
    })

  }

  submitForReview(item){



    this.afs.doc(`tasks/${item.id}`).update({
      inReview: true,
    });

  


  }

  cancelReview(item){
    this.afs.doc(`tasks/${item.id}`).update({
      inReview: false,
    })
  }

}
