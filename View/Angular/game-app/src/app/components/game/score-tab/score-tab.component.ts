import { Component, OnInit } from '@angular/core';
import { ScoreService, Score} from 'src/app/services/score.service';

@Component({
  selector: 'app-score-tab',
  templateUrl: './score-tab.component.html',
  styleUrls: ['./score-tab.component.css']
})
export class ScoreTabComponent implements OnInit {
  scoreList : Array<Score> = [];
  scoreSortOrder : string = "asc";

  constructor(public scoreService : ScoreService) { }

  ngOnInit(): void {
    this.updateScoreTableView();
  }

  updateScoreTableView(){
    this.scoreService.getScore().subscribe((data)=>{
      this.scoreService.setScoreList(data);
      console.log(data)
    })
  }

  onScoreSort(){
    console.log(this.scoreSortOrder)
    if(this.scoreSortOrder === "asc"){
      this.scoreList = this.scoreService.getScoreList()
        .sort((a:any, b:any) => parseFloat(a.score) - parseFloat(b.score));
      this.scoreSortOrder  = "desc";
    } else if(this.scoreSortOrder === "desc"){
      this.scoreList = this.scoreService.getScoreList()
        .sort((a:any, b:any) => parseFloat(b.score) - parseFloat(a.score));
      this.scoreSortOrder  = "asc";
    }
    this.scoreService.setScoreList(this.scoreList);
  }

}
