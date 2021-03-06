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
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  //activePage: any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: Home, icon:'ios-home' },
      { title: 'Perfil', component: User, icon:'md-person'},
      { title: 'Calendario', component: ListPage, icon:'md-calendar' },
      { title: 'Noticias guardadas', component: NoticiasGuardadas, icon:'ios-archive' },
      { title: 'Vademecum', component: Catalogo, icon:'md-medkit' },
      { title: 'Acerca de', component: AcercaDe, icon:'md-help-circle' },
      { title: 'Contacto', component: Contacto, icon:'md-call' },
      { title: 'Beneficios', component: Beneficios, icon:'md-bulb' },
    ];
    //this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
    //this.activePage=page;
  }
  checkActive(page){
    //return page == this.activePage;
  }
}
