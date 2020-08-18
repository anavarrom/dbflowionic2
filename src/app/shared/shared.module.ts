// External modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAuthGuard } from './guards/AppAuthGuard';

// Custom modules
// Custom Components
// import {ErrorDetailComponent} from './error-detail/error-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    //  ErrorDetailComponent
  ],
  entryComponents: [
   // ErrorDetailComponent
  ],
  exports: [
   ],
 })
export class SharedModule { }
