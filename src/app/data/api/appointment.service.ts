import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from '../../shared/input.constants';
import { createRequestOption } from '../../shared/request-util';
import { IAppointment } from '../../data/interfaces/models';

import {environment} from '../../../environments/environment';

type AppointmentResponseType = HttpResponse<IAppointment>;
type AppointmentArrayResponseType = HttpResponse<IAppointment[]>;

@Injectable()
export class AppointmentService {

  public appointmentURL    : string = environment.basePath + '/dbflowserver/api/';
  public resourceUrl       : string = this.appointmentURL + 'appointments';
  public userAppointmentURL: string = this.appointmentURL + 'userappointments';

  constructor(protected http: HttpClient) {}

  create(notification: IAppointment): Observable<AppointmentResponseType> {
    const copy = this.convertDateFromClient(notification);
    return this.http
      .post<IAppointment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: AppointmentResponseType) => this.convertDateFromServer(res)));
  }

  update(chat: IAppointment): Observable<AppointmentResponseType> {
    const copy = this.convertDateFromClient(chat);
    return this.http
      .put<IAppointment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: AppointmentResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<AppointmentResponseType> {
    return this.http
      .get<IAppointment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: AppointmentResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<AppointmentArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAppointment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: AppointmentArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryAllChatsFromUser(req?: any): Observable<AppointmentArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAppointment[]>(this.userAppointmentURL, { params: options, observe: 'response' })
      .pipe(map((res: AppointmentArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(appointment: IAppointment): IAppointment {
    const copy: IAppointment = Object.assign({}, appointment, {
      startDate: appointment.startDate != null && appointment.startDate.isValid() ? appointment.startDate.format(DATE_FORMAT) : null,
      endDate: appointment.endDate != null && appointment.endDate.isValid() ? appointment.endDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: AppointmentResponseType): AppointmentResponseType {
    if (res.body) {
      res.body.startDate     = res.body.startDate != null ? moment(res.body.startDate) : null;
      res.body.endDate      = res.body.endDate != null ? moment(res.body.endDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: AppointmentArrayResponseType): AppointmentArrayResponseType {
    if (res.body) {
      res.body.forEach((appointment: IAppointment) => {
        appointment.startDate = appointment.startDate != null ? moment(appointment.startDate) : null;
        appointment.endDate = appointment.endDate != null ? moment(appointment.endDate) : null;
      });
    }
    return res;
  }
}
