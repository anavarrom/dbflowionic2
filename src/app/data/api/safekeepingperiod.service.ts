import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../shared/input.constants';
import { createRequestOption } from '../../shared/request-util';
import { ISafeKeepingPeriod } from '../interfaces/models';

import {environment} from '../../../environments/environment';

type SafeKeepingPeriodType         = HttpResponse<ISafeKeepingPeriod>;
type SafeKeepingPeriodResponseType = HttpResponse<ISafeKeepingPeriod[]>;

@Injectable()
export class SafeKeepingPeriodService {

  public url               : string = environment.basePath + '/dbflowserver/api/';
  public resourceUrl       : string = this.url + 'safe-keeping-periods';
  public allProjectsPeriods : string = this.url + 'project-safe-keeping-periods';
  public allYearProjectsPeriods : string = this.url + 'project-year-safe-keeping-periods';
  // public userAppointmentURL: string = this.appointmentURL + 'userappointments';

  constructor(protected http: HttpClient) {}

  create(notification: ISafeKeepingPeriod): Observable<SafeKeepingPeriodType> {
    const copy = this.convertDateFromClient(notification);
    return this.http
      .post<ISafeKeepingPeriod>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: SafeKeepingPeriodType) => this.convertDateFromServer(res)));
  }

  update(chat: ISafeKeepingPeriod): Observable<SafeKeepingPeriodType> {
    const copy = this.convertDateFromClient(chat);
    return this.http
      .put<ISafeKeepingPeriod>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: SafeKeepingPeriodType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<SafeKeepingPeriodType> {
    return this.http
      .get<ISafeKeepingPeriod>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: SafeKeepingPeriodType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<SafeKeepingPeriodResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISafeKeepingPeriod[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: SafeKeepingPeriodResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryAllProjectsSafeKeepingPeriods(id: number, req?: any): Observable<SafeKeepingPeriodResponseType> {
    let options = createRequestOption(req);
    // options.append('id', id.toString());
    return this.http
      .get<ISafeKeepingPeriod[]>(`${this.allProjectsPeriods}/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: SafeKeepingPeriodResponseType) => this.convertDateArrayFromServer(res)));
    }

    queryAllYearProjectsSafeKeepingPeriods(id: number, year: string, req?: any): Observable<SafeKeepingPeriodResponseType> {
      let options = createRequestOption(req);
      // options.append('id', id.toString());
      return this.http
        .get<ISafeKeepingPeriod[]>(`${this.allYearProjectsPeriods}/${id}/${year}`, { params: options, observe: 'response' })
        .pipe(map((res: SafeKeepingPeriodResponseType) => this.convertDateArrayFromServer(res)));
      }

    delete(id: number): Observable<HttpResponse<any>> {
      return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

  protected convertDateFromClient(appointment: ISafeKeepingPeriod): ISafeKeepingPeriod {
    const copy: ISafeKeepingPeriod = Object.assign({}, appointment, {
      startDate: appointment.startDate != null && appointment.startDate.isValid() ? appointment.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: appointment.endDate != null && appointment.endDate.isValid() ? appointment.endDate.format(DATE_TIME_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: SafeKeepingPeriodType): SafeKeepingPeriodType {
    if (res.body) {
      res.body.startDate     = res.body.startDate != null ? moment(res.body.startDate) : null;
      res.body.endDate      = res.body.endDate != null ? moment(res.body.endDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: SafeKeepingPeriodResponseType): SafeKeepingPeriodResponseType {
    if (res.body) {
      res.body.forEach((appointment: ISafeKeepingPeriod) => {
        appointment.startDate = appointment.startDate != null ? moment(appointment.startDate) : null;
        appointment.endDate = appointment.endDate != null ? moment(appointment.endDate) : null;
      });
    }
    return res;
  }
}
