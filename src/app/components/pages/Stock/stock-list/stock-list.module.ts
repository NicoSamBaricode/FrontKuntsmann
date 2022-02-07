import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockListRoutingModule } from './stock-list-routing.module';
import { StockListComponent } from './stock-list.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    StockListComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    StockListRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class StockListModule { }
