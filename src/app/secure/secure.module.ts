// External Modules
import { NgModule          } from '@angular/core';
import { CommonModule      } from '@angular/common';
import { FormsModule       } from '@angular/forms';
// import { MobxAngularModule } from 'mobx-angular';
import { RouterModule, Routes } from '@angular/router';
// import { OnsenModule       } from 'ngx-onsenui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// import { FlexLayoutModule } from '@angular/flex-layout';
// import { NgxJsonViewerModule } from 'ngx-json-viewer';

// Custom modules
import {CoreModule} from '../core/core.module';
import { NgCalendarModule  } from 'ionic2-calendar';

// Custom Components
// import { MessageStore  } from '../core/stores/message-store';
// import { UserStore     } from '../core/stores/user-store';
// import { MainComponent } from './main/main.component';

// import { CollectionNotificationsComponent } from './notifications/collection-notifications/collection-notifications.component';
// import { NotificationDetailComponent } from './notifications/notification-detail/notification-detail.component';

// Project Services
// import { UsersService           } from '../core/services/users.service';
// import { SecureSocketioService  } from './secure-socketio.service';
import { SecureComponent        } from './secure.component';
import { NotificationsTabPageComponent } from './notifications/notifications-tab-page/notifications-tab-page.component';
import { NotificationDetailComponent } from './notifications/notification-detail/notification-detail.component';
import { CalendarsTabePageComponent } from './calendars/calendars-tabe-page/calendars-tabe-page.component';
import { ChatsTabePageComponent } from './chats/chats-tabe-page/chats-tabe-page.component';
import { ChatDetailComponent } from './chats/chat-detail/chat-detail.component';

const externalModules = [
  CommonModule,
  FormsModule,
  // MobxAngularModule,
  RouterModule,
  // OnsenModule
  NgCalendarModule
];

const dbFlow6Components = [
   SecureComponent,
  // MainComponent,
  NotificationsTabPageComponent,
  NotificationDetailComponent,
  CalendarsTabePageComponent,
  ChatsTabePageComponent,
  ChatDetailComponent
];


@NgModule({
  imports: [
    externalModules,
    CoreModule
  ],
  entryComponents: [
    dbFlow6Components
  ],
  declarations: [
    dbFlow6Components
  ],
//  providers: [{ provide: Todos, useClass: remotedev(Todos) }],
  providers: [],
  exports: [SecureComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SecureModule { }
