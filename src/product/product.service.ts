import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    private prodcuts=[
        {id:1,name:'product1',price:100},
        {id:2,name:'product2',price:200},
        {id:3,name:'product3',price:300},
    ]
    getallproducts(){
        return this.prodcuts;
    }
    getproductbyid(id:number){
        return this.prodcuts.find(product=>product.id===id);
    }
}
