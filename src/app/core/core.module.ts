// External Modules
import { NgModule          } from '@angular/core';
import { CommonModule      } from '@angular/common';

import { NgxsModule } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
// import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';



// Custom modules
// Custom Components
// import { MessageStore  } from './stores/message-store';
// import { UserStore     } from './stores/user-store';
// import { CalendarStore     } from './stores/calendar-store';
// import { NotificationStore     } from './stores/notification-store';
// import { NotificationState     } from './stores/notification.state';
import { NotificationStore } from './states/notification.state';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeycloakBearerInterceptor } from 'keycloak-angular';
import { ChatStore } from './states/chat.state';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory, StompService, StompConfig } from '@stomp/ng2-stompjs';
import { SessionStore } from './states/session.state';
import { AppointmentStore } from './states/appointment.state';
import { SafekeepingStore } from './states/safekeeping.state';
import { NotificactionService } from '../data/api/notification.service';
import { ChatService } from '../data/api/chat.service';
import { MessageService } from '../data/api/message.service';
import { AppointmentService } from '../data/api/appointment.service';
import { SafeKeepingPeriodService } from '../data/api/safekeepingperiod.service';
import { SafeKeepingProjectService } from '../data/api/safekeepingproject.service';

// Project Services
// import { UsersService           } from './services/users.service';
// import { NotificationService           } from './services/notification.service';
// import { CalendarService           } from './services/calendar.service';
// import { ProcessMessageComponent} from './messages/process-message/process-message.component';
// import { SearchComponent } from './search/search.component'

const dbFlow6Stores = [
  NotificationStore,
  ChatStore,
  SessionStore,
  AppointmentStore,
  SafekeepingStore
];

const externalModules = [
  CommonModule,
  NgxsModule.forRoot(dbFlow6Stores, { developmentMode: !environment.production }),
  //NgxsSelectSnapshotModule.forRoot(),
  NgxsReduxDevtoolsPluginModule.forRoot(),
  NgxsLoggerPluginModule.forRoot(),
  NgxsRouterPluginModule.forRoot(),
];

const dbFlow6Services = [
  NotificactionService,
  ChatService,
  MessageService,
  AppointmentService,
  SafeKeepingPeriodService,
  SafeKeepingProjectService
];

@NgModule({
  imports: [
    externalModules
  ],
  entryComponents: [
  ],
  declarations: [
  ],
  providers:  [
    dbFlow6Stores,
    dbFlow6Services,
    StompService,
    {
      provide: StompConfig,
      useValue: environment.stompConfig
    }/*
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    },
    {
      provide: InjectableRxStompConfig,
      useValue: environment.rxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }*/
  ],
  exports: [
  ],
})
export class CoreModule { }
