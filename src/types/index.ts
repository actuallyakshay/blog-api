export interface IGoogleUser {
   name: string;
   email: string;
   googleId: string;
   imageURL: string;
}

export interface IJwtPayload {
   email: string;
   sub: string;
   id: string;
}
