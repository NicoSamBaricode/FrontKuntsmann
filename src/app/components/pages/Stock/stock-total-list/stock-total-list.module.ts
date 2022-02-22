import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { StockTotalListRoutingModule } from './stock-total-list-routing.module';
import { StockTotalListComponent } from './stock-total-list.component';
import { ContentComponent } from './content/content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    StockTotalListComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    StockTotalListRoutingModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule,
    SharedModule
  ]
})
export class StockTotalListModule { }
