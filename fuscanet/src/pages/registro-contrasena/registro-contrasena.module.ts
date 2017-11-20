import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroContrasena } from './registro-contrasena';

@NgModule({
  declarations: [
    RegistroContrasena,
  ],
  imports: [
    IonicPageModule.forChild(RegistroContrasena),
  ],
})
export class RegistroContrasenaModule {}
