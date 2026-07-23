import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../models/Iproduct';
import { SnackBarService } from '../../services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
productobj!:Iproduct
productId!:string
  constructor(private snackBar:SnackBarService, private routes:ActivatedRoute, private productservice: ProductService, private matDialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts()
  }
  getAllProducts(){
this.routes.params.subscribe(params =>{
  this.productId= params['productId'];
  if(this.productId){
    this.productservice.fetchProductsById(this.productId).subscribe({
      next: (data) =>{
        this.productobj=data;
      }
    });
  }else{
this.productservice.fetchProducts().subscribe({
  next: (products) =>{
    if(products.length >0){
      this.router.navigate(['/productdashboard', products[0].pid]);
    }
  }
})
  }
})
  }
  onEditProduct(){
    this.router.navigate(['/productdashboard', this.productId, 'edit'],{
      queryParamsHandling: 'preserve',
      relativeTo:this.routes
    })
}
  onRemoveProduct(){
    const config = new MatDialogConfig();

  config.width ='400px';
  config.disableClose= true;
  config.data=`Are you sure you want to remove the Product with Id ${this.productId}?`;

  const matRef = this.matDialog.open(GetConfirmComponent, config);
  matRef.afterClosed().subscribe({
    next: (confirm)=>{
      if(confirm){
        this.productservice.removeProduct(this.productId).subscribe({
          next: (res)=>{
            this.snackBar.openSnackBar(res.msg);
            this.router.navigate(['/productdashboard']);
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
    }

  })

  }
}