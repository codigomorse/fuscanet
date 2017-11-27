import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Beneficios } from './beneficios';

@NgModule({
  declarations: [
    Beneficios,
  ],
  imports: [
    IonicPageModule.forChild(Beneficios),
  ],
})
export class BeneficiosModule {}
