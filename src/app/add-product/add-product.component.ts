import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { count, lastValueFrom } from 'rxjs';

interface Product {
  nume: string;
  categorieId: number;
  tip: string;
  adultJunior: boolean;
  pret: number;
  imagine: string;
}
interface Category {
  id: number;
  nume: string;
  descriptie: string;
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  selected = true;

  addProduct = this.fb.group({
    nume: ['', Validators.required],
    categorieId: [''],
    tip: ['', Validators.required],
    adultJunior: [''],
    pret: ['', Validators.required],
    imagine: ['', Validators.required],
  });
  categories: Category[] = [];
  adult: boolean = true;
  product = {} as Product;
  catId: number = 0;
  addNewProduct() {
    console.log(this.addProduct.value);
    const url = 'https://localhost:7276/api/Product/PostProduct';
    this.http
      .post(url, this.addProduct.value)
      .subscribe((res) => console.log(res));
    console.log(this.selected);
    console.log(this.addProduct.value.adultJunior);
  }
  changeCategory(e: any) {
    this.addProduct.value.categorieId = e;
    console.log('cat', this.addProduct.value.categorieId);
  }
  async getCategories() {
    this.categories = await lastValueFrom(
      this.http.get<Category[]>(
        'https://localhost:7276/api/Category/GetAllCategories'
      )
    );
    console.log(this.categories);
  }
  goBack(){
    this.router.navigateByUrl('/main');
  }
  ngOnInit() {
    this.getCategories();
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}
}
