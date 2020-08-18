import { KeycloakProfile } from 'keycloak-js';
import { DbFlowError } from '../models/error';

export class Login {
    static type = '[Session] Login';
    constructor(public loginData: KeycloakProfile) {}
}

export class Init {
    static type = '[Session] Init';
    constructor() {}
}

export class Logout {
    static type = '[Session] Logout';
    constructor() {}
}

export class NotifyError {
    static type = '[Session] NotifyError';
    constructor(public error: DbFlowError) {}
}
