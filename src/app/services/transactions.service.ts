import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TransactionsTableData } from '../models';

@Injectable()
export class TransactionsService {
  tableData$: Subject<Array<TransactionsTableData>> = new Subject();
  fetching: boolean;
  constructor() {}

  getTransactions() {
    if (this.fetching) {
      return;
    }
    this.fetching = true;
    this.tableData$.next([
      {
        transaction: '1Gvc4seXLjyUeVjY9J8tJeM3GFLMWgm8iD',
        sum: 999,
        date: new Date().toLocaleString()
      },
      {
        transaction: '1Gvc4seXLjyUeVjY9J8tJeM3GFLMWgm8iD',
        sum: 999,
        date: new Date().toLocaleString()
      },
      {
        transaction: '1Gvc4seXLjyUeVjY9J8tJeM3GFLMWgm8iD',
        sum: 999,
        date: new Date().toLocaleString()
      },
      {
        transaction: '1Gvc4seXLjyUeVjY9J8tJeM3GFLMWgm8iD',
        sum: 999,
        date: new Date().toLocaleString()
      },
      {
        transaction: '1Gvc4seXLjyUeVjY9J8tJeM3GFLMWgm8iD',
        sum: 999,
        date: new Date().toLocaleString()
      },
      {
        transaction: '1Gvc4seXLjyUeVjY9J8tJeM3GFLMWgm8iD',
        sum: 999,
        date: new Date().toLocaleString()
      },
      {
        transaction: '1Gvc4seXLjyUeVjY9J8tJeM3GFLMWgm8iD',
        sum: 999,
        date: new Date().toLocaleString()
      }
    ]);
    this.fetching = false;
  }
}
