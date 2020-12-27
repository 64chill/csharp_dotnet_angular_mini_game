import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { ScoreService } from 'src/app/services/score.service';
import { UserService } from 'src/app/services/user.service';
import { ScoreTabComponent } from './score-tab/score-tab.component';
declare const sendMessageUserModal: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  timerTxt : string = "Loading..."; // view number of seconds left
  timerHeight : number = 100; // % seconds left, used for the visual timer
  numOfTries : number = 0; // when it is 10 game over
  scoreNum : number = 0; // num of correct answers
  serverData : any = []; // data we fetch from server
  flagSelectedItems = { // we save selected fields here for easier access
    one: "",
    two: ""
  }
  interval : any = undefined;

  constructor(public userService : UserService,
     public gameService : GameService, 
     private router:Router, 
     private scoreService: ScoreService, 
     private scoreTabComponent : ScoreTabComponent) {
    if(userService.getLoggedinUser().id === -1){
      // user must be logged to access this page
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["/login"]));
    }
    this.serverData = [];
  }

  ngOnInit(): void {
   
  
  } //ngOnInit end;

  shuffleArray(array:Array<any>) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));         
        var temp = array[i]; 
        array[i] = array[j]; 
        array[j] = temp; 
    }
    return array;
}

  onColumnOneClick(item:string, pointerFlag:boolean){
    if(!pointerFlag){return;}
    //for elements in our first column
    if(this.gameService.getGameEndedFlag()){ // if game is over dont enable user to have more moves
      return;
    }
    this.serverData.dataOne.forEach((e:any) =>{ 
      // when one is selected, remove others as being selected
      e.selectedOne = false;
    })
    let foundItem = this.serverData.dataOne.find((elem:any) => { // get the current selected
      return elem.columnOne === item});
    foundItem.selectedOne = true; // set him as selected
    this.flagSelectedItems.one = item; // save the selected one
  }

  onColumnTwoClick(item:string){
    // when element from the seconds - right column is clicked
   
    // check if selected from left 1st
    let foundItem = this.serverData.dataOne.find((elem:any) => {
      return elem.selectedOne === true
    });
    if(!foundItem){return;} // if nobody is selected back
    // user has to select from left column then from the right     

    this.serverData.dataTwo.forEach((e:any) =>{e.selectedTwo = false;})// set all as not selected
    foundItem = this.serverData.dataTwo.find((elem:any) => { 
      // find selected and set as selected
      return elem.columnTwo === item});
    if(foundItem.success){return;} // if field marked as syccess user cant chosse this field
    foundItem.selectedTwo = true;
    this.numOfTries++;
    this.flagSelectedItems.two = item; // save selected
    let isSuccess = this.serverData.data.find((elem:any) => {
      // find if they match
      return elem.columnOne === this.flagSelectedItems.one  
            && elem.columnTwo === this.flagSelectedItems.two
    });
    if(isSuccess){ //if they match
      foundItem.success = true; // they are correct answers
      foundItem.pointer = false; // change the coursor when user hovers
      this.scoreNum++; // ++ SCORE
    }
    this.serverData.dataTwo.forEach((e:any)=>{
      e.selectedOne = false;
      e.selectedTwo = false;
    }) //set all as not selected
    if(this.isNumberOfTriesEqualToTen()){
      this.gameEndedSendScoreResult();
    }
  }

  isNumberOfTriesEqualToTen():boolean{
    // game should end when there is 10 tries
    if(this.numOfTries === 10){
      return true;
    } return false;
  }
  disableClickOnItems():void{
    // disable click animation - coursor
    this.serverData.data.forEach((e:any)=>{
      e.pointer = false;
    });
  }
  gameEndedSendScoreResult(){
    this.gameService.gameActive = true;
    this.gameService.setGameEndedFlag(true); // game over
    sendMessageUserModal("Game Over!")
    this.disableClickOnItems();
    this.scoreService.pushScore( // send score to our API
      // server will save the last score only (logic done server-side)
      this.scoreNum,
      this.userService.getLoggedinUser().username
    ).subscribe((data:any)=>{
      console.log(data)
      this.scoreTabComponent.updateScoreTableView();
    });
  }

  startTheGame(){
    this.gameService.setGameEndedFlag(false);
    this.timerHeight = 100; // %
    try{clearInterval(this.interval);}catch{};

    this.numOfTries= 0; 
    this.scoreNum = 0; 

    // get data from server
    // set 2 new lists as random ->> mix elements on both columns
    this.gameService.getGame().subscribe((data)=>{
      this.serverData.data = JSON.parse(data.data);
      this.serverData.data.forEach((e:any)=>{
        e.pointer = true;
        // so additional class is set to allow the visual coursor effect
        // [ngClass] takes care of this in html component file...
      })
      this.serverData.dataOne = this.shuffleArray(this.serverData.data);
      this.serverData.dataTwo=[]
      Object.keys(this.serverData.dataOne).forEach(key=>this.serverData.dataTwo[key]=this.serverData.dataOne[key]);
      this.serverData.dataTwo = this.shuffleArray(this.serverData.dataTwo);
    
      //set timer.....
      //let timerInMinutes = 2;
      //let timerInSeconds = timerInMinutes * 60000;
      let timerInSeconds = 100000;
      let howManySeconds = timerInSeconds/1000;
      let decreasePerMin = 100/howManySeconds;
      this.timerTxt = `${howManySeconds}`; // timerTxt is shown in html file
      this.interval = setInterval(() => { // interval runs each second
        if(this.gameService.getGameEndedFlag()){clearInterval(this.interval);} // game over - stop interval
        howManySeconds--;
        this.timerTxt = `${howManySeconds}`;
        this.timerHeight -= decreasePerMin; 
        if (this.timerHeight <= 0) { // if % === 0 means game is over, time is up
            clearInterval(this.interval); // stop interval
            this.gameEndedSendScoreResult(); // stop game
        }
    }, 1000);
  });
  }
}
