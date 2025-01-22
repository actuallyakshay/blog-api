import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/types';
import { AuthService } from '../auth.service';

@Injectable()
export class JWTAuthGuard implements CanActivate {
   constructor(
      private readonly jwtService: JwtService,
      private readonly authService: AuthService
   ) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split('Bearer ')[1];

      if (!token) throw new UnauthorizedException('No token provided');

      console.log('token', token);

      try {
         const decodedToken = this.jwtService.verify(token, { secret: 'qwertyuiop' });

         if (!decodedToken) throw new UnauthorizedException('Invalid token');

         const user = await this.authService.validateUser({ user: decodedToken as IJwtPayload });

         if (!user) throw new UnauthorizedException('Invalid token');

         request.user = decodedToken as IJwtPayload;

         return true;
      } catch (error) {
         throw new UnauthorizedException('Invalid  token');
      }
   }
}
