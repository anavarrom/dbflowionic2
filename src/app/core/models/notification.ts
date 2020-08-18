import { INotification, NotificationStatus } from 'src/app/data/interfaces/models';
import { Moment } from 'moment';

export class Notification implements INotification {
    constructor(
      public id?: number,
      public subject?: string,
      public body?: string,
      public from?: string,
      public to?: string,
      public emittedDate?: Moment,
      public readDate?: Moment,
      public dueDate?: Moment,
      public status?: NotificationStatus,
      public fromId?: number,
      public toId?: number,
      public chatId?: number,
      public appointmentId?: number
    ) {}
  }

