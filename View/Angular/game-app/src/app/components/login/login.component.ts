import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';

//we call the function that is found within index.html at the bottom
declare const sendMessageUserModal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usr: string = ''; //  binding with input field value
  pwd: string = '';//  binding with input field value

  constructor(private userService : UserService, private router:Router, private gameService: GameService) {
    if(userService.getLoggedinUser().id != -1){
      //if user is loggedin reddirect to the GAME page
      // -1 is default meaning - no user loggedin
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["/game"]));
    } else {
      this.gameService.gameActive = false;
    }
   }

  ngOnInit(): void {
  }
  onLogin(): void {
    this.userService.loginUser(this.usr, this.pwd).subscribe((data)=>{
      this.onApiLoginOrRegisterActionResult(data)
    }, (err)=>{ this.onApiLoginOrRegisterActionResult("password or username is incorrect!") });
  }
  onRegister(): void {

    this.userService.createNewUser(this.usr, this.pwd,"user").subscribe((data)=>{
      this.onApiLoginOrRegisterActionResult(data)
    }, (err)=>{ this.onApiLoginOrRegisterActionResult("chosen username is taken!") });
    
  }

  onApiLoginOrRegisterActionResult(res:any){
    if(res instanceof Object){
      // res can be text or Object...
      this.userService.setActiveUser({           
        id         : res.id,       
        username   : res.username,       
        role       : res.role,
    });
      this.router.navigate(["/game"]);//);
    } else{
      sendMessageUserModal(res); // if res = string send message to the user...
    }
  }
  onSubmit(){
    //empty....
    return;
  }
}
