import { ComponentFactoryResolver, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

export interface Game {
    id  : number,
    name: string,
    data: string,
  }

@Injectable()
export class GameService {
    private gameEndedFlag : boolean = false;
    public gameActive :boolean = true;

    apiURL: string = "https://localhost:5301/api"; // main API URL

    constructor(private httpClient: HttpClient) {} // via httpclijenta we contact the api

    public getGame() : Observable <any>  { 
        //https://angular.io/guide/observables
        return this.httpClient
                .get(`${this.apiURL}/game`);
    }

    public pushGame(gameObj: any) : Observable <any>  {
        return this.httpClient
        .post(`${this.apiURL}/game`, gameObj)
    }

    public setGameEndedFlag(flag: boolean){
        this.gameEndedFlag = flag;
    }

    public getGameEndedFlag(){
        return this.gameEndedFlag;
    }


    public updateGame(gameObj: Game): Observable <any>{
        return this.httpClient.put(`${this.apiURL}/game`, gameObj);
    }
    public removeGame(id: number): Observable <any>{
        return this.httpClient.delete(`${this.apiURL}/game/${id}`);
    }
    public getAllGames(): Observable <any>{
        return this.httpClient
                .get(`${this.apiURL}/game/all`);
    }
}