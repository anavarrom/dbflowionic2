import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import { LoadAppointments, SelectAppointment } from '../actions/appointments.actions';
import * as R from 'ramda';
import * as moment from 'moment';

import { Appointment } from '../models/appointment';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AppointmentService } from 'src/app/data/api/appointment.service';
import { IAppointment, ISafeKeepingPeriod, ISafeKeepingProject } from 'src/app/data/interfaces/models';
import { SafeKeepingPeriod } from '../models/safekeepingPeriod';
import { SafeKeepingPeriodService } from 'src/app/data/api/safekeepingperiod.service';
import { LoadSafeKeepingPeriods, NewSafeKeepingPeriod, UpdateSafeKeepingPeriod, LoadSafeKeepingProjects, SafeKeepingPeriodActionOK, SafeKeepingPeriodActionError, DeleteSafeKeepingPeriod } from '../actions/project.actions';
import { patch, insertItem, updateItem, removeItem } from '@ngxs/store/operators';
import { SafeKeepingProjectService } from 'src/app/data/api/safekeepingproject.service';
import { SafeKeepingProject } from '../models/safeKeepingProject';
import { SessionStore } from './session.state';

// Create an interface for
export interface SafekeepingState {
    safekeepingProjects: SafeKeepingProject[];
    safekeepingPeriods: SafeKeepingPeriod[];
    safekeepingPeriodsByDate: Map<string, ISafeKeepingPeriod>;
    size: number;
    selectedPeriodId: number;
    selectedProject: SafeKeepingProject;
    selectedProjectPartner: string;
    currentYear: string;
}

// Creamos nuestro estado con la anotación @State
@State({
    name: 'safekeeping',
    defaults: {
      safekeepingProjects: [],
      safekeepingPeriods: [],
      safekeepingPeriodsByDate: {},
      size: 0,
      selectedPeriodId: 0,
      selectedProject: null,
      selectedProjectPartner: '',
      currentYear: '2020'
    }
})
@Injectable()
export class SafekeepingStore {
    constructor(private store: Store,
                private safeKeepingService: SafeKeepingPeriodService,
                private safeKeepingProjectService: SafeKeepingProjectService) {
    }

    @Selector()
    static allPeriods(state: SafekeepingState): SafeKeepingPeriod[] {
      return state.safekeepingPeriods;
    }

    @Selector()
    static allPeriodsByDate(state: SafekeepingState): Map<string, ISafeKeepingPeriod> {
      return state.safekeepingPeriodsByDate;
    }

    @Selector()
    static selectedPeriod(state: SafekeepingState): SafeKeepingPeriod | null {
      return R.find((app: SafeKeepingPeriod) => (app.id  === state.selectedPeriodId), state.safekeepingPeriods);
    }

    @Selector()
    static selectedProject(state: SafekeepingState): SafeKeepingProject | null {
      return state.selectedProject;
    }

    @Selector()
    static selectedProjectPartner(state: SafekeepingState): string | null {
      return state.selectedProjectPartner;
    }


    @Selector()
    static currentYear(state: SafekeepingState): string | null {
      return state.currentYear;
    }

    /**
     * Load all the peridos
     *
     * @remarks
     * This action is part of the {@link core-library#Statistics | Statistics subsystem}.
     *
     * @param stateContext - context
     * @returns XXXX
     *
     * @beta
     */
    @Action(LoadSafeKeepingProjects)
    LoadSafeKeepingProjects(stateContext: StateContext<SafekeepingState>, action: LoadSafeKeepingProjects) {
      this.safeKeepingProjectService.queryAllUserProjects().subscribe(
        // (notifs: INotification[]) => {
        (projects: HttpResponse<ISafeKeepingProject[]>) => {
          // Actualizamos el estado con pathState({nombre_propiedad: valor}).
          const me = this.store.selectSnapshot(SessionStore.me);
          const selectedProject = projects.body[0];
          let partner: string = '';
          if (selectedProject) {
            partner = (selectedProject.parent1 === me) ? selectedProject.parent2 : selectedProject.parent1;
          }
          stateContext.patchState({ safekeepingProjects: projects.body,
                                    selectedProject: projects.body[0],
                                    selectedProjectPartner: partner });
          this.store.dispatch(new LoadSafeKeepingPeriods());
        }, err => {
          // Log errors if any
          console.log(err);
        }
    );
}

