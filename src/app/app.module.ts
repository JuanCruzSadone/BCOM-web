import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { CustomerListComponent } from './components/customer/list/customer-list.component';
import { CustomerNewComponent } from './components/customer/new/customer-new.component';
import { CustomerService } from './services/api/customer/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertSuccessComponent } from './components/common/alert-success/alert-success.component';
import { CustomerTransactionListComponent } from './components/customer-transaction/list/customer-transaction-list.component';
import { CustomerTransactionNewComponent } from './components/customer-transaction/new/customer-transaction-new.component';
import { CustomerTransactionService } from './services/api/customer-transaction/customer-transaction.service';
import { NgxMaskModule, IConfig } from 'ngx-mask'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerListComponent,
    CustomerNewComponent,
    AlertSuccessComponent,
    CustomerTransactionListComponent,
    CustomerTransactionNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    CustomerService,
    CustomerTransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
