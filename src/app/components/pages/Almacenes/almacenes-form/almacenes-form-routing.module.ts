import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenesFormComponent } from './almacenes-form.component';

const routes: Routes = [{ path: '', component: AlmacenesFormComponent },{ path: 'update/:id', component:AlmacenesFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenesFormRoutingModule { }
