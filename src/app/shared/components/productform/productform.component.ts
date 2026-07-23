import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from '../../services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { pid } from 'process';
import { Iproduct } from '../../models/Iproduct';

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.scss']
})
export class ProductformComponent implements OnInit {
  isInEditMode: boolean = false
  ProductForm!: FormGroup
  productId!: string
  DisableUpdatebtn: boolean = false
  DisableAddBtn: boolean = false

  constructor(private snackBar: SnackBarService, private router: Router, private routes: ActivatedRoute, private productservice: ProductService) { }

  ngOnInit(): void {
    this.createproductform()
    this.patchproductdata()
  }
  patchproductdata() {
    this.productId = this.routes.snapshot.paramMap.get('productId')!
    if (this.productId) {
      this.isInEditMode = true
      this.productservice.fetchProductsById(this.productId).subscribe({
        next: res => {
          this.ProductForm.patchValue(res)
        }
      })
    }
  }
  createproductform() {
    this.ProductForm = new FormGroup({
      pname: new FormControl(null, [Validators.required]),
      pprice: new FormControl(null, [Validators.required]),
      pstatus: new FormControl(null, [Validators.required]),
      pdescription: new FormControl(null, [Validators.required]),
      pimage: new FormControl(null, [Validators.required]),
      canReturn: new FormControl(1)
    })

  }
  
  onAddProduct() {
    if(this.ProductForm.invalid){
      this.ProductForm.markAllAsTouched();
      return;
    }
    let product: Iproduct={
      ...this.ProductForm.value,
      pid:Date.now().toString()
    };
    this.productservice.createproduct(product).subscribe({
      next: res=>{
        console.log(res);
        this.DisableAddBtn=true;
        this.ProductForm.reset();
        this.ProductForm.patchValue({canReturn:1});
        this.snackBar.openSnackBar(res.msg);
      } ,
      error: err=>{
        console.log(err)
      }
       })

  }
 


  onUpdate() {
    if(this.ProductForm.invalid){
      this.ProductForm.markAllAsTouched()
    }else{
      let UpdatedObj:Iproduct={
        ...this.ProductForm.value,
        pid:this.productId
      }
      this.productservice.UpdateProduct(UpdatedObj).subscribe({
        next: res =>{
          this.ProductForm.reset()
          this.isInEditMode=false
          this.snackBar.openSnackBar(res.msg)
          this.router.navigate(['productdashboard'])
        },
error: err=>{
  console.log(err)
}
      })
    }

  }
  
}