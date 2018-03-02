import { Component, OnInit } from '@angular/core';
import { SocketService, TransactionsService } from '../../services/';
import {TransactionsTableData} from '../../models';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  headData = {
    address: '1Gvc4seXLjyUeVjY9J8tJeM3GFLMWgm8iD',
    sum: '999',
    date: new Date().toLocaleString()
  };
  tableData: Array<TransactionsTableData>;
  constructor(private socketService: SocketService, private transactionsService: TransactionsService) {
    this.transactionsService.tableData$.subscribe(tableData  => {
      console.log(tableData);
      this.tableData = tableData;
    });
    this.socketService.socket.on('transactions:update', this.onTransactionsUpdate);
  }

  onTransactionsUpdate(data: TransactionsTableData) {
    this.tableData.push(data);
    this.transactionsService.tableData$.next(this.tableData);
  }

  ngOnInit() {
    this.transactionsService.getTransactions();
  }
}
