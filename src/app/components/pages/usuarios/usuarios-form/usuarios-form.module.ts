import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosFormRoutingModule } from './usuarios-form-routing.module';
import { UsuariosFormComponent } from './usuarios-form.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    UsuariosFormComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    UsuariosFormRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class UsuariosFormModule { }
