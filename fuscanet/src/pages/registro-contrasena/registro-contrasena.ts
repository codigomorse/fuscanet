import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Profile } from '../../models/profile';

@Component({
  selector: 'page-registro-contrasena',
  templateUrl: 'registro-contrasena.html',
})
export class RegistroContrasena {
  profile = {} as Profile;
  public createForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder) {
    this.createForm = formBuilder.group({
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
    });
  }

  ionViewDidLoad() {
    this.profile = this.navParams.get('profile');
    console.log(this.profile);
    console.log('ionViewDidLoad RegistroContrasena');
  }

}
