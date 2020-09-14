import { ICustomer } from '../customer/customer.model';

export interface ICustomerTransaction {
    id: number;
    idCustomer: number;
    transactionStatus: string;
    transactionDate: Date;
    customer: ICustomer;
  }