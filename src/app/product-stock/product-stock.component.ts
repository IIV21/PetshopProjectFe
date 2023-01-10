import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../Services/data-service.service';
import { count, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.css'],
})
export class ProductStockComponent {
  productStock: any;
  stock: number = 0;

  ngOnInit(): void {
    this.getAllStock();
  }
  async getAllStock() {
    this.productStock = await lastValueFrom(
      this.http.get(`https://localhost:7276/api/Stoc/${this.stock}`)
    );
    console.log(this.productStock);
  }
  changeStock() {
    this.getAllStock();
  }
  async updateStock(product: any) {
    console.log(product);
    await this.http
      .put(
        `https://localhost:7276/api/Stoc/${product.productId}`,
        product.unitati
      )
      .subscribe((res) => console.log(res));
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private dataService: DataServiceService
  ) {}
}
