import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import {Web3Service} from '../util/web3.service';

declare let require: any;
const lottery_artifacts = require('../../../build/contracts/Lottery.json');

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  accounts: string[];
  LotteHoly: any;

  @ViewChild('box1') box1: ElementRef;
  @ViewChild('box2') box2: ElementRef;
  @ViewChild('box3') box3: ElementRef;
  @ViewChild('box4') box4: ElementRef;
  @ViewChild('box5') box5: ElementRef;

  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @ViewChild('input3') input3: ElementRef;
  @ViewChild('input4') input4: ElementRef;
  @ViewChild('input5') input5: ElementRef;

  @ViewChild('buyButton') buyButton: ElementRef;

  boxActive: any;
  inputActive: any;
  boxClass = 'input-box mr';
  boxActiveClass = 'input-box-active mr';
  nextBox = 2;
  enableTicket = false;
  buyTicket = false;

  constructor(private web3Service: Web3Service) {
    console.log('Constructor: ' + web3Service);
  }

  ngOnInit() {
    this.initialize();

    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    //this.watchAccount();
    this.web3Service.artifactsToContract(lottery_artifacts)
      .then((LotteHolyAbstraction) => {
        this.LotteHoly = LotteHolyAbstraction;
      });

  }

  initialize() {
    this.box1.nativeElement.className = this.boxActiveClass;
    this.boxActive = this.box1.nativeElement;
    this.inputActive = this.input1.nativeElement;
  }

  changeBox(box, input, numberBox) {
    this.nextBox = numberBox + 1;
    this.boxActive.className = this.boxClass;
    box.className = this.boxActiveClass;
    this.boxActive = box;
    this.inputActive = input;
  }

  setValue(value) {
    this.inputActive.textContent = value;
    if (this.nextBox === 6) {
      this.box5.nativeElement.className = this.boxClass;
      this.inputActive = undefined;
    } else {
      this.changeNextBox();
    }
    this.checkBuy();
  }

  async newTicket() {
    try {
      const deployedLotteHoly = await this.LotteHoly.deployed();
      const transaction = await deployedLotteHoly.bet.sendTransaction("1","2","3","4","A", {from: "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef", value: "0.1"});

      if (!transaction) {
        console.log('Transaction failed!');
      } else {
        console.log('Transaction complete!');
      }
    } catch (e) {
      console.log(e);
      //this.setStatus('Error sending coin; see log.');
    }
  }

  checkBuy() {
    if (this.input1.nativeElement.value && this.input2.nativeElement.value
      && this.input3.nativeElement.value && this.input4.nativeElement.value &&
      this.input5.nativeElement.value) {
        this.buyTicket = true;
        this.buyButton.nativeElement.className = 'btn-play';
      } else {
        this.buyButton.nativeElement.className = 'btn-play disabled';
      }
  }

  changeNextBox() {
    switch (this.nextBox) {
      case 2:
        this.changeBox(this.box2.nativeElement, this.input2.nativeElement, 2);
        break;
      case 3:
        this.changeBox(this.box3.nativeElement, this.input3.nativeElement, 3);
        break;
      case 4:
        this.changeBox(this.box4.nativeElement, this.input4.nativeElement, 4);
        break;
      case 5:
        this.changeBox(this.box5.nativeElement, this.input5.nativeElement, 5);
        break;
      default:
        break;
    }
  }
}
