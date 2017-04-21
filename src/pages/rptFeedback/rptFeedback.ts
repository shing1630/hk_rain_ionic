import { Component, Inject } from '@angular/core';
import { LoadingController } from 'ionic-angular';

import { OT_GV, IGV } from './../../globalVar/gv';
import { GlobalFunc } from './../../globalFunc/globalFunc';

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
    public globalFunc: GlobalFunc,
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
          this.globalFunc.presentAlert(this.IGV.SUBMITTED_SUCCESSFULLY_EN, null);
        } else {
          this.globalFunc.presentAlert(this.IGV.SUBMITTED_SUCCESSFULLY_ZH, null);
        }
        this.feedback = new Feedback();
        this.feedback.name = null;
        this.feedback.email = null;
        this.feedback.comment = null;
        this.feedback.submitDate = null
        this.loadingDismiss();
      })
      .catch(error => { this.globalFunc.presentSysErr(); this.loadingDismiss(); }); // TODO: Display error message
  }
}
