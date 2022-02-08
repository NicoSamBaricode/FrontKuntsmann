import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprobantesListComponent } from './comprobantes-list.component';

const routes: Routes = [{ path: '', component: ComprobantesListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprobantesListRoutingModule { }
