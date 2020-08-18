import { Component } from '@angular/core';
import { faBell, faCalendar, faComment, IconDefinition } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  faBell: IconDefinition      = faBell;
  faCalendar: IconDefinition  = faCalendar;
  faComment: IconDefinition   = faComment;

  constructor() {}

}
