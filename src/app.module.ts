import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { EmployeeModule } from './employee/employee.module';
import { CategeoryModule } from './categeory/categeory.module';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EmployeeModule, CategeoryModule, StudentsModule, AuthModule, UsersModule],
  controllers: [AppController, UserController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule {}
