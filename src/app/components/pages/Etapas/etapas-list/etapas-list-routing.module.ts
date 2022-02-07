import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtapasListComponent } from './etapas-list.component';

const routes: Routes = [{ path: '', component: EtapasListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtapasListRoutingModule { }
