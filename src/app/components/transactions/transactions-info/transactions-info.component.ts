import { Component, OnInit, Input } from '@angular/core';
import { TransactionsHeadData } from '../../../models';

@Component({
  selector: 'app-transactions-info',
  templateUrl: './transactions-info.component.html',
  styleUrls: ['./transactions-info.component.css']
})
export class TransactionsInfoComponent implements OnInit {
  @Input() data: TransactionsHeadData;

  constructor() {}

  ngOnInit() {}
}
