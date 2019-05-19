import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;

  constructor(
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    public forgotCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.form();
  }

  form() {
    this.onRegisterForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async reg() {
    const loader = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'bubbles'
    });
    loader.present();
    const payload = this.onRegisterForm.value;
    console.log(payload);
    this.auth.doRegister(payload).then((val) => {
      console.log(val);
      loader.dismiss();
      this.router.navigateByUrl('/login');
    }).catch((e) => {
      console.log(e);
      loader.dismiss();
    });
  }

  signIn() {
    this.router.navigateByUrl('/login');
  }
}
