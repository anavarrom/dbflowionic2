import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import { LoadAppointments, SelectAppointment } from '../actions/appointments.actions';
import * as R from 'ramda';
import * as moment from 'moment';

import { Appointment } from '../models/appointment';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AppointmentService } from 'src/app/data/api/appointment.service';
import { IAppointment } from 'src/app/data/interfaces/models';

/*
function isRead(notif: INotification) {
  return (notif.status === NotificationStatus.READ);
}

function isReceived(notif: INotification) {
  return (notif.status !== NotificationStatus.READ);
}

function toAppointment(notif: INotification): Appointment{
  return new Appointment(notif.id, notif.subject, notif.body, new Date(), notif.dueDate.toDate(), true);
}
*/

// Create an interface for
export interface AppointmentState {
    // notifications: Notification[];
    appointments: Appointment[];
    size: number;
    selectedId: number;
}

// Creamos nuestro estado con la anotación @State
// Le damos el tipo al estado.
// Le damos nombre al 'slice' o partición del estado.
// Damos valor por defecto al estado.
@State({
    name: 'appointment',
    defaults: {
      appointments: [],
      size: 0,
      selectedId: 0,
    }
})
@Injectable()
export class AppointmentStore {

    constructor(private store: Store,
                private appointmentService: AppointmentService) {
    }

    @Selector()
    static all(state: AppointmentState): Appointment[] {
      return state.appointments;
    }


    @Selector()
    static selected(state: AppointmentState): Appointment | null {
      return R.find((app: Appointment) => (app.id  === state.selectedId), state.appointments);
    }

    /**
     * Load all the appointments of a user
     *
     * @remarks
     * This action is part of the {@link core-library#Statistics | Statistics subsystem}.
     *
     * @param stateContext - context
     * @returns XXXX
     *
     * @beta
     */
    @Action(LoadAppointments)
    LoadAppointments(stateContext: StateContext<AppointmentState>) {
        this.appointmentService.queryAllChatsFromUser().subscribe(
            // (notifs: INotification[]) => {
            (apps: HttpResponse<IAppointment[]>) => {

              // Actualizamos el estado con pathState({nombre_propiedad: valor}).
              stateContext.patchState({ appointments: apps.body, size: apps.body.length });
            }, err => {
              // Log errors if any
              console.log(err);
            }
        );
    }

    @Action(SelectAppointment)
    SelectAppointment(stateContext: StateContext<AppointmentState>, action: SelectAppointment) {
      stateContext.patchState({ selectedId: action.id});
    }
  }
