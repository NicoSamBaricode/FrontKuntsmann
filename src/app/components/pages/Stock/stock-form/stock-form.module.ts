import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockFormRoutingModule } from './stock-form-routing.module';
import { StockFormComponent } from './stock-form.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    StockFormComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    StockFormRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class StockFormModule { }
