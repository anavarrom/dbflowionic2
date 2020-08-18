// import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
let keycloakConfig: Keycloak.KeycloakConfig = {
  url: 'http://localhost:9080/auth',
  // url: '/auth',
  realm: 'jhipster',
  clientId: 'web_app',
  // credentials: {
  //   secret: "57115dc3-4a3c-497a-8727-456386a29cd9"
  //  }
};

export const environment = {
  production: true,
  basePath: 'http://localhost:8091',
  wsURL: 'localhost:4200',
  keycloakConfig
};
