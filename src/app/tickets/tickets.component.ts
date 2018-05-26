import { AppComponent } from './../app.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  active = true;
  played = false;
  rows = [];

  constructor(private home: AppComponent) { }

  ngOnInit() {
    this.initRows();
  }

selectActive() {
  this.active = true;
  this.played = false;
}
selectPlayed() {
  this.active = false;
  this.played = true;
}
clickRow() {

}
private initRows() {
  for (let i = 0; i < 3; i++) {
    this.rows.push({draw: '#80', date: '27/04/18 18:57', winningCombination: '1 2 3 A F', combination: '1 2 3 A F', won: '0.02 ETH'});
  }
}


}
