import { ComponentFactoryResolver, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AppComponent } from "../app.component";
import { Observable } from "rxjs";
import { GameService } from "./game.service";

export interface User {
    id         : number;
    username   : string;
    role       : string;
} 

@Injectable()
export class UserService {


    apiURL: string = "https://localhost:5101";
    private activeUser: User = { 
        // we save the data from loggedin user   
        id         : -1,       
        username   : "",       
        role       : ""
    };

    constructor(private httpClient: HttpClient, private gameService: GameService) {}

    public loginUser(usr:string, pwd:string) : Observable <any>  {
        let userObj = {
            username:usr,
            password:pwd
        }
        return this.httpClient
        .post(`${this.apiURL}/login`, userObj);
    }

    public createNewUser(usr:string, pwd:string, role:string) : Observable <any>  {
        let userObj = {
            username:usr,
            password:pwd,
            role:role
        }
        return this.httpClient
        .post(`${this.apiURL}/create`, userObj)
    }
    public logoutUser(){
        this.activeUser = {           
            id         : -1,       
            username   : "",       
            role       : ""
        };
        this.gameService.gameActive = false;
    }
    public getLoggedinUser(){
        return this.activeUser; 
    }

    public setActiveUser(dataUser: User): void{
        this.activeUser = dataUser; 
    }
}