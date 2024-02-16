import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-authentication/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard} from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthenticationComponent } from './user-authentication/user-authentication.component';
import { CartPageComponent } from './cart-page/cart-page.component';

const routes: Routes = [
  {
    path : '',
    component: HomeComponent
  },
  {
    path: 'seller-auth',
    component : SellerAuthComponent
  },
  {
    path: 'seller-home',
    component : SellerHomeComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'seller-add-product',
    component : SellerAddProductComponent,
    canActivate : [AuthGuard]
    
  },
  {
    path: 'seller-update-product/:productId',
    component : SellerUpdateProductComponent,
    canActivate : [AuthGuard]
    
  },
  {
    path: 'search/:query',
    component : SearchComponent
    
    
  },
  {
    path: 'details/:productId',
    component : ProductDetailsComponent
    
    
  },
  {
    path: 'user-authentication',
    component : UserAuthenticationComponent
    
    
  }
,
  {
    path: 'cart-page',
    component : CartPageComponent
    
    
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
