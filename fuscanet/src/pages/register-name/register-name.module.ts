import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterName } from './register-name';

@NgModule({
  declarations: [
    RegisterName,
  ],
  imports: [
    IonicPageModule.forChild(RegisterName),
  ],
})
export class RegisterNameModule {}
