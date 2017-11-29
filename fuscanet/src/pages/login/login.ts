import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Loading,LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../models/user";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';
import { Profile } from '../../models/profile';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
user = {} as User;
  public loginForm:FormGroup;
  public loading:Loading;
  profile = {} as Profile;

  constructor(private afDb: AngularFireDatabase,public loadingCtrl: LoadingController,public formBuilder: FormBuilder,public alertCtrl: AlertController, private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.loginForm = formBuilder.group({
      email: [''],
      password: ['', Validators.compose([Validators.minLength(6), 
        Validators.required])]
    });
  }

  ionViewDidLoad() {
    setTimeout(() => {
  
    let loading = this.loadingCtrl.create({
      content: 'Autentificando'
    });
  
    loading.present();
    
      const unsubscribe = this.afAuth.auth.onAuthStateChanged((user) => {
        if (!user) {
          unsubscribe();
          loading.dismiss();
        } else {
          this.afDb.object(`/profile/${user.uid}`).subscribe(_data => {
          this.profile = _data;
          loading.dismiss();
          if(this.profile){
            if(this.profile.perfil=="nuevo"){
              alert("Su usuario se encuentra pendiente de aprobacion");
            }else{
              this.navCtrl.setRoot('Home');  
            }
          }
        });  
          unsubscribe();
        }
      });
    
    }, 2000);
  }
  goToResetPassword(){
    let prompt = this.alertCtrl.create({
      title: 'Reset Password',
      message: "Enter your mail address",
      inputs: [
        {
          name: 'mail',
          placeholder: 'mail'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            
          }
        },
        {
          text: 'Send',
          handler: data => {
            this.afAuth.auth.sendPasswordResetEmail(data.mail).then(function() {
              // Email sent.
              alert("email send");
            }, function(error) {
              alert(error);
              // An error happened.
            });
          }
        }
      ]
    });
    prompt.present();
  }
  loginUser(): void {
  if (!this.loginForm.valid){
    //console.log(this.loginForm.value);
  } else {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, 
        this.loginForm.value.password)
    .then( authData => {
      this.loading.dismiss().then( () => {
        //console.log(authData);
        //console.log("se logueo bien");
        this.afDb.object(`/profile/${authData.uid}`).subscribe(_data => {
          //console.log(_data);
          this.profile = _data;
          //console.log(this.profile);
          if(this.profile){
            if(this.profile.perfil=="nuevo"){
              alert("Su usuario se encuentra pendiente de aprobacion");
            }else{
              this.navCtrl.setRoot('Home');  
            }
          }
        });  
      });
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}
  goToSignup(){
    this.navCtrl.push('Register');
  }
}
