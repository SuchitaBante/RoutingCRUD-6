import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Iproduct, Ires } from '../models/Iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  prodArr=[
    
{
  pid: 'E103',
  pname: 'Women\'s Floral Kurti',
  pprice: 1499,
  pstatus: 'Available',
  canReturn: 1,
  pdescription: 'Elegant floral printed cotton kurti with a comfortable fit for everyday wear.',
  pimage: '/assets/images/women floral kurti.jpeg'
},
{
  pid: 'E104',
  pname: 'Men\'s Slim Fit Formal Shirt',
  pprice: 1799,
  pstatus: 'Available',
  canReturn: 1,
  pdescription: 'Premium slim-fit formal shirt crafted from wrinkle-resistant fabric for office wear.',
  pimage: '/assets/images/mens shirt.jpg'
},
{
  pid: 'E105',
  pname: 'Women\'s Hooded Sweatshirt',
  pprice: 2199,
  pstatus: 'Available',
  canReturn: 1,
  pdescription: 'Soft fleece hooded sweatshirt designed to keep you warm and comfortable during winter.',
  pimage: 'assets/images/women swetshirt.jpeg'
},
{
  pid: 'E106',
  pname: 'Unisex Cotton Joggers',
  pprice: 1299,
  pstatus: 'Out of Stock',
  canReturn: 1,
  pdescription: 'Comfortable cotton joggers with an elastic waistband, ideal for workouts and casual wear.',
  pimage: '/assets/images/unisexJoggers.jpeg'
}
  ]
  fetchProducts():Observable<Iproduct[]>{
    return of(this.prodArr)

  }
  fetchProductsById(id: string):Observable<Iproduct>{
    let productobj = this.prodArr.find(p=>p.pid===id)!
    return of(productobj)

  }
  createproduct(newObj: Iproduct):Observable<Ires<Iproduct>>{
    this.prodArr.push(newObj)
    return of({
      msg: `The new Product with id ${newObj.pid}is created Successfully...!!!`,
      data: newObj
    })

  }
  UpdateProduct(UpdatedObj:Iproduct):Observable<Ires<Iproduct>>{
    let GETINDEX = this.prodArr.findIndex(p=>p.pid===UpdatedObj.pid)
    this.prodArr[GETINDEX]=UpdatedObj
    return of({
      msg:`The Product with id ${UpdatedObj.pid}is updated successfully..!!`,
      data:UpdatedObj
    })

  }
  removeProduct(removeId:string){
    let GETINDEX = this.prodArr.findIndex(p=>p.pid===removeId)
    let arr = this.prodArr.splice(GETINDEX, 1)
    return of({
      msg: `The product with Id ${removeId}is Removed Successfully...!!`,
      data: arr[0]
    })

  }
}

