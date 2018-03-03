import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TransactionsTableData } from '../models';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
const greenArrow = require('../../assets/arrow_right_green.png');
const redArrow = require('../../assets/arrow_right_red.png');

@Injectable()
export class TransactionsService {
  headData$: Subject<any> = new Subject();
  tableData$: Subject<Array<TransactionsTableData>> = new Subject();
  fetching: boolean;
  constructor(private http: HttpClient) {}

  getTransactions(wallet: string) {
    if (this.fetching) {
      return;
    }
    this.fetching = true;
    this.http
      .get(`http://cors.hyoo.ru/https://blockchain.info/address/${wallet}?format=json`)
      .subscribe((data: any) => {
        console.log(data);
        const headData = {
          sum: (data.total_received - data.total_sent) / 100000000,
          date: new Date().toLocaleString(),
          address: wallet
        };
        const tableData = data.txs.map(transaction => {
          const out = transaction.out.filter(trx => trx.addr === wallet);
          const input = transaction.inputs.filter(trx => trx.prev_out.addr === wallet);
          let isOut;
          let sum;
          if (out.length) {
            isOut = true;
            sum = out[0].value;
          } else {
            isOut = false;
            sum = input[0].prev_out.value;
          }
          return {
            arrow: isOut ? greenArrow : redArrow,
            sum: sum / 100000000,
            transaction: transaction.hash,
            date: new Date(transaction.time).toLocaleString()
          };
        });
        this.tableData$.next(tableData);
        this.headData$.next(headData);
        this.fetching = false;
      });
  }
}
