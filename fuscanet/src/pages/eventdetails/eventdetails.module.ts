import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Eventdetails } from './eventdetails';

@NgModule({
  declarations: [
    Eventdetails,
  ],
  imports: [
    IonicPageModule.forChild(Eventdetails),
  ],
})
export class EventdetailsModule {}
