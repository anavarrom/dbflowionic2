import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationStore } from 'src/app/core/states/notification.state';
import { Store, Select, ofActionSuccessful, Actions } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss'],
})
export class NotificationDetailComponent implements OnInit {

  @Select(NotificationStore.selected) public selected$: Observable<Notification>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {}

}
