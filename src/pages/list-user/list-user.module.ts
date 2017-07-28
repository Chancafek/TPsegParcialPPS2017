import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListUserPage } from './list-user';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ListUserPage,
  ],
  imports: [
    IonicPageModule.forChild(ListUserPage),
    TranslateModule.forChild(),
    SharedModule
  ],
  exports: [
    ListUserPage
  ]
})
export class ListUserPageModule {}
