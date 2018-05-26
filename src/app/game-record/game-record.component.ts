import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-record',
  templateUrl: './game-record.component.html',
  styleUrls: ['./game-record.component.scss']
})
export class GameRecordComponent implements OnInit {

  rows = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.initRows();
  }

  initRows() {
    for (let i = 0; i < 50; i++) {
      this.rows.push({draw: '#80', date: '27/04/18 18:57', combination: '123AF', jackpot: '0.5 ETH'});
    }
  }

  clickRow() {
    this.router.navigate(['detailRecord']);
  }



}
