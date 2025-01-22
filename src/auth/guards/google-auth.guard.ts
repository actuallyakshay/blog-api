import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { IGoogleUser } from 'src/types';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
   private googleClient: OAuth2Client;

   constructor(private configService: ConfigService) {
      this.googleClient = new OAuth2Client(this.configService.get('GOOGLE_CLIENT_ID'));
   }

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const idToken = request.body?.idToken;

      if (!idToken) throw new UnauthorizedException('No Google token provided');

      try {
         const ticket = await this.googleClient.verifyIdToken({
            idToken,
            audience: this.configService.get('GOOGLE_CLIENT_ID')
         });

         const payload = ticket.getPayload();
         if (!payload) throw new UnauthorizedException('Invalid Google token');

         request.user = {
            email: payload.email,
            name: `${payload.given_name} ${payload?.family_name}`,
            googleId: payload.sub,
            imageURL: payload.picture
         } as IGoogleUser;

         return true;
      } catch (error) {
         throw new UnauthorizedException('Invalid Google token');
      }
   }
}
