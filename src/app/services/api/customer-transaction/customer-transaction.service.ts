import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../common/http.service';
import { Observable } from 'rxjs';
import { ICustomerTransaction } from './customer-transaction.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerTransactionService {

  constructor(private fb: FormBuilder,
    private httpService: HttpService) { }

  getCustomerTransactionGroup(): FormGroup {
    return this.fb.group({
      idCustomer: [null, Validators.compose([Validators.required])],
      customerName: [null],
      transactionStatus: [null, Validators.compose([Validators.required])],
      transactionDate: [null, Validators.compose([Validators.required])],
    });
  } 
  
  getCustomerSearchGroup(): FormGroup {
    return this.fb.group({
      dni: [null, Validators.compose([Validators.required])]
    });
  }  

  getDateSearchGroup(): FormGroup {
    return this.fb.group({
      dateFrom: [null, Validators.compose([Validators.required])],
      dateTo: [null, Validators.compose([Validators.required])]
    });
  } 

  get(id): Observable<ICustomerTransaction> {
    return this.httpService.get('CustomerTransaction/' + id);
  }

  getAll(): Observable<ICustomerTransaction[]> {
    return this.httpService.get('CustomerTransaction');
  }

  getCustomerTransactionByCustomerId(id): Observable<ICustomerTransaction[]> {
    return this.httpService.get('CustomerTransaction/GetCustomerTransactionByCustomerId/' + id);
  }

  searchByDate(body: any): Observable<ICustomerTransaction[]> {
    return this.httpService.post('CustomerTransaction/SearchByDate', body);
  }

  update(id, body: any): Observable<ICustomerTransaction> {
    return this.httpService.put('CustomerTransaction/' + id, body);
  }

  create(body: any): Observable<ICustomerTransaction> {
    return this.httpService.post('CustomerTransaction', body);
  }

  delete(id: number): Observable<ICustomerTransaction> {
    return this.httpService.delete('CustomerTransaction/' + id);
  }

}
