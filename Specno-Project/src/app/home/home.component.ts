import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Player1 } from '../player1';
import { Player2 } from '../player2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myForm!: FormGroup;

  nameP1FormControl = new FormControl('');
  nameP2FormControl = new FormControl('');


  player1!: Player1
  player2!: Player2

  constructor(public router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {

    this.myForm = this.fb.group({
      nameP1FormControl: new FormControl(),
      nameP2FormControl: new FormControl()
    })

    this.player1 = new Player1('', 0);
    this.player2 = new Player2('', 0);

    this.refreshForm()
  }

  refreshForm(){
    this.player1 = {
      name: '',
      score: 0,
    }

    this.player2 = {
      name: '',
      score: 0,
    }
  }

  onSubmit(){
    this.player1["name"] = this.player1.name;
    this.player2["name"] = this.player2.name;

    this.router.navigate(['/play-game']);

    sessionStorage.player1 = JSON.stringify(this.player1.name);
    sessionStorage.player2 = JSON.stringify(this.player2.name);
  }

  onStart(){
    this.router.navigate(['/play-game']);
  }

}
