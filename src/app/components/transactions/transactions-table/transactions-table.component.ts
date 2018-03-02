import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { TransactionsTableData } from '../../../models';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent implements OnInit {
  @Input() tableData: Array<TransactionsTableData>;
  displayedColumns = ['transaction', 'sum', 'date'];
  dataSource;

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
  }
}
