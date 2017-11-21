import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Profile } from '../../models/profile';

@Component({
  selector: 'page-register-cel',
  templateUrl: 'register-cel.html',
})
export class RegisterCel {
  profile = {} as Profile;
  public createForm:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder) {
    this.createForm = formBuilder.group({
      cel:['',Validators.compose([Validators.minLength(9) ,Validators.required])],
    });
  }

  ionViewDidLoad() {
    this.profile = this.navParams.get('profile');
    console.log(this.profile);
  }
  siguiente(){
    console.log(this.profile);
  }

}
