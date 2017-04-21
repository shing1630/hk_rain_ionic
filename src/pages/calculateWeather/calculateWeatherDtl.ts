import { Component, Inject } from '@angular/core';

import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { WeatherService } from "../../services/weather.service";
import { Weather } from "../../models/Weather";

import { OT_GV, IGV } from './../../globalVar/gv';


@Component({
    templateUrl: 'calculateWeatherDtl.html'
})
export class CalculateWeatherDtl {
    selectedMonth: any;
    selectedDay: any;
    selectedFilterYear: any;
    weatherDtlList: Weather[];
    loading: any;

    monthMap: {};

    constructor(
        @Inject(OT_GV) private IGV: IGV,
        public navCtrl: NavController,
        public navParams: NavParams,
        private loadingCtrl: LoadingController,
        private weatherService: WeatherService,
        private alertCtrl: AlertController, ) {
        this.resetWeatherDtl();
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedMonth = navParams.get('selectedMonth');
        this.selectedDay = navParams.get('selectedDay');
        this.selectedFilterYear = navParams.get('selectedFilterYear');
        this.getWeatherDtlList();

        this.monthMap = IGV.monthMap;
    }

    resetWeatherDtl() {
        this.selectedMonth = null;
        this.selectedDay = null;
        this.selectedFilterYear = true;
        this.weatherDtlList = null;
    }

    // -------------  Alert -------------//
    ppresentSysErr() {
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

    getWeatherDtlList() {
        this.loadingPresent();
        this.weatherService
            .getWeatherDtlList(this.selectedMonth, this.selectedDay, this.selectedFilterYear)
            .then(result => {
                for (var key in result) {
                    if (result.hasOwnProperty(key)) {
                        // Change rainfall 999 to 0.05
                        if (result[key].rainfall === 999) {
                            result[key].rainfall = 0.05;
                        }

                        result[key].rainfallDescEN = this.getRainfallDescEN(result[key].rainfall);
                        result[key].rainfallDescZH = this.getRainfallDescZH(result[key].rainfall);
                    }
                }
                this.weatherDtlList = result;
                this.loadingDismiss();
            })
            .catch(error => { this.presentSysErr(); this.loadingDismiss(); }); // TODO: Display error message

    }

    getRainfallDescEN(rainfall: any) {
        if (rainfall === 0) {
            return this.IGV.SUNSHINE_EN;
        } else if (rainfall === this.IGV.DRIZZLE_THRESHOLD) {
            return this.IGV.DRIZZLE_EN;
        } else if (rainfall <= this.IGV.LIGHT_THRESHOLD) {
            return this.IGV.LIGHT_EN;
        } else if (rainfall <= this.IGV.MODERATE_THRESHOLD) {
            return this.IGV.MODERATE_EN;
        } else if (rainfall <= this.IGV.HEAVY_THRESHOLD) {
            return this.IGV.HEAVY_EN;
        } else if (rainfall <= this.IGV.VIOLENT_THRESHOLD) {
            return this.IGV.VIOLENT_EN;
        } else if (rainfall >= this.IGV.TORRENTIAL_THRESHOLD) {
            return this.IGV.TORRENTIAL_EN;
        }
    }

    getRainfallDescZH(rainfall: any) {
        if (rainfall === 0) {
            return this.IGV.SUNSHINE_ZH;
        } else if (rainfall === this.IGV.DRIZZLE_THRESHOLD) {
            return this.IGV.DRIZZLE_ZH;
        } else if (rainfall <= this.IGV.LIGHT_THRESHOLD) {
            return this.IGV.LIGHT_ZH;
        } else if (rainfall <= this.IGV.MODERATE_THRESHOLD) {
            return this.IGV.MODERATE_ZH;
        } else if (rainfall <= this.IGV.HEAVY_THRESHOLD) {
            return this.IGV.HEAVY_ZH;
        } else if (rainfall <= this.IGV.VIOLENT_THRESHOLD) {
            return this.IGV.VIOLENT_ZH;
        } else if (rainfall >= this.IGV.TORRENTIAL_THRESHOLD) {
            return this.IGV.TORRENTIAL_ZH;
        }
    }
}