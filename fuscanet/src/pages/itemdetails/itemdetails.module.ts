import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Itemdetails } from './itemdetails';

@NgModule({
  declarations: [
    Itemdetails,
  ],
  imports: [
    IonicPageModule.forChild(Itemdetails),
  ],
})
export class ItemdetailsModule {}
