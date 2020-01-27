import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BLE } from '@ionic-native/ble/ngx';

import { DetailPage } from './detail.page';

@NgModule({
  declarations: [DetailPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: DetailPage
      }
    ])
  ],
  providers: [
    BLE
  ]
})
export class DetailPageModule {}
