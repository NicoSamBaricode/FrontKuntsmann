import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtapasFormComponent } from './etapas-form.component';

const routes: Routes = [{ path: '', component: EtapasFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtapasFormRoutingModule { }
