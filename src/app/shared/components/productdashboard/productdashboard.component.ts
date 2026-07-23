import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../models/Iproduct';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productdashboard',
  templateUrl: './productdashboard.component.html',
  styleUrls: ['./productdashboard.component.scss']
})
export class ProductdashboardComponent implements OnInit {
products:Iproduct[]=[]
  constructor(private productService:ProductService, private router:Router, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe({
      next: (data)=>{
        this.products= data;

        if(this.products.length>0 && !this.routes.firstChild){
          this.router.navigate(['/productdashboard', this.products[0].pid]);
        }
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }
  trackByFun(index: number, product: Iproduct){
    return product.pid;
  }

}

