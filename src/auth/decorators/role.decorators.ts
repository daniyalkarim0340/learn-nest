import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../entity/user.entity";

// Admin  , string[], []

export const ROLES_KEY = 'roles';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
//  @Roles("admin" , "manager")
//  @Controller("/admin)
//  class UserController {
//  
//    @Post("/create" )
//    @Roles("admin")
  //  @UseGuards(JWTgUARD ,  RolesGuard )
//    createUser() {
//     }
// 
// }
// roles = ["admin" , "manager"]