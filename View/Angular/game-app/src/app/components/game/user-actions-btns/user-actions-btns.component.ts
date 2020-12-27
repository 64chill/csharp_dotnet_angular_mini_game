import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';
import { GameComponent } from '../game.component';

@Component({
  selector: 'app-user-actions-btns',
  templateUrl: './user-actions-btns.component.html',
  styleUrls: ['./user-actions-btns.component.css']
})
export class UserActionsBtnsComponent implements OnInit {

  constructor(
    public userService : UserService,
    private router:Router,
    private gameService: GameService,
    private gameComponent : GameComponent
  ) {
    /// none
   }

  ngOnInit(): void {
  
  }

  onUserLogout():void{
    this.userService.logoutUser();
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["/login"]));
  }

  onNewGame(){
    this.gameComponent.startTheGame();
    this.gameService.gameActive = true;
  }
}
