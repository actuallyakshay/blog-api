import { plainToClass } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

enum EnvironmentType {
   DEV = 'development',
   PROD = 'production'
}

class EnvironmentVariables {
   @IsNotEmpty()
   @IsEnum(EnvironmentType)
   NODE_ENV: EnvironmentType;

   @IsNumber()
   PORT: number;

   @IsString()
   @IsNotEmpty()
   DB_HOST: string;

   @IsNumber()
   @IsNotEmpty()
   DB_PORT: number;

   @IsString()
   @IsNotEmpty()
   DB_USERNAME: string;

   @IsString()
   @IsNotEmpty()
   DB_PASSWORD: string;

   @IsString()
   @IsNotEmpty()
   DB_DATABASE: string;

   @IsString()
   @IsNotEmpty()
   BLOG_API_BASE_URL: string;

   @IsString()
   @IsNotEmpty()
   GOOGLE_CLIENT_ID: string;

   @IsString()
   @IsNotEmpty()
   JWT_SECRET: string;

   @IsString()
   @IsNotEmpty()
   JWT_EXPIRATION: string;
}

export function validateConfig(configuration: Record<string, unknown>) {
   const finalConfig = plainToClass(EnvironmentVariables, configuration, {
      enableImplicitConversion: true
   });

   const errors = validateSync(finalConfig, { skipMissingProperties: true });

   if (errors.length > 0) {
      throw new Error(errors.toString());
   }

   return finalConfig;
}
