import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase/firebase.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  reports: any;
  constructor(
    private fire: FirebaseService,
    public loadingCtrl: LoadingController,
  ) { }

  async ngOnInit() {
    const loader = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'bubbles'
    });
    loader.present().then(() => {
      this.getRep().then((val) => {
        this.reports = val;
        loader.dismiss();
      });
    });
  }

  getRep() {
    return new Promise((resolve, reject) => {
      this.fire.getReports().then((rep) => {
        resolve(rep);
      });
    });
  }

  doRefresh(event) {
    this.getRep().then((val) => {
      this.reports = val;
      event.target.complete();
    });
  }
}
