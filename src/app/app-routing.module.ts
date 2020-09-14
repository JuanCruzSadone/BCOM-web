import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './components/customer/list/customer-list.component';
import { CustomerNewComponent } from './components/customer/new/customer-new.component';
import { CustomerTransactionListComponent } from './components/customer-transaction/list/customer-transaction-list.component';
import { CustomerTransactionNewComponent } from './components/customer-transaction/new/customer-transaction-new.component';


const routes: Routes = [
  {
    path: 'customer',
    data: {
      title: 'Clientes'
    },
    children: [
      {
        path: '', 
        component: CustomerListComponent, 
        data: {
          title: 'Lista de clientes'
        }
      },
      {
        path: 'new', 
        component: CustomerNewComponent, 
        data: {
          title: 'Nuevo cliente'
        }
      },
      {
        path: ':id/edit', 
        component: CustomerNewComponent, 
        data: {
          title: 'Editar cliente'
        }
      },
    ]
  },
  {
    path: 'customerTransaction',
    data: {
      title: 'Transacciones'
    },
    children: [
      {
        path: '', 
        component: CustomerTransactionListComponent, 
        data: {
          title: 'Lista de clientes'
        }
      },
      {
        path: 'new', 
        component: CustomerTransactionNewComponent, 
        data: {
          title: 'Nueva transaccion'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
