import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasFormRoutingModule } from './categorias-form-routing.module';
import { CategoriasFormComponent } from './categorias-form.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    CategoriasFormComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    CategoriasFormRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class CategoriasFormModule { }
