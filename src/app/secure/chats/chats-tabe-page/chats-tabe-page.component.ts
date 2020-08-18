import { Component, OnInit } from '@angular/core';
import { Store, Select, ofActionSuccessful, Actions } from '@ngxs/store';
import { LoadChats, SelectChat } from 'src/app/core/actions/chat.action';
import { ChatService } from 'src/app/data/api/chat.service';
import { Observable } from 'rxjs';
import { ChatStore } from 'src/app/core/states/chat.state';
import { IChat } from 'src/app/data/interfaces/models';
import { Navigate } from '@ngxs/router-plugin';


@Component({
  selector: 'app-chats-tabe-page',
  templateUrl: './chats-tabe-page.component.html',
  styleUrls: ['./chats-tabe-page.component.scss'],
})
export class ChatsTabePageComponent implements OnInit {

  @Select(ChatStore.all) public chats$: Observable<IChat[]>;


  constructor(private store: Store, private actions$: Actions) { }

  ngOnInit() {
    this.store.dispatch(new LoadChats());

    this.actions$.pipe(ofActionSuccessful(SelectChat)).subscribe(() => this.store.dispatch(new Navigate(['/ChatDetail'])));
  }

  chatSelected(id: number) {
    this.store.dispatch(new SelectChat(id));
  }
}
