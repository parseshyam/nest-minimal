import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';

// export function Auth(...roles: Role[]) {
//     return applyDecorators(
//         SetMetadata('roles', roles),
//         UseGuards(AuthGuard, RolesGuard),
//         ApiBearerAuth(),
//         ApiUnauthorizedResponse({ description: 'Unauthorized' }),
//     );
// }