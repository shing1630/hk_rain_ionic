
import { Component, ViewChild, Inject } from '@angular/core';
import { Platform, MenuController, Nav, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { AdMob, AdMobOptions } from '@ionic-native/admob';

import { OT_GV, IGV } from './../globalVar/gv';

import { WeatherForecast } from '../pages/weatherForecast/weatherForecast';
import { RptFeedback } from '../pages/rptFeedback/rptFeedback';
import { CalculateWeather } from '../pages/calculateWeather/calculateWeather';
import { Setting } from '../pages/setting/setting';
import { About } from '../pages/about/about';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make CalculateWeather the root (or first) page
  rootPage: any = CalculateWeather;

  loading: any;

  private adMobId: any;
  private adOptions: AdMobOptions = <AdMobOptions>{};

  // Change it to true when production
  private isTesting: boolean = true;

  constructor(
    @Inject(OT_GV) public IGV: IGV,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public menu: MenuController,
    public translate: TranslateService,
    public storage: Storage,
    private adMob: AdMob
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

      this.translate.use('zh');
      this.IGV.gLangInd = 'zh';

      // For local storage
      this.storage.ready().then(() => {

        // Get mySetting
        this.storage.get('mySetting').then((val) => {
          if (val !== null) {
            this.translate.use(val.langInd);
            this.IGV.gLangInd = val.langInd;
            this.IGV.filterYear = val.filterYear;
          } else {
            // Set mySetting
            this.storage.set('mySetting', { langInd: 'zh', filterYear: 45 });
          }

        });
      }, (error) => {
        this.presentSysErr();
      });

      // For adMob

      this.initAds();


    });
  }

  private initAds() {
    if (!this.adMob) {
      console.log("AdMob not found.");
      return;
    }
    this.setAdMobIds();
    this.setAdMobOptions();
    this.showBanner();
    this.showInterstitial();
  }

  private setAdMobIds() {
    if (/(android)/i.test(navigator.userAgent)) {
      this.adMobId = {
        banner: 'ca-app-pub-7668464781725150/1638150628',
        interstitial: 'ca-app-pub-7668464781725150/8044611026'
      };
      IGV.AD_MOB_ID_BANNER = 'ca-app-pub-7668464781725150/1638150628';
      IGV.AD_MOB_ID_INTER = 'ca-app-pub-7668464781725150/8044611026';
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      this.adMobId = {
        banner: 'ca-app-pub-7668464781725150/6068350226',
        interstitial: 'ca-app-pub-7668464781725150/6428277028'
      };
      IGV.AD_MOB_ID_BANNER = 'ca-app-pub-7668464781725150/6068350226';
      IGV.AD_MOB_ID_INTER = 'ca-app-pub-7668464781725150/6428277028';
    } else {
      this.adMobId = {
        banner: ''
      };
    }
  }

  private setAdMobOptions() {
    this.adOptions = {
      position: this.adMob.AD_POSITION.BOTTOM_CENTER,
      isTesting: this.isTesting,
      autoShow: true
      //adExtras: this.adExtras
    }

    this.adMob.setOptions(this.adOptions)
  }

  public showBanner() {
    if (!this.adMob) return false;

    this.adMob.createBanner({ adId: this.adMobId.banner });
    return true;
  }

  public showInterstitial() {
    if (!this.adMob) return false;
    this.adMob.prepareInterstitial({ adId: this.adMobId.interstitial });
    return true;
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
      case 'About': {
        toPage = About;
        break;
      }
      case 'RptFeedback': {
        toPage = RptFeedback;
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

    this.storage.ready().then(() => {
      this.storage.set('mySetting', { langInd: lang, filterYear: this.IGV.filterYear });
    }, (error) => {
      this.presentSysErr();
    });

    this.menu.close();
  }


}
