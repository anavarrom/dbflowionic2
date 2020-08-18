import { SafeKeepingPeriod } from '../models/safekeepingPeriod';

export class LoadSafeKeepingProjects {
    static readonly type = '[Project] LoadSafeKeepingProjects';
    constructor() {}
}
export class LoadSafeKeepingPeriods {
    static readonly type = '[Project] LoadSafeKeepingPeriods';
    constructor() {}
}

export class NewSafeKeepingPeriod {
    static type = '[Project] New SafeKeepingPeriod';
    constructor(public period: SafeKeepingPeriod) {}
}

export class UpdateSafeKeepingPeriod {
    static type = '[Project] Update SafeKeepingPeriod';
    constructor(public period: SafeKeepingPeriod) {}
}

export class DeleteSafeKeepingPeriod {
    static type = '[Project] Delete SafeKeepingPeriod';
    constructor(public period: SafeKeepingPeriod) {}
}

export class SafeKeepingPeriodActionOK {
    static type = '[Project] SafeKeepingPeriodActionOK';
    constructor() {}
}

export class SafeKeepingPeriodActionError {
    static type = '[Project] SafeKeepingPeriodActionError';
    constructor(public error: string) {}
}
