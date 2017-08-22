import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading,LoadingController, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../models/user";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {
  testCheckboxOpen: boolean;
  testCheckboxResult;
  especialidad;
  public createForm:FormGroup;
  public loading:Loading;
  constructor(private afAuth:AngularFireAuth,public formBuilder: FormBuilder,public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams,public loadingCtrl: LoadingController) {
    this.createForm = formBuilder.group({
      email: [''],
      password: ['', Validators.compose([Validators.minLength(6), 
        Validators.required])],
      nombre:['', Validators.compose([Validators.required])],
      apellido:['', Validators.compose([Validators.required])],
      matricula:['', Validators.compose([Validators.required])],
      especialidad:[''],
      cel:['', Validators.compose([Validators.minLength(9),Validators.required])],
    });
  }

  ionViewDidLoad() {
  }
  createUser(): void {

    alert('tu vieja');
  }
  doCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('seleccione su especialidad');

    alert.addInput({
      type: 'checkbox',
      label: 'Alderaan',
      value: 'value1',
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Bespin',
      value: 'value2'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Coruscant',
      value: 'value3'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Endor',
      value: 'value4'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Hoth',
      value: 'value5'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Jakku',
      value: 'value6'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Naboo',
      value: 'value6'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Takodana',
      value: 'value6'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Tatooine',
      value: 'value6'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        //console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
        this.especialidad = data;
        console.log(this.especialidad);
      }
    });
    alert.present().then(() => {
      this.testCheckboxOpen = true;
    });
  }}
