import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomebannerComponent } from './shared/components/homebanner/homebanner.component';
import { ProductdashboardComponent } from './shared/components/productdashboard/productdashboard.component';
import { ProductformComponent } from './shared/components/productform/productform.component';
import { ProductComponent } from './shared/components/product/product.component';
import { HomeComponent } from './shared/components/home/home.component';
import { FairsDashboardComponent } from './shared/components/fairs-dashboard/fairs-dashboard.component';
import { FairsDetailsComponent } from './shared/components/fairs-details/fairs-details.component';
import { UserdashboardComponent } from './shared/components/userdashboard/userdashboard.component';
import { UserformComponent } from './shared/components/userform/userform.component';
import { UserComponent } from './shared/components/user/user.component';
import { AuthService } from './shared/services/auth.service';
import { AuthComponent } from './shared/components/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component:AuthComponent,
  },
  {
    path: 'home',
    component: HomebannerComponent
  },
  {
    path:'auth',
    component:AuthComponent

  },

  {
    path:'userdashboard',
    component:UserdashboardComponent,
    children:[
      {
        path: 'adduser',
        component:UserformComponent
      },
      {
        path: ':userId/edit',
        component: UserformComponent

      },
      {
        path: ':userId/remove',
        component:UserformComponent
      },
      {
        path: ':userId',
        component:UserComponent
      }
    ]

  },

  {
    path:'productdashboard',
    component: ProductdashboardComponent,
    children:[
      {
        path: 'addproduct',
        component: ProductformComponent
      },
      {
        path: ':productId/edit',
        component:ProductformComponent
      },
      {
        path: ':productId/remove',
        component:ProductformComponent
      },
      {
        path: ':productId',
        component:ProductComponent
      }
    ]},
    
      {
    path: 'fairs',
    component: FairsDashboardComponent,
    children: [
      {
        path: ':fairsId',
        component:FairsDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
