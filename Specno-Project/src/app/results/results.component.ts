import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player1 } from '../player1';
import { Player2 } from '../player2';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  
  player1name = JSON.parse( sessionStorage.player1);
  player2name = JSON.parse( sessionStorage.player2);

  player1score = sessionStorage.player1score;
  player2score = sessionStorage.player2score;

  winnerP1 = true;
  num = 1;

  constructor(public router: Router) { }

  ngOnInit(): void {

    if(this.player2score > this.player1score){
      this.winnerP1 = false;    
      this.num = 2
    }
    else{
      this.winnerP1 = true;
      this.num = 1
    }
  }

  onRestart(){
    this.router.navigate(['/home']);
  }

}
