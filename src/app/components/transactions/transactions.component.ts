import { Component, OnInit } from '@angular/core';
import { SocketService, TransactionsService, AuthService } from '../../services/';
import { TransactionsTableData } from '../../models';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  headData;
  tableData: Array<TransactionsTableData>;
  constructor(
    private socketService: SocketService,
    private transactionsService: TransactionsService,
    private authService: AuthService
  ) {
    this.transactionsService.tableData$.subscribe(tableData => {
      this.tableData = tableData;
    });
    this.transactionsService.headData$.subscribe(headData => {
      this.headData = headData;
    });
    // this.socketService.socket.on('transactions:update', this.onTransactionsUpdate);
  }

  onTransactionsUpdate(data: TransactionsTableData) {
    this.tableData.push(data);
    this.transactionsService.tableData$.next(this.tableData);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.transactionsService.getTransactions(this.authService.user.wallet);
  }
}
