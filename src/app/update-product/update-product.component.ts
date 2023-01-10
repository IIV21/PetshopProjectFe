import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChildActivationStart, Router } from '@angular/router';
import { DataServiceService } from '../Services/data-service.service';
import { count, lastValueFrom } from 'rxjs';
interface Product {
  id: number;
  nume: string;
  categorieId: number;
  tip: string;
  adultJunior: boolean;
  pret: number;
  activ: boolean;
}
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent {
  updateProductID: number = 0;
  product = {} as Product;
  categories: any[] = [];
  ngOnInit() {
    this.dataService.currentMessage2.subscribe(
      (message) => (this.updateProductID = message)
    );
    this.getProduct();
    this.getCategories();
  }
  async getProduct() {
    this.product = await lastValueFrom(
      this.http.get<Product>(
        `https://localhost:7276/api/Product/GetById/${this.updateProductID}`
      )
    );
  }
  updateProduct() {
    console.log(this.product);
    const prod = {
      nume: this.product.nume,
      categorieId: this.product.categorieId,
    };
    this.http
      .put(
        `https://localhost:7276/api/Product/UpdateProduct/${this.updateProductID}`,
        this.product
      )
      .subscribe((res) => console.log(res));
  }
  goBack() {
    this.router.navigateByUrl('/main');
  }
  async getCategories() {
    this.categories = await lastValueFrom(
      this.http.get<any[]>(
        'https://localhost:7276/api/Category/GetAllCategories'
      )
    );
    console.log(this.categories);
  }
  changeAdult(e: any) {
    this.product.adultJunior = e;
  }
  changeCategory(e: any) {
    this.product.categorieId = e;
  }
  changeActiv(e: any) {
    this.product.activ = e;
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private dataService: DataServiceService
  ) {}
}
