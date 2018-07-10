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
  public difference: number = 0;
  public differenceQuantity: number = 0;
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

    cleanValues.gas = cleanValues.gas * 0.7;

    this.helperProvider.saveValues(this.gas, this.eth);

      if (cleanValues.gas <= cleanValues.eth) {

        this.difference = (cleanValues.eth - cleanValues.gas) / cleanValues.gas * 100; 
        this.bestChoice = 'Gasolina';

      } else {

        this.difference = (cleanValues.gas - cleanValues.eth) / cleanValues.eth * 100; 
        this.bestChoice = 'Etanol';

      }

      this.difference = Math.round(this.difference);
      this.differenceQuantity = (this.difference * 44) / 100;
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
