import { getLocaleFirstDayOfWeek } from '@angular/common';

export const enum ErrorSeverity {
    CRITICAL = 'CRITICAL',
    HIGH     = 'HIGH',
    NORMAL   = 'NORMAL',
    LOW      = 'LOW'
}

export class DbFlowError {
    constructor(
        public severity?: ErrorSeverity,
        public code?: number,
        public message?: string,
        public detail?: string,
        public url?: string,
    ) {}
}