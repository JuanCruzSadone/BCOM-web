import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../common/http.service';
import { ICustomer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private fb: FormBuilder,
              private httpService: HttpService) { }

  getCustomerGroup(): FormGroup {
    return this.fb.group({
      customerName: [null, Validators.compose([Validators.required, Validators.max(30)])],
      lastName: [null, Validators.compose([Validators.required, Validators.max(30)])],
      dni: [null, Validators.compose([Validators.required])],
    });
  }            

  get(id): Observable<ICustomer> {
    return this.httpService.get('Customer/' + id);
  }

  getAll(): Observable<ICustomer[]> {
    return this.httpService.get('Customer');
  }

  getByDni(dni): Observable<ICustomer> {
    return this.httpService.get('Customer/getCustomerByDni/' + dni);
  }

  update(id, body: any): Observable<ICustomer> {
    return this.httpService.put('Customer/' + id, body);
  }

  create(body: any): Observable<ICustomer> {
    return this.httpService.post('Customer', body);
  }

  delete(id: number): Observable<ICustomer> {
    return this.httpService.delete('Customer/' + id);
  }
}
