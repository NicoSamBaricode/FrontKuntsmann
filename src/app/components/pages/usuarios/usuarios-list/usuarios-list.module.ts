import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosListRoutingModule } from './usuarios-list-routing.module';
import { UsuariosListComponent } from './usuarios-list.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    UsuariosListComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    UsuariosListRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule,
    
  ]
})
export class UsuariosListModule { }
