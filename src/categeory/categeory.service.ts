import { Injectable } from '@nestjs/common';

@Injectable()
export class CategeoryService {
    constructor() { }
    getallcategeory() {
        return [
            { id: 1, name: 'categeory1' },
            { id: 2, name: 'categeory2' },
            { id: 3, name: 'categeory3' },
        ]
    }
}
