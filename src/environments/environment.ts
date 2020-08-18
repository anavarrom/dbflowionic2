// import { KeycloakConfig } from 'keycloak-angular';
// import { InjectableRxStompConfig, StompConfig } from '@stomp/ng2-stompjs';

import * as SockJS from 'sockjs-client';
import { StompConfig } from '@stomp/ng2-stompjs';

// TODO: Hay que conseguir que los websockets funcionen con ZUUL
export function socketProvider() {
  return new SockJS('http://localhost:8092/websocket/dbFlowChat');
}


// Add here your keycloak setup infos
let keycloakConfig: Keycloak.KeycloakConfig = {
  // url: 'http://localhost:9080/auth/',
  url: 'http://10.0.2.2:9080/auth/',
  realm: 'jhipster',
  clientId: 'dbFlow'
  /*,
   credentials: {
     secret: "12fdc4d9-997f-43e2-aa28-ce4df1dc1448"
   }*/
};

const stompConfig: StompConfig = {
  // Which server?
  url: socketProvider,

  // Headers
  // Typical keys: login, passcode, host
  headers: {
    login: 'guest',
    passcode: 'guest'
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnect_delay: 5000,

  // Will log diagnostics on console
  debug: true
};

/*
let rxStompConfig: InjectableRxStompConfig = {
  // Which server?
  // brokerURL: 'ws://127.0.0.1:15674/ws',
  url: socketProvider,
  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {
    login: 'guest',
    passcode: 'guest'
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milli seconds)
  reconnectDelay: 200,

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
};*/

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  basePath: 'http://10.0.2.2:8080/services',
  // basePath: 'http://localhost:8080/services',
  wsURL: 'localhost:4200',
  stompConfig,
  keycloakConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
