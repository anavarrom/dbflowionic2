import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { Logout, Login, Init, NotifyError } from '../actions/session.actions';
import { DbFlowAccount, DbAccountConfiguration } from '../models/account';
import { IDbFlowAccount, IDbAccountConfiguration } from 'src/app/data/interfaces/models';
import { LoadSafeKeepingProjects } from '../actions/project.actions';
import { DbFlowError, ErrorSeverity } from '../models/error';
import { patch, insertItem } from '@ngxs/store/operators';
import { Navigate } from '@ngxs/router-plugin';

export interface SessionState {
    userAccount: IDbFlowAccount;
    userConfig: IDbAccountConfiguration;
    errors: DbFlowError [];
    lastError: DbFlowError;
    
}

// 
@State({
    name: 'session_store',
    defaults: {
        userAccount : null,
        userConfig: null,
        errors: [],
        lastError: null
    }
})
@Injectable()
export class SessionStore {

    constructor(private store: Store) {
    }

    @Selector()
    static currentUser(state: SessionState): IDbFlowAccount | null {
      return state.userAccount;
    }

    @Selector()
    static userConfiguration(state: SessionState): IDbAccountConfiguration | null {
      return state.userConfig;
    }

    @Selector()
    static me(state: SessionState): string | null {
      return state.userAccount.username;
    }

    @Selector()
    static isLoggedIn(state: SessionState): boolean {
      return (state.userAccount != null);
    }

    @Selector()
    static lastError(state: SessionState): DbFlowError | null{
      return state.lastError;
    }

    @Action(Login)
    Login(stateContext: StateContext<SessionState>, action: Login) {
        const account: DbFlowAccount = {
            username: action.loginData.username,
            firstName: action.loginData.firstName,
            lastName: action.loginData.lastName,
            enabled: action.loginData.enabled,
            email: action.loginData.email,
            authorities: [],
            imageUrl: ''
        };

        const config: DbAccountConfiguration = {
          myBackgroundColor: 'lightblue',
          otherBackgoundColor: 'lightcoral'
        };

        stateContext.patchState({ userAccount: account, userConfig: config});

        this.store.dispatch( new Init());
      }

    @Action(Init)
    Init(stateContext: StateContext<SessionState>, action: Init) {
      // Cargamos los proyectos
      this.store.dispatch( new LoadSafeKeepingProjects());
    }

    @Action(Logout)
    Logout(stateContext: StateContext<SessionState>) {
    }

    @Action(NotifyError)
    NotifyError(stateContext: StateContext<SessionState>, action: NotifyError) {
      stateContext.setState(
        patch({
          errors: insertItem<DbFlowError>(action.error),
          lastError: action.error
        }));
      switch (action.error.severity)  {
        case ErrorSeverity.CRITICAL:
          this.store.dispatch( new Navigate(['/error'] ));
          break;
        case ErrorSeverity.HIGH:
           break;
        default:
           break;
      }
    }

  }
