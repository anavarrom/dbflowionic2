import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakService, CoreModule, KeycloakAngularModule } from 'keycloak-angular';
import { Configuration, ConfigurationParameters } from './data/configuration';
import { environment } from 'src/environments/environment';
import { TabsPage } from './secure/tabs/tabs.page';
import { SecureModule } from './secure/secure.module';
import { PublicModule } from './public/public.module';
import { SharedModule } from './shared/shared.module';
import { DataModule } from './data/data.module';
import { AppAuthGuard } from './shared/guards/AppAuthGuard';
// import { initializer } from './shared/guards/app-init';

// const keycloakService = new KeycloakService();

function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
  const { keycloakConfig } = environment;
  keycloak.init({
        config: keycloakConfig,
        /*initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            window.location.origin + '/assets/silent-check-sso.html',
        }*/
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false,
          enableLogging: true,
          flow: 'implicit'
        },
        bearerExcludedUrls: ['/assets'],
      }).catch((e) => {
        console.log("Error thrown in init "+e)
     });
    };
  }

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
    basePath: environment.basePath,
    username: 'patttsa'
  };

  return new Configuration(params);
}

const dbFlow6Components = [
 // LoginComponent,
 // PublicComponent
 TabsPage
];

const externalModules = [
  // KeycloakAngularModule
  // AppRoutingModule,
  // ReactiveFormsModule,
  // Ng2UiAuthModule,
  // MobxAngularModule
  // FontAwesomeModule
];
const customModules = [
  SecureModule,
  PublicModule,
  CoreModule,
  SharedModule,
  DataModule.forRoot(apiConfigFactory)
];


@NgModule({
  declarations: [
    AppComponent,
    dbFlow6Components
  ],
  entryComponents: [],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    externalModules,
    customModules, 
    IonicModule.forRoot(), 
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    AppAuthGuard,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },{
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
