import { Moment } from 'moment';
import { IAppointment } from 'src/app/data/interfaces/models';

export class Appointment implements IAppointment{
    constructor(
        public id?: number,
        public from?: string,
        public to?: string,
        public text?: string,
        public description?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public allDay?: boolean
      ) {}
}