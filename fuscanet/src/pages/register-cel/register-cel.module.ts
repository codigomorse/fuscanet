import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterCel } from './register-cel';

@NgModule({
  declarations: [
    RegisterCel,
  ],
  imports: [
    IonicPageModule.forChild(RegisterCel),
  ],
})
export class RegisterCelModule {}
