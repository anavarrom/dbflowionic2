import { Component, OnInit } from '@angular/core';
import { Select, Store, Actions } from '@ngxs/store';
import { ChatStore } from 'src/app/core/states/chat.state';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/core/models/chat';
import { ChatMessage } from 'src/app/core/models/message';
import { NewMessage } from 'src/app/core/actions/chat.action';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss'],
})
export class ChatDetailComponent implements OnInit {

  @Select(ChatStore.selected) public selected$: Observable<Chat>;

  newMessageText = 'Patata';
  
  constructor(private store: Store, private actions$: Actions) { }

  ngOnInit() {


  }

  sendMessage() {

    let msg: ChatMessage = new ChatMessage();
    msg.body = this.newMessageText;
    // msg.chatId = this.selected$.

    this.store.dispatch(new NewMessage(msg));

  }
}
