
import {throwError as observableThrowError,  Observable } from 'rxjs';
// External Modules
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

// import { MatSnackBar, MatDialog} from '@angular/material';

// Custom Modules
// Custom Components
// import {ErrorDetailComponent} from '../../shared/error-detail/error-detail.component';

/*

@Injectable()
export class MyHttpLogInterceptor implements HttpInterceptor {
    constructor(public snackBar: MatSnackBar public dialog: MatDialog) {

    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('processing request', request);

        const customReq = request.clone({
        headers: request.headers.set('app-language', 'it')
        });

        return next
        .handle(customReq)
        .do((ev: HttpEvent<any>) => {
            if (ev instanceof HttpResponse) {
            console.log('processing response', ev);
            }
        })
        .catch(response => {
            if (response instanceof HttpErrorResponse) {
                // const snackBarRef = this.snackBar.open(response.error.message, 'Details' , {duration: 3000} );

                // snackBarRef.onAction().subscribe(() => {
                //     const serverError = response.error;
                //     serverError.url = response.url;
                //     const dialogRef = this.dialog.open(ErrorDetailComponent, {
                //         //  width: '640px',
                //         //  height: '480px'
                //         data: serverError
                //     });

                //     dialogRef.afterClosed().subscribe(result => {
                //         // console.log('The dialog was closed');
                //         // this.animal = result;
                //     });
                // });
            }
            return observableThrowError(response);
        });
    }
}
*/