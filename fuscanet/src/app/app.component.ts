import { Component, ViewChild } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Home } from '../pages/home/home';

import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { Catalogo } from '../pages/catalogo/catalogo';
import { User } from '../pages/user/user';
import { AcercaDe } from '../pages/acerca-de/acerca-de';
import { Contacto } from '../pages/contacto/contacto';
import { NoticiasGuardadas } from '../pages/noticias-guardadas/noticias-guardadas';
import { Beneficios } from '../pages/beneficios/beneficios';
import { Splash2 } from '../pages/splash2/splash2';
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Inicio', component: Home },
      { title: 'Perfil', component: User },
      { title: 'Calendario', component: ListPage },
      { title: 'Noticias guardadas', component: NoticiasGuardadas },
      { title: 'Vademecum', component: Catalogo },
      { title: 'Acerca de', component: AcercaDe },
      { title: 'Contacto', component: Contacto },
      { title: 'Beneficios', component: Beneficios },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.nav.push(Splash2);
      //alert.apply("q pasa viejo");
    });
  }

  openPage(page) {
    this.nav.push(page.component);
  }
}
