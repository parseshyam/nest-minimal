import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
    canActivate(context: ExecutionContext,): CanActivateReturn {
        console.log("inside role guards")
        return true;
    }
}
