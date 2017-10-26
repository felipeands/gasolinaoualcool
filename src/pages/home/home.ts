import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public eth: number;
  public gas: number;
  public best: string;
  public isDisplayResult: boolean;

  constructor() { }

  onClickCalc() {
    this.isDisplayResult = true;
    this.best = (this.gas * 0.7 <= this.eth) 
    ? 'Gasolina'
    : 'Etanol';
  }

  onClickReset() {
    this.isDisplayResult = false;
  }

}
