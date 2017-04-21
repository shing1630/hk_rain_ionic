import { Component, Inject } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';

import { OT_GV, IGV } from './../../globalVar/gv';

import { Forecast } from "../../models/Forecast";
import { ForecastService } from "../../services/forecast.service";


@Component({
  selector: 'page-weatherForecast',
  templateUrl: 'weatherForecast.html'
})
export class WeatherForecast {
  forecastList: Forecast[] = [];

  monthMap: {};
  weekDayEnMap: {};
  weekDayZhMap: {};

  loading: any;

  constructor(
    @Inject(OT_GV) private IGV: IGV,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private forecastService: ForecastService) {
    this.monthMap = IGV.monthMap;
    this.weekDayEnMap = IGV.weekDayEnMap;
    this.weekDayZhMap = IGV.weekDayZhMap;
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

  ngOnInit() {
    this.loadingPresent();
    this.forecastService.getForecast()
      .then(forecastList => {
        this.forecastList = forecastList;
        for (var key in this.forecastList) {
          if (this.forecastList.hasOwnProperty(key)) {
            let currDate: Date = new Date();
            if (currDate.getDate() === this.forecastList[0].day) {
              currDate.setDate(currDate.getDate() + Number(key));
              this.forecastList[key].weekDay = Number(currDate.getDay());
            } else {
              currDate.setDate(currDate.getDate() + Number(key) + 1);
              this.forecastList[key].weekDay = Number(currDate.getDay());
            }
          }
        }
        this.loadingDismiss();
      }).catch(error => { this.presentSysErr(); this.loadingDismiss(); });
  }

  refreshForecast(refresher) {
    this.forecastService.getForecast()
      .then(forecastList => {
        this.forecastList = forecastList;
        for (var key in this.forecastList) {
          if (this.forecastList.hasOwnProperty(key)) {
            let currDate: Date = new Date();
            if (currDate.getDate() === this.forecastList[0].day) {
              currDate.setDate(currDate.getDate() + Number(key));
              this.forecastList[key].weekDay = Number(currDate.getDay());
            } else {
              currDate.setDate(currDate.getDate() + Number(key) + 1);
              this.forecastList[key].weekDay = Number(currDate.getDay());
            }
          }
        }
        refresher.complete();
      }).catch(error => { this.presentSysErr(); refresher.complete(); });
  }
}
