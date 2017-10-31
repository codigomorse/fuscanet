import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticiasGuardadas } from './noticias-guardadas';

@NgModule({
  declarations: [
    NoticiasGuardadas,
  ],
  imports: [
    IonicPageModule.forChild(NoticiasGuardadas),
  ],
})
export class NoticiasGuardadasModule {}
