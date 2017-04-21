import { Component, Inject } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';

import { OT_GV, IGV } from './../../globalVar/gv';

import { Feedback } from "../../models/Feedback";
import { FeedbackService } from "../../services/feedback.service";


@Component({
  selector: 'page-rptFeedback',
  templateUrl: 'rptFeedback.html'
})
export class RptFeedback {
  feedback: Feedback;
  loading: any;

  constructor(
    @Inject(OT_GV) private IGV: IGV,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private feedbackService: FeedbackService) {
  }

  loadingPresent() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
                <div class="centerAndMiddle">
                    <img width="50%" height="50%" src="assets/img/logo/hkRain_ain.gif">
                </div>`,
    });
    this.loading.present();
  }

  loadingDismiss() {
    this.loading.dismiss();
  }

  // -------------  Alert -------------//
  presentSysErr() {
        if (this.IGV.gLangInd === 'zh') {
            let alert = this.alertCtrl.create({
                title: IGV.ERROR_ZH,
                subTitle: IGV.SORRY_SOMETHING_WRONG_ZN,
                buttons: ['OK']
            });
            alert.present();
        } else {
            let alert = this.alertCtrl.create({
                title: IGV.ERROR_EN,
                subTitle: IGV.SORRY_SOMETHING_WRONG_EN,
                buttons: ['OK']
            });
            alert.present();
        }
    }
  presentAlert(inputTitle: string, inputSubTitle: string) {
    let alert = this.alertCtrl.create({
      title: inputTitle,
      subTitle: inputSubTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  ngOnInit() {
    this.loadingPresent();
    this.feedback = new Feedback();
    this.feedback.name = null;
    this.feedback.email = null;
    this.feedback.comment = null;
    this.feedback.submitDate = null;
    this.loadingDismiss();
  }

  submitFeedback() {
    this.loadingPresent();
    this.feedbackService
      .checkFeedback(this.feedback)
      .then(response => {
        if (this.IGV.gLangInd === 'en') {
          this.presentAlert(this.IGV.SUBMITTED_SUCCESSFULLY_EN, null);
        } else {
          this.presentAlert(this.IGV.SUBMITTED_SUCCESSFULLY_ZH, null);
        }
        this.feedback = new Feedback();
        this.feedback.name = null;
        this.feedback.email = null;
        this.feedback.comment = null;
        this.feedback.submitDate = null
        this.loadingDismiss();
      })
      .catch(error => { this.presentSysErr(); this.loadingDismiss(); }); // TODO: Display error message
  }
}
