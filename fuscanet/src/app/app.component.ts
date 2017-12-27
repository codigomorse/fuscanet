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
import { SQLite } from '@ionic-native/sqlite';
import { TasksService } from '../providers/tasks-service';
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  //activePage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,public tasksService: TasksService, public splashScreen: SplashScreen,public sqlite: SQLite) {
    
    this.initializeApp();

    // used for an example of ngFor and navigation
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
    //this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
      this.createDatabase();
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
  private createDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db) => {
      this.tasksService.setDatabase(db);
      return this.tasksService.createTable();
    })
    .then(() =>{
      this.splashScreen.hide();
      //this.rootPage = 'HomePage';
    })
    .catch(error =>{
      console.error(error);
    });
  }
}
