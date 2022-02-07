import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificacionesListComponent } from './notificaciones-list.component';

const routes: Routes = [{ path: '', component: NotificacionesListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificacionesListRoutingModule { }
