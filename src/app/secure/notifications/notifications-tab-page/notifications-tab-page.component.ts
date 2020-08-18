import { Component, OnInit } from '@angular/core';
import { Store, Select, ofActionSuccessful, Actions } from '@ngxs/store';
import { LoadNotifications, SelectNotification } from 'src/app/core/actions/notification.actions';
import { Observable } from 'rxjs';
import { NotificationState, NotificationStore } from 'src/app/core/states/notification.state';
import { Navigate } from '@ngxs/router-plugin';
import {Notification} from '../../../core/models/notification'; 

@Component({
  selector: 'app-notifications-tab-page',
  templateUrl: './notifications-tab-page.component.html',
  styleUrls: ['./notifications-tab-page.component.scss'],
})
export class NotificationsTabPageComponent implements OnInit {
  // Selected type
  public type = 1;

  constructor(private store: Store, private actions$: Actions)  {

  }

  @Select(NotificationStore.pending) public pending$: Observable<Notification[]>;
  @Select(NotificationStore.read) public read$: Observable<Notification[]>;

  //@Select(state => state.notification)  notification$: Observable<NotificationState>;

  ngOnInit() {
    this.store.dispatch(new LoadNotifications());

    this.actions$.pipe(ofActionSuccessful(SelectNotification)).subscribe(() => this.store.dispatch(new Navigate(['/NotificationDetail'])));

  }

  segmentChanged(ev: CustomEvent) {
    console.log('Segment changed', ev);
    if ( (ev.detail) && (ev.detail.value)) {
      this.type = ev.detail.value;
    }
  }

  notificationSlected(id: number) {
    this.store.dispatch(new SelectNotification(id));
  }
}
