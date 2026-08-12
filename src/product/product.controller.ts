import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productservice: ProductService) {}
    
    @Get()
    getproduct() {
        return this.productservice.getallproducts();
    }
    @Get(':id')
    getproductbyid(@Param('id') id: string) {
        return this.productservice.getproductbyid(Number(id));
    }
}
