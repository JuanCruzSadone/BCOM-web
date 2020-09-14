import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerTransactionService } from 'src/app/services/api/customer-transaction/customer-transaction.service';
import { ICustomerTransaction } from 'src/app/services/api/customer-transaction/customer-transaction.model';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-customer-transaction-list',
  templateUrl: './customer-transaction-list.component.html',
  styleUrls: ['./customer-transaction-list.component.scss']
})
export class CustomerTransactionListComponent implements OnInit {
form: FormGroup;
transaction: ICustomerTransaction;
transactions: ICustomerTransaction[] = [];
showMessage: boolean = false;
message: string;

  constructor(private customerTransactionService : CustomerTransactionService) { }

  ngOnInit() {
    this.createForm();
    this.getTransactions();
  }

  createForm() {
    this.form = this.customerTransactionService.getDateSearchGroup();
  }

  getTransactions() {
    this.customerTransactionService.getAll().subscribe( data => {
      this.transactions = data;
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.search();  
    }
  }

  search() {
    const body = this.form.getRawValue();
    body.dateTo = this.buildDate(body.dateTo);
    body.dateFrom = this.buildDate(body.dateFrom);
    this.customerTransactionService.searchByDate(body).subscribe( data => {
      this.transactions = data;
    });
  }

  buildDate(date) {
    const day = date.slice(0, 2);
    const month = date.slice(2, 4);
    const year = date.slice(4, 8);
    date = `${day}/${month}/${year}`;
    const dateObj = moment(date, "DD/MM/YYYY");
    return dateObj.toDate();
  }

  changeStatusConfirmed(index) {
    const body = this.transactions[index];
    delete body.customer;
    body.transactionStatus = 'Confirmada';
    this.customerTransactionService.update(body.id, body).subscribe( data => {
      this.message = 'El estado se ha actualizado con exito'
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        this.message = '';
      }, 4000);
      this.getTransactions();
    });
  }

  changeStatusFinished(index) {
    const body = this.transactions[index];
    delete body.customer;
    body.transactionStatus = 'Finalizada';
    this.customerTransactionService.update(body.id, body).subscribe( data => {
      this.message = 'El estado se ha actualizado con exito'
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        this.message = '';
      }, 4000);
      this.getTransactions();
    });
  }

}
