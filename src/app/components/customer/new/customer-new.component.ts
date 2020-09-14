import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/api/customer/customer.service';
import { FormGroup } from '@angular/forms';
import { ICustomer } from 'src/app/services/api/customer/customer.model';
import { ICustomerTransaction } from 'src/app/services/api/customer-transaction/customer-transaction.model';
import { CustomerTransactionService } from 'src/app/services/api/customer-transaction/customer-transaction.service';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.scss']
})
export class CustomerNewComponent implements OnInit {
customerId: number;
form: FormGroup;
customer: ICustomer;
showMessage: boolean = false;
message: string;
transactions: ICustomerTransaction[] = [];

  constructor(private customerService : CustomerService,
              private route: ActivatedRoute,
              private router: Router,
              private customerTransactionService : CustomerTransactionService) { }

  ngOnInit() {
    this.createForm();
    this.getCustomerId();
  }

  createForm() {
    this.form = this.customerService.getCustomerGroup();
  }

  getCustomerId() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.customerId = params.id
        this.getCustomer(this.customerId);
      }
    });
  }

  getCustomer(id) {
    this.customerService.get(id).subscribe( data => {
      console.log(data)
      this.customer = data;
      this.form.patchValue(this.customer);
      if (this.customer) {
        this.getCustomerTransactions();
      }
    });
  }

  onSubmit() {
  this.form.markAllAsTouched();
    if (this.form.valid) {
      if (!this.customer) {
        this.create();
      } else {
        this.edit();
      }
    }
  }

  create() {
    const body = this.form.getRawValue();
    this.customerService.create(body).subscribe( data => {
      this.customer = data;
      this.message = 'Cliente creado con exito, por favor, aguarde a ser redirigido'
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        this.message = '';
        this.router.navigate(['/customer']);
      }, 4000);
    });
  }

  edit() {
    const body = this.form.getRawValue();
    body.id = this.customerId;
    this.customerService.update(this.customerId, body).subscribe( data => {
      this.customer = data;
      this.message = 'Cliente editado con exito, por favor, aguarde a ser redirigido'
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        this.message = '';
        this.router.navigate(['/customer']);
      }, 4000);
    });
  }

  getCustomerTransactions() {
    this.customerTransactionService.getCustomerTransactionByCustomerId(this.customer.id).subscribe( data => {
      this.transactions = data;
    });
  }

}
