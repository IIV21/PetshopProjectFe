import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { count, lastValueFrom } from 'rxjs';
import { DataServiceService } from '../Services/data-service.service';
interface Product {
  id: number;
  nume: string;
  categorieId: number;
  tip: string;
  adultJunior: boolean;
  pret: number;
  activ: boolean;
  imagine: string;
  categorie: {
    id: number;
    nume: string;
    descriptie: string;
    produs: any[];
  };
  facturaProdus: any[];
  stocs: any[];
}
interface Category {
  id: number;
  nume: string;
  descriptie: string;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  products: Product[] = [];
  user = {} as any;
  filterName: string = '';
  shoppingCartProducts: { count: number; product: Product }[] = [];
  totalValue: number = 0;
  categories: any;
  selectedCategory = 0;
  addProductToCart(product: Product) {
    console.log(product);
    const productIndex = this.shoppingCartProducts.findIndex(
      (item) => item.product.id === product.id
    );
    console.log('productIndex', productIndex);
    if (productIndex == -1) {
      this.shoppingCartProducts.push({
        product: product,
        count: 1,
      });
    } else {
      this.shoppingCartProducts[productIndex].count++;
    }
    this.totalValue += product.pret;
  }

  removeProductFromCart(product: any) {
    this.shoppingCartProducts = this.shoppingCartProducts.filter(
      (x) => x.product.id != product.product.id
    );
    this.totalValue -= product.product.pret * product.count;
    console.log('pret', this.totalValue, this.shoppingCartProducts);
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.dataService.currentMessage.subscribe(
      (message) => (this.user = message)
    );
    this.getCategories();
    console.log('user', this.user);
  }
  productStock() {
    this.router.navigateByUrl('product-stock');
  }
  async removeItem(product: Product) {
    const url = `https://localhost:7276/api/Product/DeleteProduct/${product.id}`;
    this.http.delete(url).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
    await this.getAllProducts();
  }

  async updateItem(product: Product) {
    this.dataService.changeMessage2(product.id);
    await this.router.navigateByUrl('/update-product');
  }
  async getAllProducts() {
    this.products = await lastValueFrom(
      this.http.get<Product[]>(
        'https://localhost:7276/api/Product/GetAllProducts'
      )
    );
    console.log(this.products);
  }

  buyCart() {
    const shoppingCart = {
      userId: this.user.id,
      products: this.shoppingCartProducts as any,
    };
    shoppingCart.products = shoppingCart.products.map(
      (x: { count: any; product: { id: any } }) => {
        return { count: x.count, productId: x.product.id };
      }
    );
    console.log('shopping', shoppingCart);
    this.shoppingCartProducts = [];

    const url = 'https://localhost:7276/api/Invoice';
    this.http.post(url, shoppingCart).subscribe((res) => console.log(res));
  }

  async filterProducts() {
    console.log('filter');
    if (this.filterName === '')
      this.products = await lastValueFrom(
        this.http.get<Product[]>(
          `https://localhost:7276/api/Product/FilterProducts/0`
        )
      );
    else
      this.products = await lastValueFrom(
        this.http.get<Product[]>(
          `https://localhost:7276/api/Product/FilterProducts/${this.filterName}`
        )
      );
  }

  async getCategories() {
    this.categories = await lastValueFrom(
      this.http.get<Category[]>(
        'https://localhost:7276/api/Category/GetAllCategories'
      )
    );
    console.log(this.categories);
  }
  async filterCategory() {
    this.products = await lastValueFrom(
      this.http.get<Product[]>(
        `https://localhost:7276/api/Product/FilterProductsByCategoryName/${this.selectedCategory}`
      )
    );
  }

  addProduct() {
    console.log('addProduct');
    this.router.navigateByUrl('/add-product');
  }

  userInfo() {
    this.router.navigateByUrl('/user-info');
  }

  allCards() {
    this.router.navigateByUrl('/all-cards');
  }

  myCards() {
    this.router.navigateByUrl('/my-cards');
  }
  allOrders() {
    this.router.navigateByUrl('/all-orders');
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private dataService: DataServiceService
  ) {}
}
