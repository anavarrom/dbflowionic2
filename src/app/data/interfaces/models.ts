export * from './problem';
import { Moment } from 'moment';

export const enum NotificationStatus {
    EMITTED = 'EMITTED',
    RECEIVED = 'RECEIVED',
    READ = 'READ'
}

export const enum ChatType {
    NOTIFICATION = 'NOTIFICATION',
    APPOINTMENT = 'APPOINTMENT'
}

export interface IDbFlowAccount {
    username: string;
    firstName: string;
    lastName: string;
    enabled: boolean;
    email: string;
    authorities: string[];
    imageUrl: string;
}

export interface IDbAccountConfiguration {
    myBackgroundColor: string;
    otherBackgoundColor: string;
}

export interface INotification {
    id?: number;
    subject?: string;
    body?: string;
    from?: string;
    to?: string;
    emittedDate?: Moment;
    readDate?: Moment;
    dueDate?: Moment;
    status?: NotificationStatus;
    fromId?: number;
    toId?: number;
    chatId?: number;
    appointmentId?: number;
}

export interface IChatMessage {
    id?: number;
    from?: string;
    to?: string;
    body?: string;
    order?: number;
    emittedDate?: Moment;
    receivedDate?: Moment;
    readDate?: Moment;
    latitude?: number;
    longitud?: number;
    chatId?: number;
  }
export interface IChat {
    id?: number;
    owner?: string;
    ownerId?: number;
    to?: string;
    toId?: number;
    withContact?: string;
    subject?: string;
    createdDate?: Moment;
    lastMessage?: Moment;
    type?: ChatType;
    appointmentId?: number;
    notificationId?: number;
    messages?: IChatMessage[];
  }
  
export interface IAppointment {
    id?: number;
    from?: string;
    to?: string;
    text?: string;
    description?: string;
    startDate?: Moment;
    endDate?: Moment;
    allDay?: boolean;
}

export interface ISafeKeepingProject {
    id?: number;
    name?: string;
    description?: string;
    parent1?: string;
    parent2?: string;
    mediator?: string;
    start?: Moment;
    periods?: ISafeKeepingPeriod[];
}

export interface ISafeKeepingPeriod {
    id?: number;
    year?: string;
    owner?: string;
    text?: string;
    description?: string;
    startDate?: Moment;
    endDate?: Moment;
    backgroundColor?: string;
    textColor?: string;
    allDay?: boolean;
    safeKeepingProjectId?: number;
}
