import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Event } from '../../models/event';

@Component({
  selector: 'page-eventdetails',
  templateUrl: 'eventdetails.html',
})
export class Eventdetails {
  titulo;
  evento: Event;
  constructor(public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.evento=this.navParams.get('event');
    console.log(this.evento);
  }


  closeModal(){
    this.viewCtrl.dismiss();
  }
}
