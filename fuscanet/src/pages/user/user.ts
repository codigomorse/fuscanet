import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform,Loading,LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class User {
  profileData: FirebaseObjectObservable<Profile>;
  user={};
  profile = {} as Profile;
  public createForm:FormGroup;
  public loading:Loading;
  image;
  picdata:any;
  picurl:any;
  mypicref:any;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

  constructor(public platform: Platform,public alert: AlertController, private camera: Camera,public alertCtrl: AlertController,public formBuilder: FormBuilder,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.mypicref = firebase.storage().ref('/');
    this.createForm = formBuilder.group({
      nombre:[''],
      apellido:[''],
      email: [''],
      cel: [''],
      especialidad: [''],
      city: [''],
      sociedad: [''],
      gender: [''],
      gremio: [''],
      colegios: ['']
    });
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      this.user = data;
      //console.log(this.user);  
      this.afDb.object(`/profile/${data.uid}`).subscribe(_data => {
          this.profile = _data;
          this.image = this.profile.foto;
          if(this.image == undefined){
            this.image = "assets/img/default.png";
          }
          //alert(this.image);
          //console.log("perfil cuando entra");
          //console.log(this.profile);
      });  
     });
  }
  logoutUser(){
    let alert = this.alert.create({
    title: 'Confirmar',
    message: 'Desloguearse y salir?',
    buttons: [{
      text: "Desloguearse y salir?",
      handler: () => { this.exitApp() }
    }, {
      text: "Cancelar",
      role: 'cancel'
    }]
  })
  alert.present();
}
exitApp(){
  firebase.auth().signOut();
  this.platform.exitApp();
}
  updateUser(){
    this.afAuth.authState.take(1).subscribe(auth => {
      //console.log("perfil a guardar");
      //console.log(this.profile);
        this.afDb.object(`profile/${auth.uid}`).set(this.profile).then(() => alert("Datos actualizados correctamente"));
      })
  }
  async updatePhoto(): Promise<any>{
    try{
      this.picdata = await this.camera.getPicture(this.options);
      this.upload();
    }catch(e){console.log(e)}
  }
  upload(){
    this.mypicref.child(this.uid()).child('pic.jpeg')
    .putString(this.picdata, 'base64',{contentType:'image/jpeg'})
    .then(savepic =>{
      this.picurl= savepic.downloadURL;
      this.profile.foto = this.picurl;
      this.image = this.picurl;
    }) 
  }
  uid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }
}
