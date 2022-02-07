import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificacionesListRoutingModule } from './notificaciones-list-routing.module';
import { NotificacionesListComponent } from './notificaciones-list.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    NotificacionesListComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    NotificacionesListRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class NotificacionesListModule { }