    /**
     * Load all the peridos
     *
     * @remarks
     * This action is part of the {@link core-library#Statistics | Statistics subsystem}.
     *
     * @param stateContext - context
     * @returns XXXX
     *
     * @beta
     */
    @Action(LoadSafeKeepingPeriods)
    LoadSafeKeepingPeriods(stateContext: StateContext<SafekeepingState>) {
        const ctx: SafekeepingState = stateContext.getState();
        const currentProjectId      = ctx.selectedProject.id;
        const currentYear           = ctx.currentYear;
        // TODO:Gestionar peticiones correctas y erores
        if (ctx.safekeepingPeriods.length > 0) {
          return;
        }

        this.safeKeepingService.queryAllYearProjectsSafeKeepingPeriods(currentProjectId, currentYear).subscribe(
            // (notifs: INotification[]) => {
            (periods: HttpResponse<ISafeKeepingPeriod[]>) => {
              let datePeriods = new Map();
              periods.body.forEach(period => {
                datePeriods.set(period.startDate.toDate().toDateString(), period);
              });

              // Actualizamos el estado con pathState({nombre_propiedad: valor}).
              stateContext.patchState({ safekeepingPeriods: periods.body, 
                                        safekeepingPeriodsByDate: datePeriods, 
                                        size: periods.body.length });
            }, err => {
              // Log errors if any
              console.log(err);
            }
        );
    }

    /**
     * Load all the peridos
     *
     * @remarks
     * This action is part of the {@link core-library#Statistics | Statistics subsystem}.
     *
     * @param stateContext - context
     * @returns XXXX
     *
     * @beta
     */
    @Action(NewSafeKeepingPeriod)
    NewSafeKeepingPeriod(stateContext: StateContext<SafekeepingState>, action: NewSafeKeepingPeriod) {
      let period: SafeKeepingPeriod = action.period;
      period.year = stateContext.getState().currentYear;
      period.safeKeepingProjectId = stateContext.getState().selectedProject.id;
       
      this.safeKeepingService.create(period).subscribe(
        (periodCreated: HttpResponse<SafeKeepingPeriod>) => {
          stateContext.setState(
            patch({
              safekeepingPeriods: insertItem<ISafeKeepingPeriod>(periodCreated.body)
            }));
          this.store.dispatch(new SafeKeepingPeriodActionOK());
          }, err => {
            this.store.dispatch(new SafeKeepingPeriodActionError('Error creating new period'));
          }
      );
    }

    /**
     * Load all the peridos
     *
     * @remarks
     * This action is part of the {@link core-library#Statistics | Statistics subsystem}.
     *
     * @param stateContext - context
     * @returns XXXX
     *
     * @beta
     */
    @Action(UpdateSafeKeepingPeriod)
    UpdateSafeKeepingPeriod(stateContext: StateContext<SafekeepingState>, action: UpdateSafeKeepingPeriod) {
      // let selectedPeriod: SafeKeepingPeriod = R.find((p: SafeKeepingPeriod) => (chat.id  === action.id), stateContext.getState().chats);
      let selectedPeriod: SafeKeepingPeriod =
        R.find((period: SafeKeepingPeriod) => (period.id  === action.period.id), stateContext.getState().safekeepingPeriods);
      if (!selectedPeriod) {
        this.store.dispatch(new SafeKeepingPeriodActionError("No period selected to update"));
        return;
      }
      this.safeKeepingService.update(action.period).subscribe(
        (periodUpdated: HttpResponse<SafeKeepingPeriod>) => {
          stateContext.setState(
            patch({
              safekeepingPeriods: updateItem<ISafeKeepingPeriod>(period => period.id === periodUpdated.body.id, periodUpdated.body)
            }));
          this.store.dispatch(new SafeKeepingPeriodActionOK());
          }, err => {
            this.store.dispatch(new SafeKeepingPeriodActionError('Error updating period'));
        }
      );
    }

    @Action(DeleteSafeKeepingPeriod)
    DeleteSafeKeepingPeriod(stateContext: StateContext<SafekeepingState>, action: DeleteSafeKeepingPeriod) {
      // let selectedPeriod: SafeKeepingPeriod = R.find((p: SafeKeepingPeriod) => (chat.id  === action.id), stateContext.getState().chats);
      let selectedPeriod: SafeKeepingPeriod =
        R.find((period: SafeKeepingPeriod) => (period.id  === action.period.id), stateContext.getState().safekeepingPeriods);
      if (!selectedPeriod) {
        this.store.dispatch(new SafeKeepingPeriodActionError("No period selected to update"));
        return;
      }

      this.safeKeepingService.delete(action.period.id).subscribe(
        (periodDeleted: HttpResponse<any>) => {
          stateContext.setState(
            patch({
              safekeepingPeriods: removeItem<ISafeKeepingPeriod>(period => period.id === action.period.id)
            }));
          this.store.dispatch(new SafeKeepingPeriodActionOK());
          }, err => {
            this.store.dispatch(new SafeKeepingPeriodActionError('Error deleteing period'));
        }
      );
    }

    @Action(SafeKeepingPeriodActionOK)
    SafeKeepingPeriodActionOK(stateContext: StateContext<SafekeepingState>, action: SafeKeepingPeriodActionOK) {
    }

    @Action(SafeKeepingPeriodActionError)
    SafeKeepingPeriodActionError(stateContext: StateContext<SafekeepingState>, action: SafeKeepingPeriodActionError) {
    }
 }