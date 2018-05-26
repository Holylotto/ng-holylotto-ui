import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  rules = false;
  gameRecord = false;
  play = true;
  menu = true;
  back = false;
  myTickets = true;
  title = 'H O L Y L O T T O';
  menuClass = 'col-md-4 menu';
  menuSelectedClass = 'col-md-4 menu selected';
  bodyClass = 'body';

  constructor(private router: Router) {}

  ngOnInit() {
    this.changeSection('play');
  }

  changeSection(section) {
    switch (section) {
      case 'play':
      this.goPlay();
        break;
      case 'rules':
      this.goRules();
        break;
      case 'gameRecord':
      this.goGameRecord();
        break;
      default:
        break;
    }
  }

  goGameRecord() {
    this.play = false;
    this.gameRecord = true;
    this.rules = false;
    this.router.navigate(['gameRecord']);
  }

  goRules() {
    this.play = false;
    this.gameRecord = false;
    this.rules = true;
    this.router.navigate(['rules']);
  }

  goPlay() {
    this.play = true;
    this.gameRecord = false;
    this.rules = false;
    this.router.navigate(['play']);
  }

  goBack() {
    this.back = false;
    this.title = 'H O L Y L O T T O';
    this.myTickets = true;
    this.menu = true;
    this.bodyClass = 'body';
    if (this.play) {
      this.changeSection('play');
    } else if (this.rules) {
      this.changeSection('rules');
    } else if (this.gameRecord) {
      this.changeSection('gameRecord');
    }
  }

  myTicketsSection() {
    this.bodyClass = 'body large';
    this.title = 'M Y  T I C K E T S';
    this.back = true;
    this.myTickets = false;
    this.menu = false;
    this.router.navigate(['tickets']);
  }
}
