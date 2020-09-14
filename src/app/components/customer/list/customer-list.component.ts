import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/api/customer/customer.service';
import { ICustomer } from 'src/app/services/api/customer/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customer: ICustomer;
  customers: ICustomer[] = [];
  showMessage: boolean = false;
  message: string;

  constructor(private customerService : CustomerService,
              private router: Router) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getAll().subscribe( data => {
      this.customers = data;
    });
  }

  edit(index) {
    this.router.navigateByUrl(`/customer/${this.customers[index].id}/edit`);
  }

  delete(index) {
    this.customerService.delete(this.customers[index].id).subscribe( data => {
      this.message = 'Cliente ha sido eliminado con exito'
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        this.message = '';
      }, 4000);
      this.getCustomers();
    });
  }

}
