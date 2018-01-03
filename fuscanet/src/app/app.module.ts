import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { Catalogo } from '../pages/catalogo/catalogo';
import { User } from '../pages/user/user';
import { Itemdetails } from '../pages/itemdetails/itemdetails';
import { Labdetails } from '../pages/labdetails/labdetails';
import { Eventdetails } from '../pages/eventdetails/eventdetails';
import { NoticiasGuardadas } from '../pages/noticias-guardadas/noticias-guardadas';
import { AcercaDe } from '../pages/acerca-de/acerca-de';
import { Contacto } from '../pages/contacto/contacto';
import { RegistroContrasena } from '../pages/registro-contrasena/registro-contrasena';
import { RegisterName } from '../pages/register-name/register-name';
import { RegisterCel } from '../pages/register-cel/register-cel';
import { Beneficios } from '../pages/beneficios/beneficios';

import { AngularFireModule } from 'angularfire2';
import {FIREBASE_CONFIG} from './app.firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {NgCalendarModule} from 'ionic2-calendar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ListPage,
    Catalogo,
    User,
    Itemdetails,
    Eventdetails,
    NoticiasGuardadas,
    AcercaDe,
    Contacto,
    RegistroContrasena,
    RegisterName,
    RegisterCel,
    Beneficios,
    Labdetails
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgCalendarModule,
    InfiniteScrollModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ListPage,
    Catalogo,
    User,
    Itemdetails,
    Eventdetails,
    NoticiasGuardadas,
    AcercaDe,
    Contacto,
    RegistroContrasena,
    RegisterName,
    RegisterCel,
    Beneficios,
    Labdetails
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}