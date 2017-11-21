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
      confirmPassword: ['', Validators.required]
    },{validator: this.matchingPasswords('password', 'confirmPassword')});
  }

  ionViewDidLoad() {
    this.profile = this.navParams.get('profile');
    console.log(this.profile);
  }
  siguiente(){
    console.log(this.profile);
  }
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }
}
