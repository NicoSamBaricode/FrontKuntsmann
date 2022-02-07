import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasListRoutingModule } from './categorias-list-routing.module';
import { CategoriasListComponent } from './categorias-list.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    CategoriasListComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    CategoriasListRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class CategoriasListModule { }
