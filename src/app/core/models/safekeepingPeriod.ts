import { Moment } from 'moment';
import { ISafeKeepingPeriod } from 'src/app/data/interfaces/models';

export class SafeKeepingPeriod implements ISafeKeepingPeriod{
    constructor(
        public id?: number,
        public year?: string,
        public owner?: string,
        public text?: string,
        public description?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public backgroundColor?: string,
        public textColor?: string,
        public allDay?: boolean,
        public safeKeepingProjectId?: number
    ) {
    }
}
