import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController,Content, NavParams, AlertController, ModalController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { Event } from '../../models/event';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable  } from 'angularfire2/database';
import * as moment from 'moment';
import { Eventdetails } from '../eventdetails/eventdetails';
import { User } from '../user/user';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {
  @ViewChild(Content) content: Content;
  profileData: FirebaseObjectObservable<Profile>;
  user={};
  eventSource: Event[];
  eventsToShow: Event[];
  noticiaList: Event[];
  noticiasToShow: Event[];
  noticiaLike: Event[];
  events: FirebaseListObservable<Event[]>;
  noticias: FirebaseListObservable<Profile[]>;
  profile = {} as Profile;
  showNoticia=true;
  btnEventoColor: string = '#f4f4f4';
  btnNoticiaColor: string = '#488aff';
  btnEventoTextColor: string = '#488aff';
  btnNoticiaTextColor: string = '#f4f4f4';
  constructor(private modalCtrl:ModalController,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public alert: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      //TRAE LOS DATOS DEL USUARIO
      this.user = data;
      //console.log(this.user);
      //TRAE EL PROFILE DEL USUARIO  
      this.afDb.object(`/profile/${data.uid}`).subscribe(_data => {
          this.profile = _data;
          if(!this.profile.nombre){
            this.navCtrl.setRoot(User);
            alert('Bienvenido!! \nPor favor complete los campos de su perfil para dejar de ver este cartel al iniciar la aplicacion \nGracias!!!')
          }
      });
      //TRAE LOS EVENTOS Y CREA LOS EVENTOS A MOSTRAR
      this.afDb.object(`/events/${data.uid}`).subscribe(_data => {
        this.events = this.afDb.list('events');
        this.events.subscribe(data => this.creoLocal(data));  
      });
      this.afDb.object(`/eventlist/${data.uid}`).subscribe(_data => {
        //console.log("esto hay");  
        //console.log(_data);
        try{
        _data.forEach(element => {
          //console.log(element);
          element.startTime = new Date(element.startTime);
          element.endTime = new Date(element.endTime);
        });
        //console.log(_data[0].startTime);
        this.eventSource = _data;  
      }catch(e){console.log("event list vacio")}
      });
      this.afDb.object(`/noticiaList/${data.uid}`).subscribe(_data => {
        //console.log("esto hay");  
        //console.log(_data);
        try{
        _data.forEach(element => {
          element.startTime = new Date(element.startTime);
          element.endTime = new Date(element.endTime);
          //console.log(element);
        });
        //console.log(_data);
        this.noticiaList = _data;  
        //console.log(this.noticiaList);
      }catch(e){console.log("event list vacio")}
      });
      //TRAE LAS NOTICIAS Y CREA LAS NOTICIAS A MOSTRAR
      this.afDb.object(`/noticia`).subscribe(_data => {
        this.noticias = this.afDb.list('noticia');
        this.noticias.subscribe(data => this.creoLocalNoticias(data));  
      });
      //noticias like
      this.afDb.object(`/noticiaLike/${data.uid}`).subscribe(_data => {
        //console.log("esto hay");  
        //console.log(_data);
        try{
        _data.forEach(element => {
          element.startTime = new Date(element.startTime);
          element.endTime = new Date(element.endTime);
          //console.log(element);
        });
        //console.log(_data);
        this.noticiaLike = _data;  
        //console.log(this.noticiaLike);
        this.noticiasToShow.forEach(element => {
          this.noticiaLike.forEach(noticia=>{
            //console.log("comparo");
            //console.log(element.texto);
            //console.log(noticia.texto);
            if(element.texto == noticia.texto){
              element.like=true;
            }
            //console.log(element.like);
          })
        });
      }catch(e){console.log("event list vacio")}
      });    
     });
     
  }
  goNoticia(){
    //console.log("click");
  }
  asistir(event){
    //console.log("click añadir");
    //console.log(this.eventSource);
    this.formatTime(this.eventSource);
    //console.log(event.title);
    try{
    let asiste = this.asiste(event);
    //console.log(asiste);
    if(asiste){
      alert("ya asistiras a este evento");
    }else{
      this.eventSource.push( event);
      //alert("se agrega el evento")
      //console.log(this.eventSource);
      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDb.object(`eventlist/${auth.uid}`).set(this.eventSource).then(() => alert("El evento se agrego correctamente"));
        this.events.subscribe(data => this.creoLocal(data));
      })
    }}catch(e){
      this.eventSource = [];
      this.eventSource.push(event);
      //alert("se agrega el evento")
      //console.log(this.eventSource);
      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDb.object(`eventlist/${auth.uid}`).set(this.eventSource).then(() => alert("El evento se agrego correctamente"));
        this.events.subscribe(data => this.creoLocal(data));
      })
    }
  }
  formatTime(events){
    try{
    events.forEach(event => {
      //console.log(event);
      //console.log("format time");
      event.startTime= moment(event.startTime).format();
      event.endTime= moment(event.endTime).format();
      //console.log(event);
    });}catch(e){}
  }
  creoLocal(events){
    this.eventsToShow=[];
    events.forEach(element => {
      let asiste = this.asiste(element);
      //console.log(asiste);
      if(asiste){
        element.voy = false;
      }else{element.voy = true}
        //console.log(this.eventsToShow);
        //console.log(element);
        this.eventsToShow.push(element);
    });
  }
  creoLocalNoticias(events){
    this.noticiasToShow=[];
    //console.log("esto llega para crear local");
    //console.log(events);
    events.forEach(element => {
      //console.log("cada noticia");
      //console.log(element);
      let guarde = this.guarde(element);
      //console.log(guarde);
      if(guarde){
        element.voy = false;
      }else{element.voy = true}
        //console.log(this.noticiasToShow);
        //console.log(element);
        this.noticiasToShow.push(element);
    });
  }
  olvidar(noticia){
    //alert("olvidar noticia");
    let posNot = this.getNoticiaPosition(noticia);
    //console.log(posNot);
    if(posNot != -1){
      this.noticiaList.splice(posNot, 1);
    }
    //console.log(this.eventSource);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDb.object(`noticiaList/${auth.uid}`).set(this.noticiaList).then(() => alert("La noricia se olvido correctamente"));
      this.noticias.subscribe(data => this.creoLocalNoticias(data));
    })
  }
  noAsistir(event){
    //console.log("no quiero ir mas");
    //console.log(this.eventSource);
    //this.getEventPosition(event);
    //console.log(event);
    let pos = this.getEventPosition(event);
    //console.log(pos);
    if(pos != -1){
      this.eventSource.splice(pos, 1);
    }
    //console.log(this.eventSource);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDb.object(`eventlist/${auth.uid}`).set(this.eventSource).then(() => alert("El evento se elimino correctamente"));
      this.events.subscribe(data => this.creoLocal(data));
    })
    //this.events.subscribe(data => this.creoLocal(data));
  }
  getEventPosition(event){
    let cont =0;
    let dev = -1;
    this.eventSource.forEach(element => {
      element.startTime= moment(event.startTime).format();
      element.endTime= moment(event.endTime).format();
      //console.log('compara '+element.title+element.startTime +' con '+event.title+event.startTime);
      if(element.title==event.title && element.startTime==event.startTime){
        //console.log(cont);
        dev = cont;
      }
      //console.log(cont);
      cont ++;
    });
    return dev; 
  }
  getNoticiaPosition(noticia){
    let cont =0;
    let dev = -1;
    this.noticiaList.forEach(element => {
      element.startTime= moment(noticia.startTime).format();
      element.endTime= moment(noticia.endTime).format();
      //console.log('compara '+element.title+element.startTime +' con '+event.title+event.startTime);
      if(element.title==noticia.title && element.startTime==noticia.startTime){
        //console.log(cont);
        dev = cont;
      }
      //console.log(cont);
      cont ++;
    });
    return dev; 
  }
  getNoticiaPositionLike(noticia){
    let cont =0;
    let dev = -1;
    this.noticiaLike.forEach(element => {
      element.startTime= moment(noticia.startTime).format();
      element.endTime= moment(noticia.endTime).format();
      //console.log('compara '+element.title+element.startTime +' con '+event.title+event.startTime);
      if(element.title==noticia.title && element.startTime==noticia.startTime){
        //console.log(cont);
        dev = cont;
      }
      //console.log(cont);
      cont ++;
    });
    return dev; 
  }
  showDetails(event){
    let modal = this.modalCtrl.create(Eventdetails,  {'event': event});
    //modal.onDidDismiss((data) => {console.log(data)});
    modal.present();
  }
  guardar(noticia){
    //console.log(noticia);
    try{
      this.noticiaList.push(noticia);
    }catch(e){
      this.noticiaList=[];
      this.noticiaList.push(noticia);
    }
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDb.object(`noticiaList/${auth.uid}`).set(this.noticiaList).then(() => alert("La noticia se guardo correctamente"));
      this.noticias.subscribe(data => this.creoLocalNoticias(data));
    })
  }
  //ACA ME FIJO SI LA NOTICA ESTA GUARDADA
  guarde(noticia){
    let asistira = false;
    //console.log(this.noticiaList);
    try{this.noticiaList.forEach(element => {
      element.startTime= moment(noticia.startTime).format();
      element.endTime= moment(noticia.endTime).format();
        //console.log('compara '+element.title+element.startTime +' con '+noticia.title+noticia.startTime);
        if(element.title==noticia.title && element.startTime==noticia.startTime){
          asistira = true;
        }
    });}catch(e){}
    //console.log('retorna '+asistira);
    return asistira;
  }
  valorar(noticia){
    noticia.like=true;
    console.log(noticia);
    try{
      this.noticiaLike.push(noticia);
    }catch(e){
      this.noticiaLike=[];
      this.noticiaLike.push(noticia);
    }
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDb.object(`noticiaLike/${auth.uid}`).set(this.noticiaLike).then(() => alert("La noticia se valoro correctamente"));
    })
  }
  desvalorar(noticia){
    noticia.like= false;
    console.log(noticia);
    let posNot = this.getNoticiaPositionLike(noticia);
    console.log(posNot);
     if(posNot != -1){
       this.noticiaLike.splice(posNot, 1);
     }
    //console.log(this.eventSource);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDb.object(`noticiaLike/${auth.uid}`).set(this.noticiaLike).then(() => alert("La noticia se valoro correctamente "));
      this.noticias.subscribe(data => this.creoLocalNoticias(data));
    })
  }
  asiste(event){
    let asistira = false;
    try{this.eventSource.forEach(element => {
      element.startTime= moment(event.startTime).format();
      element.endTime= moment(event.endTime).format();
        //console.log('compara '+element.title+element.startTime +' con '+event.title+event.startTime);
        if(element.title==event.title && element.startTime==event.startTime){
          asistira = true;
        }
    });}catch(e){}
    //console.log('retorna '+asistira);
    return asistira;
  }
  verNoticia(){
    this.showNoticia = true;
    this.btnEventoColor = "#f4f4f4";
    this.btnNoticiaColor = "#488aff";
    this.btnEventoTextColor="#488aff";
    this.btnNoticiaTextColor="#f4f4f4";
  }
  verEvento(){
    this.showNoticia = false;
    this.btnEventoColor = "#488aff";
    this.btnNoticiaColor = "#f4f4f4";
    this.btnEventoTextColor="#f4f4f4";
    this.btnNoticiaTextColor="#488aff";
  }
}
