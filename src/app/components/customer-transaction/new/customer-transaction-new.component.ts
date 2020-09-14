import { Component, OnInit } from '@angular/core';
import { CustomerTransactionService } from 'src/app/services/api/customer-transaction/customer-transaction.service';
import { FormGroup } from '@angular/forms';
import { ICustomer } from 'src/app/services/api/customer/customer.model';
import { CustomerService } from 'src/app/services/api/customer/customer.service';
import { ICustomerTransaction } from 'src/app/services/api/customer-transaction/customer-transaction.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-transaction-new',
  templateUrl: './customer-transaction-new.component.html',
  styleUrls: ['./customer-transaction-new.component.scss']
})
export class CustomerTransactionNewComponent implements OnInit {
form: FormGroup;
formSearch: FormGroup;
showMessage: boolean = false;
message: string;
customer: ICustomer;
customerTransaction: ICustomerTransaction;

  constructor(private customerTransactionService : CustomerTransactionService,
              private customerService : CustomerService,
              private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.customerTransactionService.getCustomerTransactionGroup();
    this.formSearch = this.customerTransactionService.getCustomerSearchGroup();
  }

  onSubmitSearch() {
    this.formSearch.markAllAsTouched();
    if (this.formSearch.valid) {
      if (!this.customer) {
        this.search();
      }
    }
  }

  onSubmit(){
    this.form.markAllAsTouched();
    this.form.get('idCustomer').setValue(this.customer.id);
    this.form.get('transactionStatus').setValue('Pendiente');
    if (this.form.valid) {
      this.create();  
    }
  }

  create() {
    const body = this.form.getRawValue();
    delete body.customerName;
    body.transactionDate = new Date();
    this.customerTransactionService.create(body).subscribe( data => {
      this.message = 'La transaccion se ha realizado con exito, por favor, aguarde a ser redirigido'
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        this.message = '';
        this.router.navigate(['/customerTransaction']);
      }, 4000);
    });
  }

  search() {
    const body = this.formSearch.getRawValue();
    this.customerService.getByDni(body.dni).subscribe( data => {
      this.customer = data;
      this.form.get('customerName').setValue(this.customer.customerName + ' ' + this.customer.lastName);
      this.setDate();
    });
  }

  setDate() {
    let date = new Date()

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    if(month < 10){
      this.form.get('transactionDate').setValue(`${day}/0${month}/${year}`);
    }else{
      this.form.get('transactionDate').setValue(`${day}/${month}/${year}`);
    }
  }

}
