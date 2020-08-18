import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from '../../shared/input.constants';
import { createRequestOption } from '../../shared/request-util';
import { INotification } from '../../data/interfaces/models';

import {environment} from '../../../environments/environment';

type EntityResponseType = HttpResponse<INotification>;
type EntityArrayResponseType = HttpResponse<INotification[]>;

@Injectable()
export class NotificactionService {
  public resourceUrl = environment.basePath + '/dbflowserver/api/notifications';

  constructor(protected http: HttpClient) {}

  create(notification: INotification): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(notification);
    return this.http
      .post<INotification>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(chat: INotification): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chat);
    return this.http
      .put<INotification>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INotification>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INotification[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(notification: INotification): INotification {
    const copy: INotification = Object.assign({}, notification, {
      dueDate: notification.dueDate != null && notification.dueDate.isValid() ? notification.dueDate.format(DATE_FORMAT) : null,
      emittedDate: notification.emittedDate != null && notification.emittedDate.isValid() ? 
                   notification.emittedDate.format(DATE_FORMAT) : null,
      readDate: notification.readDate != null && notification.readDate.isValid() ? notification.readDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dueDate      = res.body.dueDate != null ? moment(res.body.dueDate) : null;
      res.body.emittedDate  = res.body.emittedDate != null ? moment(res.body.emittedDate) : null;
      res.body.readDate     = res.body.readDate != null ? moment(res.body.readDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((notification: INotification) => {
        notification.dueDate = notification.dueDate != null ? moment(notification.dueDate) : null;
        notification.emittedDate = notification.emittedDate != null ? moment(notification.emittedDate) : null;
        notification.readDate = notification.readDate != null ? moment(notification.readDate) : null;
      });
    }
    return res;
  }
}
