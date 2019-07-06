export interface Task {
    id?:string;
    title: string;
    description: string;
    date: string;
    priority: number;
    allocatedTime:number;
    timeTaken:number;
    inReview:boolean;
    isCompleted:boolean;
  

}
