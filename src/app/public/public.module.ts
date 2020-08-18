// External Modules
import { NgModule          } from '@angular/core';
import { CommonModule      } from '@angular/common';
import { FormsModule       } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


// Custom modules
import {CoreModule} from '../core/core.module';
// Custom Components
// Project Services
import { PublicComponent        } from './public.component';

const externalModules = [
  CommonModule,
  FormsModule,
  RouterModule,
];

const dbFlow6Components = [
   PublicComponent,
];


@NgModule({
  imports: [
    externalModules,
    CoreModule
  ],
  entryComponents: [
    dbFlow6Components
  ],
  declarations: [
    dbFlow6Components
  ],
//  providers: [{ provide: Todos, useClass: remotedev(Todos) }],
  providers: [],
  exports: [PublicComponent],
  schemas: []

})
export class PublicModule { }