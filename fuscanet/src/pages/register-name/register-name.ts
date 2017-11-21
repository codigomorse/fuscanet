import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Profile } from '../../models/profile';
import { RegisterCel } from '../register-cel/register-cel'

@Component({
  selector: 'page-register-name',
  templateUrl: 'register-name.html',
})
export class RegisterName {
  profile = {} as Profile;
  public createForm:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder) {
    this.createForm = formBuilder.group({
      correo:['', Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    this.profile = this.navParams.get('profile');
  }
  siguiente(){
    this.navCtrl.push(RegisterCel, {'profile': this.profile});
  }
}
