import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
  onViewTitleChanged(title){
    this.viewTitle = title;
  }
  onTimeSelected(ev){
    this.selectedDate = ev.selectedTime;
    console.log(ev.selectedTime);
  }
  onEventSelected(event){

  }
  addEvent(){
    
  }

}
