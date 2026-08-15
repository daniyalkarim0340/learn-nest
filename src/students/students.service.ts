import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentsService {
    contructor() {}
    private students = [
        { id: 1, name: 'John Doe', age: 20 },
        { id: 2, name: 'Jane Smith', age: 22 },
        { id: 3, name: 'Michael Johnson', age: 19 },
    ];
 
    getAllStudents() {
        return this.students;
    }
}
