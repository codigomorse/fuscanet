import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcercaDe } from './acerca-de';

@NgModule({
  declarations: [
    AcercaDe,
  ],
  imports: [
    IonicPageModule.forChild(AcercaDe),
  ],
})
export class AcercaDeModule {}
