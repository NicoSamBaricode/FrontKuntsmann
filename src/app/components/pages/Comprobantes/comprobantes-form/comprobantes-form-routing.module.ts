import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprobantesFormComponent } from './comprobantes-form.component';

const routes: Routes = [{ path: '', component: ComprobantesFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprobantesFormRoutingModule { }
