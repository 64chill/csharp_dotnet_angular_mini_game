import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game, GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';
declare const initializeUpdateGameModalVar: any;
declare const updateGameModalShow: any;
declare const sendMessageUserModal: any;

@Component({
  selector: 'app-game-tab-view',
  templateUrl: './game-tab-view.component.html',
  styleUrls: ['./game-tab-view.component.css']
})
export class GameTabViewComponent implements OnInit {
  private gameTableList : Array<any> = [];
  public inputGameData : Array<any> = [];
  public inputNameGameData : string = "";
  public formInputInvalid : boolean = false;
  private inputIDClicked: number = -1;
  private isCreateModalActive : boolean = false;

  setDialogBlank(){

  }

  constructor(
    private userService : UserService,
    private router: Router,
    private gameService : GameService,
  ) {
    if(userService.getLoggedinUser().role != "admin"){
      // user has to be admin in order to access this page,
      // if user is not admin we want to reddirect to a login
      // if user is logged with type user he will be reddirected after to the game
      // otherwise he will need to login/register or close!
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=> 
      this.router.navigate(["/login"])); 
      console.log("not loggedin!")
    }
    this.initEmptyInputUpdateForm(); 
    this.gameService.gameActive = false;
   }

   initEmptyInputUpdateForm(){
     // set all input fields as empty strings..
    this.inputGameData = [];
    for(let i = 0; i < 10;i++){
      this.inputGameData.push({columnOne: "", columnTwo: ""});
    }
   }

   initMainDataTable(){
     //get data from API
    this.gameService.getAllGames().subscribe((e)=>{
      this.gameTableList = e;
      console.log(e)
    },(err)=>{
      sendMessageUserModal("There was an error while loading the data...")
    })
   }

  ngOnInit(): void {
    this.gameService.setGameEndedFlag(true);
    this.initMainDataTable();
    
    initializeUpdateGameModalVar();
  }
  
  onUpdateGameFormSubmit():void{
    if(!this.checkIfFieldsNotEmpty()){
      this.formInputInvalid = true;
      return;
    } else{ this.formInputInvalid = false;}

    let item = {
      id: this.inputIDClicked,
      name: this.inputNameGameData,
      data: JSON.stringify(this.inputGameData)
    }

    this.gameService.updateGame(item).subscribe((e)=>{
      this.onUpdatGameModalClose();
      sendMessageUserModal(`Game changed ${item.id}`);
      this.initMainDataTable();
    },(err)=>{
      this.onUpdatGameModalClose();
      sendMessageUserModal(`Ops... there was an error trying to make a change to the game with id: ${item.id}`);
      this.initEmptyInputUpdateForm();
    });
    
  }

  onUpdatGameModalClose():void{
    updateGameModalShow(false);
    this.inputGameData = [];
    this.formInputInvalid = false;
    this.initEmptyInputUpdateForm();
  }

  onDelete(id:number):void{
    console.log(id)
    this.gameService.removeGame(id).subscribe((e)=>{
      sendMessageUserModal(`Game deleted ${id}`);
      this.initMainDataTable();
    },(err)=>{
      sendMessageUserModal(`Ops... there was an error trying to make delete the game with id: ${id}`);
    });
  }

  onUpdateOpenDialog(item:Game):void{
    this.isCreateModalActive = false;
    updateGameModalShow(true);
    this.inputGameData = JSON.parse(item.data);
    this.inputNameGameData = item.name;
    this.inputIDClicked = item.id;
  }

  getGameTableList(){
    return this.gameTableList;
  }

  checkIfFieldsNotEmpty():boolean{
    let returnBool = true;
    if(this.inputNameGameData.trim() === ""){
      return false;
    }
    this.inputGameData.forEach((e)=>{
      if (e.columnOne.trim() === "" || e.columnTwo.trim() === ""){
        returnBool = false
      }
    });
    return returnBool;
  }

  onCreateNewGame(){
    this.initEmptyInputUpdateForm();
    this.isCreateModalActive = true;
    updateGameModalShow(true);
    this.inputNameGameData = "";
  }

  onCreateNewGameSubmit(){
    if(!this.checkIfFieldsNotEmpty()){
      this.formInputInvalid = true;
      return;
    } else{ this.formInputInvalid = false;}
    this.formInputInvalid = false;

    let item = {
      name: this.inputNameGameData,
      data: JSON.stringify(this.inputGameData)
    }
    this.gameService.pushGame(item).subscribe((data)=>{
      this.onUpdatGameModalClose();
      sendMessageUserModal("New Game Created Success");
      this.initMainDataTable();
    }, (err)=>{
      sendMessageUserModal("Ops... there was an error game could not be created..");
    });

  }
  getIsCreateModalActive():boolean{
    return this.isCreateModalActive;
  }

}
