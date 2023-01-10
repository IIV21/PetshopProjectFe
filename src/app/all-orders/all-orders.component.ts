import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { count, lastValueFrom } from 'rxjs';

export interface Invoice {
  numeProdus: string;
  pret: number;
  cantitate: number;
  cod: string;
  dataFacturare: Date;
  numeClient: string;
  prenumeClient: string;
  telefon: string;
}

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css'],
})
export class AllOrdersComponent {
  invoices: Invoice[] = [];

  ngOnInit() {
    this.getInvoices();
  }

  async getInvoices() {
    this.invoices = await lastValueFrom(
      this.http.get<Invoice[]>('https://localhost:7276/api/Invoice')
    );
    console.log(this.invoices);
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}
}
