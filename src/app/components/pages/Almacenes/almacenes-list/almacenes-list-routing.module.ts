import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenesListComponent } from './almacenes-list.component';

const routes: Routes = [{ path: '', component: AlmacenesListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenesListRoutingModule { }
