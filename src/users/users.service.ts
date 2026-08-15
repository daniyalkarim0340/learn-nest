import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor() {}
    createuser() {
        return { message: "User registered successfully" };
    }
}
