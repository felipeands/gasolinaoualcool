import { Component } from '@angular/core';

import { HelperProvider } from './../../providers/helper/helper';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public eth: string;
  public gas: string;
  public bestChoice: string;
  public diference: number;
  public isDisplayResult: boolean;

  constructor(private helperProvider: HelperProvider) { }

  ionViewDidLoad() {
    this.helperProvider.getValues().then((obj) => {
      this.eth = obj.eth;
      this.gas = obj.gas;
    });
  }

  onClickCalc() {
    this.isDisplayResult = true;

    const cleanValues = {
      gas: this.helperProvider.toInt(this.gas),
      eth: this.helperProvider.toInt(this.eth)
    }

    this.helperProvider.saveValues(this.gas, this.eth);
    this.bestChoice = (cleanValues.gas * 0.7 <= cleanValues.eth)
      ? 'Gasolina'
      : 'Etanol';
  }

  onClickReset() {
    this.isDisplayResult = false;
  }

  onGasKeyUp() {
    if (this.gas.length > 0) { this.gas = this.helperProvider.formatCurrency(this.gas); }
  }

  onEthKeyUp() {
    if (this.eth.length > 0) { this.eth = this.helperProvider.formatCurrency(this.eth); }
  }

}
