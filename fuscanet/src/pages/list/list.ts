import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private alertCtrl: AlertController) {
    
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
        console.log(data);
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }

}
