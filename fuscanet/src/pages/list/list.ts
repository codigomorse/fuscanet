import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { eventList } from '../../models/eventList';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  eventSource=[];
  viewTitle: string;
  selectedDate= new Date();

  calendar = {
    mode: 'month',
    currentDate: this.selectedDate
  }

  constructor(private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private alertCtrl: AlertController) {
    moment.locale('es');
    this.afAuth.authState.subscribe(data => {
      this.afDb.object(`/eventlist/${data.uid}`).subscribe(_data => {
        console.log("esto hay");  
        console.log(_data);
        _data.forEach(element => {
          //console.log(element);
          element.startTime = new Date(element.startTime);
          element.endTime = new Date(element.endTime);
        });
        //console.log(_data[0].startTime);
        this.eventSource = _data;  
      });  
     });
  }
  ionViewDidLoad() {

  }
  onViewTitleChanged(title){
    this.viewTitle = title;
  }
  onTimeSelected(ev){
    this.selectedDate = ev.selectedTime;
    //console.log(ev.selectedTime);
  }
  onEventSelected(event){
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    let alert = this.alertCtrl.create({
      title: ''+event.title,
      subTitle: 'Desde: '+start+ '<br>Hasta: '+end,
      buttons: ['OK']
    });
    alert.present();
  }
  addEvent(){
    let modal = this.modalCtrl.create('EventModalPage', {selectedDate: this.selectedDate});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        //console.log(data);
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        
        console.log(eventData.startTime);
        console.log(eventData.endTime);
        //console.log('este es el evento');
        //console.log(eventData);
        if(eventData.endTime > eventData.startTime){
          console.log("la fecha de fin es mayor que la de inicio");
          let events = this.eventSource;
          events.push(eventData);
          this.eventSource = [];
          setTimeout(() => {
            this.eventSource = events;
            this.afAuth.authState.take(1).subscribe(auth => {
              console.log('estos son todos los eventos');
              console.log(events);
                this.afDb.object(`eventlist/${auth.uid}`).update(events).then(() => alert("El evento se agrego correctamente"));
              })
          });
        }else{
          alert("la fecha de fin debe ser mayor a la de inicio");
        }
      }
    });
  }

}
