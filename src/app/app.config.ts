import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Optional: Adjust zone change detection as needed
    provideHttpClient(), // Set up HTTP client
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, // Provide JWT options
    JwtHelperService // Include JwtHelperService for JWT operations
  ]
};
