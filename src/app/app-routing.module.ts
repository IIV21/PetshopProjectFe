import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AllCardsComponent } from './all-cards/all-cards.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MyCardsComponent } from './my-cards/my-cards.component';
import { ProductStockComponent } from './product-stock/product-stock.component';
import { RegisterComponent } from './register/register.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UserInfoComponent } from './user-info/user-info.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: MainComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'add-product', component: AddProductComponent },
  { path: 'update-product', component: UpdateProductComponent },
  { path: 'user-info', component: UserInfoComponent },
  { path: 'product-stock', component: ProductStockComponent },
  { path: 'all-cards', component: AllCardsComponent },
  { path: 'my-cards', component: MyCardsComponent },
  { path: 'all-orders', component: AllOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
