import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Labdetails } from './labdetails';

@NgModule({
  declarations: [
    Labdetails,
  ],
  imports: [
    IonicPageModule.forChild(Labdetails),
  ],
})
export class LabdetailsModule {}
