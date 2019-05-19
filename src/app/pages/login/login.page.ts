import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public onLoginForm: FormGroup;
  showAd = false;
  adSource: string;

  constructor(
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private router: Router,
    private auth: AuthService
  ) {
    this.form();
    this.adSource = 'http://storage.googleapis.com/olujimioreoluwa14ck016975/download.png';
    setTimeout(() => {
      this.showAd = true;
    }, 3000);
  }

  ngOnInit() {
  }

  form() {
    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'Email was sended successfully.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }


  async login() {
    const loader = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'bubbles'
    });
    loader.present();
    const payload = this.onLoginForm.value;
    console.log(payload);
    this.auth.doLogin(payload).then((val) => {
      console.log(val);
      this.onLoginForm.reset();
      loader.dismiss();
      this.router.navigateByUrl('/menu/report');
    }).catch((e) => {
      console.log(e);
      this.onLoginForm.reset();
      loader.dismiss();
    });
  }

  signUp() {
    this.onLoginForm.reset();
    this.router.navigateByUrl('/register');
  }

}
