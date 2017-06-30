import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListUserPage } from './list-user';

@NgModule({
  declarations: [
    ListUserPage,
  ],
  imports: [
    IonicPageModule.forChild(ListUserPage),
    SharedModule
  ],
  exports: [
    ListUserPage
  ]
})
export class ListUserPageModule {}
