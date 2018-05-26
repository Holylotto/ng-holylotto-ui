import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { PlayComponent } from './play/play.component';
import { RulesComponent } from './rules/rules.component';
import { GameRecordComponent } from './game-record/game-record.component';
import { DetailRecordComponent } from './detail-record/detail-record.component';
import { TicketsComponent } from './tickets/tickets.component';
import {UtilModule} from './util/util.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'play',
    pathMatch: 'prefix'
  },
  {
    path: 'play',
    component: PlayComponent
  },
  {
    path: 'rules',
    component: RulesComponent
  },
  {
    path: 'gameRecord',
    component: GameRecordComponent
  },
  {
    path: 'detailRecord',
    component: DetailRecordComponent
  },
  {
    path: 'tickets',
    component: TicketsComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    RulesComponent,
    GameRecordComponent,
    DetailRecordComponent,
    TicketsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    UtilModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
