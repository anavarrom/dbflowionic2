import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../shared/input.constants';
import { createRequestOption } from '../../shared/request-util';
import { ISafeKeepingProject } from '../interfaces/models';

import {environment} from '../../../environments/environment';

type SafeKeepingProjectType         = HttpResponse<ISafeKeepingProject>;
type SafeKeepingProjectResponseType = HttpResponse<ISafeKeepingProject[]>;

@Injectable()
export class SafeKeepingProjectService {

  public url               : string = environment.basePath + '/dbflowserver/api/';
  public resourceUrl       : string = this.url + 'safe-keeping-projects';
  public userProjectsURL       : string = this.url + 'user-safe-keeping-projects';
  
  // public userAppointmentURL: string = this.appointmentURL + 'userappointments';

  constructor(protected http: HttpClient) {}

  create(notification: ISafeKeepingProject): Observable<SafeKeepingProjectType> {
    const copy = this.convertDateFromClient(notification);
    return this.http
      .post<ISafeKeepingProject>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: SafeKeepingProjectType) => this.convertDateFromServer(res)));
  }

  update(chat: ISafeKeepingProject): Observable<SafeKeepingProjectType> {
    const copy = this.convertDateFromClient(chat);
    return this.http
      .put<ISafeKeepingProject>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: SafeKeepingProjectType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<SafeKeepingProjectType> {
    return this.http
      .get<ISafeKeepingProject>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: SafeKeepingProjectType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<SafeKeepingProjectResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISafeKeepingProject[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: SafeKeepingProjectResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryAllUserProjects(req?: any): Observable<SafeKeepingProjectResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISafeKeepingProject[]>(this.userProjectsURL, { params: options, observe: 'response' })
      .pipe(map((res: SafeKeepingProjectResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(appointment: ISafeKeepingProject): ISafeKeepingProject {
    const copy: ISafeKeepingProject = Object.assign({}, appointment, {
      start: appointment.start != null && appointment.start.isValid() ? appointment.start.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: SafeKeepingProjectType): SafeKeepingProjectType {
    if (res.body) {
      res.body.start     = res.body.start != null ? moment(res.body.start) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: SafeKeepingProjectResponseType): SafeKeepingProjectResponseType {
    if (res.body) {
      res.body.forEach((appointment: ISafeKeepingProject) => {
        appointment.start = appointment.start != null ? moment(appointment.start) : null;
      });
    }
    return res;
  }
}
