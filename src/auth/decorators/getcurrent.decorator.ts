import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return data ? request.user?.[data] : request.user;
  },
);







// 1. NestJS fundamentals
//         ↓
// 2. Modules / Controllers / Services
//         ↓
// 3. DTOs + Validation + Pipes
//         ↓
// 4. Database + TypeORM
//         ↓
// 5. Authentication
//         ↓
// 6. JWT Access + Refresh Tokens
//         ↓
// 7. Guards + Roles + Current User
//         ↓
// 8. Exception handling
//         ↓
// 9. Interceptors + Middleware
//         ↓
// 10. File uploads
//         ↓
// 11. Pagination + Filtering + Search
//         ↓
// 12. Testing
//         ↓
// 13. Production deployment
//         ↓
// 14. AI integration
//         ↓
// 15. LangChain / LangGraph AI backend