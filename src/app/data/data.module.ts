import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { NotificactionService } from './api/notification.service';
import { KeycloakBearerInterceptor } from 'keycloak-angular';

@NgModule({
  imports:      [HttpClientModule],
  declarations: [],
  exports:      [],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: KeycloakBearerInterceptor,
        multi: true
      }
  ]
})
export class DataModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<DataModule> {
        return {
            ngModule: DataModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: DataModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
