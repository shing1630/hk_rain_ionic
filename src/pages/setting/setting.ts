import { Component, Inject } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';

import { OT_GV, IGV } from './../../globalVar/gv';


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class Setting {
  selectedFilterYear;
  selectFilterYearList: Array<Object>;

  loading: any;

  constructor(
    @Inject(OT_GV) private IGV: IGV,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {

    this.loadingPresent();
    // Set filter year from gloalVar
    this.selectedFilterYear = this.IGV.filterYear;

    this.selectFilterYearList = [];
    for (let i = 5; i <= 120; i += 5) {
      let year = { value: i, label: i };
      this.selectFilterYearList.push(year);
    }

    this.loadingDismiss();
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
    let alert = this.alertCtrl.create({
      title: '錯誤! ERROR!',
      subTitle: '抱歉，出了一些問題... Sorry, something went wrong...',
      buttons: ['OK']
    });
    alert.present();
  }
  presentAlert(inputTitle: string, inputSubTitle: string) {
    let alert = this.alertCtrl.create({
      title: inputTitle,
      subTitle: inputSubTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  changeFilterYear() {
    this.IGV.filterYear = this.selectedFilterYear;
    if (this.IGV.gLangInd === 'en') {
      this.presentAlert(this.IGV.SUBMITTED_SUCCESSFULLY_EN, this.IGV.NO_OF_YEARS_CHANGED_TO_EN + this.selectedFilterYear);
    } else {
      this.presentAlert(this.IGV.SUBMITTED_SUCCESSFULLY_ZH, this.IGV.NO_OF_YEARS_CHANGED_TO_ZH + this.selectedFilterYear);
    }
  }

}
