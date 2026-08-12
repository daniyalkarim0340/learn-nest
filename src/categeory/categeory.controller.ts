import { Controller, Get } from '@nestjs/common';
import { CategeoryService } from './categeory.service';

@Controller('categeory')
export class CategeoryController {
    constructor(private  categeoryService:CategeoryService) {}
    @Get()
    getallcategeory(){
        return this.categeoryService.getallcategeory();
    }
}
