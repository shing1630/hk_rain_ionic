import { Component, ViewChild, Inject } from '@angular/core';
import { Platform, MenuController, Nav, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { StatusBar, Splashscreen } from 'ionic-native';

import { OT_GV, IGV } from './../globalVar/gv';

import { ListPage } from '../pages/list/list';
import { WeatherForecast } from '../pages/weatherForecast/weatherForecast';
import { CalculateWeather } from '../pages/calculateWeather/calculateWeather';
import { Setting } from '../pages/setting/setting';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make CalculateWeather the root (or first) page
  rootPage: any = CalculateWeather;

  loading: any;

  constructor(
    @Inject(OT_GV) private IGV: IGV,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public platform: Platform,
    public menu: MenuController,
    public translate: TranslateService
  ) {
    this.initializeApp(translate);
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

  initializeApp(translate) {
    this.loadingPresent();
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.loadingDismiss();
    });
    translate.setDefaultLang('zh');
    this.IGV.gLangInd = 'zh';
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let toPage: any;
    switch (page) {
      case 'WeatherForecast': {
        toPage = WeatherForecast;
        break;
      }
      case 'CalculateWeather': {
        toPage = CalculateWeather;
        break;
      }
      case 'Setting': {
        toPage = Setting;
        break;
      }
      case 'ListPage': {
        toPage = ListPage;
        break;
      }
      default: {
        toPage = CalculateWeather;
        break;
      }
    }
    this.nav.setRoot(toPage);
  }

  changeLangInd(lang) {
    this.translate.use(lang);
    this.IGV.gLangInd = lang;
    this.menu.close();
  }
}
