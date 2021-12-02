import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../card.model';
import { Player1 } from '../player1';
import { Player2 } from '../player2';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent implements OnInit {

  isMatch = false;
  player1Turn = true;

  player1score = 0;
  player2score = 0;

  player1name = JSON.parse( sessionStorage.player1);
  player2name = JSON.parse( sessionStorage.player2);

  player1!: Player1
  player2!: Player2

  
  
  constructor(public router: Router) { }


  onRestart(){
    this.router.navigate(['/home']);

  }

  onExit(){

    this.player1.score = this.player1score;
    this.player2.score = this.player2score;

    sessionStorage.player1score = JSON.stringify(this.player1.score);
    sessionStorage.player2score = JSON.stringify(this.player2.score);

    this.router.navigate(['/results']); 
    
  }

  onClick(){
    if (this.isMatch)
    this.isMatch = false;
    else
    this.isMatch = true
  }

  cardImages = [
    '../../assets/img/cards/redddA.png',
    '../../assets/img/cards/reddd2.png',
    '../../assets/img/cards/reddd3.png',
    '../../assets/img/cards/reddd4.png',
    '../../assets/img/cards/reddd5.png',
    '../../assets/img/cards/reddd6.png',
    '../../assets/img/cards/reddd7.png',
    '../../assets/img/cards/reddd8.png',
    '../../assets/img/cards/reddd9.png',
    '../../assets/img/cards/reddd10.png',
    '../../assets/img/cards/redddJ.png',
    '../../assets/img/cards/redddQ.png',
    '../../assets/img/cards/redddK.png',

    '../../assets/img/cards/redddAA.png',
    '../../assets/img/cards/reddd22.png',
    '../../assets/img/cards/reddd33.png',
    '../../assets/img/cards/reddd44.png',
    '../../assets/img/cards/reddd55.png',
    '../../assets/img/cards/reddd66.png',
    '../../assets/img/cards/reddd77.png',
    '../../assets/img/cards/reddd88.png',
    '../../assets/img/cards/reddd99.png',
    '../../assets/img/cards/reddd100.png',
    '../../assets/img/cards/redddJJ.png',
    '../../assets/img/cards/redddQQ.png',
    '../../assets/img/cards/redddKK.png',

    '../../assets/img/cards/blackA.png',
    '../../assets/img/cards/black2.png',
    '../../assets/img/cards/black3.png',
    '../../assets/img/cards/black4.png',
    '../../assets/img/cards/black5.png',
    '../../assets/img/cards/black6.png',
    '../../assets/img/cards/black7.png',
    '../../assets/img/cards/black8.png',
    '../../assets/img/cards/black9.png',
    '../../assets/img/cards/black10.png',
    '../../assets/img/cards/blackJ.png',
    '../../assets/img/cards/blackQ.png',
    '../../assets/img/cards/blackK.png',

    '../../assets/img/cards/blackAA.png',
    '../../assets/img/cards/black22.png',
    '../../assets/img/cards/black33.png',
    '../../assets/img/cards/black44.png',
    '../../assets/img/cards/black55.png',
    '../../assets/img/cards/black66.png',
    '../../assets/img/cards/black77.png',
    '../../assets/img/cards/black88.png',
    '../../assets/img/cards/black99.png',
    '../../assets/img/cards/black100.png',
    '../../assets/img/cards/blackJJ.png',
    '../../assets/img/cards/blackQQ.png',
    '../../assets/img/cards/blackKK.png',

    '../../assets/img/cards/Jokerrr.png',
    '../../assets/img/cards/Jokerr.png',
  ];

  cards: Card[] = [];
  flippedCards: Card[] = [];
  matchedCount = 0;

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  ngOnInit(): void {
    this.setupCards();

    this.player1 = {
      name: '',
      score: 0,
    }

    this.player2 = {
      name: '',
      score: 0,
    }
  }

  setupCards(): void {
    this.cards = [];
    this.cardImages.forEach((image) => {
      const cardData: Card = {
        imageId: image,
        state: 'default'
      };

    this.cards.push({ ...cardData });
    });

    this.cards = this.shuffleArray(this.cards);
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId.substring(0, 29) === cardTwo.imageId.substring(0, 29) ? 'matched' : 'default';

      cardOne.state = cardTwo.state = nextState;

      if (cardOne.state == 'matched'){
        if(this.player1Turn == true){
          this.player1score++;
          this.player1Turn = false;
        }
        else{
          this.player2score++;
          this.player1Turn = true;
        }

        this.isMatch = true;
        setTimeout(() => {
          this.isMatch = false;
        }, 1000);
      }

      else{
        if(this.player1Turn == true){
          this.player1Turn = false;
        }
        else{
          this.player1Turn = true;
        }
      }

      this.flippedCards = [];

    }, 1000);

  }

  hideisMatch(): void{
    this.isMatch = false;
  }


  restart(): void {
    this.matchedCount = 0;
    this.setupCards();
  }
}


