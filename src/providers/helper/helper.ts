import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class HelperProvider {

  constructor() { }

  saveValues(gas, eth) {
    localStorage.setItem('gas', gas);
    localStorage.setItem('eth', eth);
  }

  getValues(): Promise<any> {
    return new Promise((resolve, reject) => {

      const gas = localStorage.getItem('gas');
      const eth = localStorage.getItem('eth');

      if (gas && eth) {
        resolve({
          gas: gas,
          eth: eth
        });
      } else {
        reject();
      }

    });
  }

  formatCurrency(string: string): string {
    const number = this.toInt(string);
    let tmp = number + '';
    if (tmp.length == 2) {
      tmp = `0,${tmp}`;
    } else {
      tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    }
    if (tmp.length > 6)
      tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

    return tmp;
  }

  toInt(string: string): number {
    return parseInt(string.replace(/[\D]+/g, ''));
  }

}
