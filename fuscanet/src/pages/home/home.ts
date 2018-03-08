import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController,Content, NavParams, AlertController, ModalController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { Event } from '../../models/event';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
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
  leidas: FirebaseListObservable<any>;
  showNoticia=true;
  btnEventoColor: string = '#f4f4f4';
  btnNoticiaColor: string = '#00C25F';
  btnEventoTextColor: string = '#00C25F';
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
            let alert = this.alert.create({
              title: 'Aviso',
              subTitle: 'Bienvenido a YoMedico!! \nPor favor tome 1 minuto para completar su perfil y asi tener una mejor exoeriencia usando este servicio\nRecordamos que toda la informacion es de carácter confidencial y segura.'
            });
            alert.present();
            //alert('Bienvenido!! \nPor favor complete los campos de su perfil para dejar de ver este cartel al iniciar la aplicacion \nGracias!!!')
            this.navCtrl.setRoot(User);            
          }
          //console.log(this.profile);
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
          //element.startTime = moment(new Date(element.startTime)).format('L');
          //element.endTime = new Date(element.endTime);
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
    //console.log('event souce ',this.eventSource);
    this.formatTime(this.eventSource);
    console.log('click en ',event);
    try{
    let asiste = this.asiste(event);
    //console.log('que pasa aca??? ',asiste);
    if(asiste){
      alert("ya asistiras a este evento");
    }else{
      this.eventSource.push(event);
      //alert("se agrega el evento")
      //console.log('event source despues',this.eventSource);
      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDb.object(`eventlist/${auth.uid}`).set(this.eventSource).then(() => alert("El evento se agrego correctamente"));
        this.events.subscribe(data => this.creoLocal(data));
      })
    }}catch(e){
      this.eventSource = [];
      console.log('event source ',this.eventSource);
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
      //event.startTime= moment(event.startTime).format();
      //event.endTime= moment(event.endTime).format();
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
        //element.startTime = moment(element.startTime).format('L');
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
        //element.startTime = moment(element.startTime).format('L');
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
    console.log("no quiero ir mas");
    console.log(this.eventSource);
    //this.getEventPosition(event);
    //console.log(event);
    let pos = this.getEventPosition(event);
    console.log(pos);
    if(pos != -1){
      this.eventSource.splice(pos, 1);
    }
    //console.log(this.eventSource);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDb.object(`eventlist/${auth.uid}`).set(this.eventSource).then(() => alert("El evento se elimino correctamente"));
      this.events.subscribe(data => this.creoLocal(data));
    })
    this.events.subscribe(data => this.creoLocal(data));
  }
  getEventPosition(event){
    let cont =0;
    let dev = -1;
    this.eventSource.forEach(element => {
      //console.log('compara '+element.title+element.startTime +' con '+event.title+event.startTime);
      if(element.id == event.id){
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
      //element.startTime= moment(noticia.startTime).format();
      //element.endTime= moment(noticia.endTime).format();
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
      //element.startTime= moment(noticia.startTime).format();
      //element.endTime= moment(noticia.endTime).format();
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
    var self = this;
    this.afAuth.authState.take(1).subscribe(auth => {
      //console.log(event.id);
      //console.log(auth.uid);
      this.afDb.database.ref(`noticiaLeida/${event.id}`).once('value').then(function(snapshot) {
        //creo la lista vacia
        //console.log(snapshot.val());
        var noticiasLeidas=[];
        noticiasLeidas = snapshot.val();
        //console.log('antes ',noticiasLeidas);
        //tengo q fijarme si ya esta en la lista
        //agrego el usuario a la lista
        let agregar = true;
        if(noticiasLeidas){
          noticiasLeidas.forEach(element => {
            if(element==auth.uid){
              agregar = false;
            }
          });
        }else{
          var noticiasLeidas=[];
        }
        if(agregar){
          //console.log('agregate ',auth.uid );
          //console.log('aca ', noticiasLeidas);
          noticiasLeidas.push(auth.uid);
        }
        //console.log('despues ',noticiasLeidas);
        //guardo la lista en la bd
        self.afDb.database.ref(`noticiaLeida/${event.id}`).set(noticiasLeidas);
        //llevo al detalle
        let modal = self.navCtrl.push(Eventdetails,  {'event': event});
      });
    })
    
    
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
      //element.startTime= moment(noticia.startTime).format();
      //element.endTime= moment(noticia.endTime).format();
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
    //console.log(noticia);
    let posNot = this.getNoticiaPositionLike(noticia);
    //console.log(posNot);
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
    //console.log('event sourcewtf ',this.eventSource);
    try{
      this.eventSource.forEach(element => {
        //console.log('compara '+element+' con '+event);
        //console.log('cada elemento ',element.id);
        //console.log(event.id);
        if(element.id == event.id){
          asistira = true;
        }
      });
      //console.log('retorna '+asistira);
    }catch(e){}
    return asistira;
  }
  verNoticia(){
    this.showNoticia = true;
    this.btnEventoColor = "#f4f4f4";
    this.btnNoticiaColor = "#00C25F";
    this.btnEventoTextColor="#00C25F";
    this.btnNoticiaTextColor="#f4f4f4";
  }
  verEvento(){
    this.showNoticia = false;
    this.btnEventoColor = "#00C25F";
    this.btnNoticiaColor = "#f4f4f4";
    this.btnEventoTextColor="#f4f4f4";
    this.btnNoticiaTextColor="#00C25F";
  }
}
