import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from '../../shared/input.constants';
import { createRequestOption } from '../../shared/request-util';
import { IChat, IChatMessage } from '../../data/interfaces/models';

import {environment} from '../../../environments/environment';

type ChatResponseType = HttpResponse<IChat>;
type ChatArrayResponseType = HttpResponse<IChat[]>;

@Injectable()
export class ChatService {
  public chatURL: string      = environment.basePath + '/dbflowchat/api/';
  public resourceUrl: string  = this.chatURL + 'chats';
  public userChatsURL: string = this.chatURL + 'userchats';

  constructor(protected http: HttpClient) {}

  // TODO: Gestionar ataques CSRF. Para hacer que funcione el crear he 
  // tenido que desaactivar el CSRF en el SecuirtyConfig del Gateway  
  create(chat: IChat): Observable<ChatResponseType> {
    const copy = this.convertDateFromClient(chat);
    return this.http
      .post<IChat>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: ChatResponseType) => this.convertDateFromServer(res)));
  }

  update(chat: IChat): Observable<ChatResponseType> {
    const copy = this.convertDateFromClient(chat);
    return this.http
      .put<IChat>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: ChatResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<ChatResponseType> {
    return this.http
      .get<IChat>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: ChatResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<ChatArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChat[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: ChatArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryAllChatsFromUser(req?: any): Observable<ChatArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChatMessage[]>(this.userChatsURL, { params: options, observe: 'response' })
      .pipe(map((res: ChatArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(chat: IChat): IChat {
    const copy: IChat = Object.assign({}, chat, {
      createdDate: chat.createdDate != null && chat.createdDate.isValid() ? chat.createdDate.format(DATE_FORMAT) : null,
      lastMessage: chat.lastMessage != null && chat.lastMessage.isValid() ? chat.lastMessage.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: ChatResponseType): ChatResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
      res.body.lastMessage = res.body.lastMessage != null ? moment(res.body.lastMessage) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: ChatArrayResponseType): ChatArrayResponseType {
    if (res.body) {
      res.body.forEach((chat: IChat) => {
        chat.createdDate = chat.createdDate != null ? moment(chat.createdDate) : null;
        chat.lastMessage = chat.lastMessage != null ? moment(chat.lastMessage) : null;
      });
    }
    return res;
  }
}
