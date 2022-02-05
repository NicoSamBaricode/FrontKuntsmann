import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenesListRoutingModule } from './almacenes-list-routing.module';
import { AlmacenesListComponent } from './almacenes-list.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    AlmacenesListComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    AlmacenesListRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class AlmacenesListModule { }
