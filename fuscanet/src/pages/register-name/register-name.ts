import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Profile } from '../../models/profile';

@Component({
  selector: 'page-register-name',
  templateUrl: 'register-name.html',
})
export class RegisterName {
  profile = {} as Profile;
  public createForm:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder) {
    this.createForm = formBuilder.group({
      nombre:['', Validators.compose([Validators.required])],
      apellido:['', Validators.compose([Validators.required])],
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
