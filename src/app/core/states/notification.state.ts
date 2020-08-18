import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import { LoadNotifications, SelectNotification } from '../actions/notification.actions';
import { NotificactionService } from 'src/app/data/api/notification.service';
import { INotification, NotificationStatus } from 'src/app/data/interfaces/models';

import * as R from 'ramda';
import { Notification } from '../models/notification';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Appointment } from '../models/appointment';
import * as moment from 'moment';

// import { Notification, INotification                 } from '../models/notification';
// import { PaginateOptions, IPaginateResult2            } from '../services/basePagination';


function isRead(notif: INotification) {
  return (notif.status === NotificationStatus.READ);
}

function isReceived(notif: INotification) {
  return (notif.status !== NotificationStatus.READ);
}

function toAppointment(notif: INotification): Appointment{
  return new Appointment(notif.id, notif.from, notif.to, notif.subject, notif.body, moment(), notif.dueDate, true);
}


// Create an interface for
export interface NotificationState {
    // notifications: Notification[];
    pendingNotifs: Notification[];
    readNotifs: Notification[];
    allNotifs: Notification[];
    pendingSize: number;
    readSize: number;
    selectedId: number;
}

// Creamos nuestro estado con la anotación @State
// Le damos el tipo al estado.
// Le damos nombre al 'slice' o partición del estado.
// Damos valor por defecto al estado.
@State({
    name: 'notification',
    defaults: {
      pendingNotifs: [],
      readNotifs: [],
      allNotifs: [],
      pendingSize: 0,
      readSize: 0,
      selectedId: 0,
    }
})
@Injectable()
export class NotificationStore {
    // private notificationOptions: PaginateOptions   = null;

    constructor(private store: Store,
                private notifService: NotificactionService) {
        // this.notificationOptions        = new PaginateOptions();
        // this.notificationOptions.limit  = 50;
        // this.notificationOptions.page   = 0;
    }

    @Selector()
    // @ImmutableSelector()
    static pending(state: NotificationState): Notification[] {
      return state.pendingNotifs;
    }

    @Selector()
    // @ImmutableSelector()
    static read(state: NotificationState): Notification[] {
      return state.readNotifs;
    }

    @Selector()
    // @ImmutableSelector()
    static all(state: NotificationState): Notification[] {
      return state.allNotifs;
    }

    @Selector()
    // @ImmutableSelector()
    static allAsAppointments(state: NotificationState): Appointment[] {
      return R.map(toAppointment, state.allNotifs);
    }

    @Selector()
    static selected(state: NotificationState): Notification | null {
      // tslint:disable-next-line: only-arrow-functions
      return R.find((n: Notification) => (n.id  === state.selectedId), state.allNotifs);
      // return R.find((n: Notification) => (n.id  === state.selectedId), state.pendingNotifs) ||
      //        R.find((n: Notification) => (n.id  === state.selectedId), state.readNotifs);
    }

    /*@Selector()
    static selectedRead(state: NotificationState): Notification | null {
      return R.find((n: Notification) => (n.id  === state.selectedReadId), state.readNotifs);
    }*/

    @Action(LoadNotifications)
    LoadNotifications(stateContext: StateContext<NotificationState>) {
        this.notifService.query().subscribe(
            // (notifs: INotification[]) => {
            (notifs: HttpResponse<INotification[]>) => {
              const filterRead = R.filter(isRead);
              const filterReceived = R.filter(isReceived);

              const rNotifs: Notification[] = filterRead(notifs.body) as Notification[];
              const receivedNotifs: Notification[] = filterReceived(notifs.body) as Notification[];

              // const notifs2: Notification[] = notifs.docs as Notification[];

              // Actualizamos el estado con pathState({nombre_propiedad: valor}).
              stateContext.patchState({ allNotifs: notifs.body });
              stateContext.patchState({ pendingNotifs: receivedNotifs, pendingSize: receivedNotifs.length });
              stateContext.patchState({ readNotifs: rNotifs, readSize: rNotifs.length });
            }, err => {
              // Log errors if any
              console.log(err);
            }
        );
    }

    @Action(SelectNotification)
    SelectNotification(stateContext: StateContext<NotificationState>, action: SelectNotification) {
      stateContext.patchState({ selectedId: action.id});
    }

/*    @Action(SelectReadNotification)
    SelectPeSelectReadNotificationndingNotification(stateContext: StateContext<NotificationState>, action: SelectReadNotification) {
      stateContext.patchState({ selectedReadId: action.id});
    }*/

  }
