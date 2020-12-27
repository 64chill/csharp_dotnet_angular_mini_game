import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

export interface Score { 
    id: number,
    score: number,
    username: string
  }

@Injectable()
export class ScoreService {
    private scoreList : Array<Score> = [];

    apiURL: string = "https://localhost:5201/api";

    constructor(private httpClient: HttpClient) {}

    public getScore() : Observable <any>  {
        return this.httpClient
                .get(`${this.apiURL}/score`);
    }

    public pushScore(score: number, username:string) : Observable <any>  {
        let scoreObj = {
            score : score,
            username : username,
        }
        return this.httpClient
        .post(`${this.apiURL}/score`, scoreObj)
    }

    public setScoreList( inScoreList : Array<Score>){
        this.scoreList = inScoreList
    }
    public getScoreList(){
        return this.scoreList;
    }
    
}