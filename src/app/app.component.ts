
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

  constructor(
    @Inject(OT_GV) public IGV: IGV,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public menu: MenuController,
    public translate: TranslateService,
    public storage: Storage,
    public adMob: AdMob
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
    this.showBanner();
    this.showInterstitial();
  }

  private setAdMobIds() {
    if (/(android)/i.test(navigator.userAgent)) {
      IGV.AD_MOB_ID_BANNER = 'ca-app-pub-7668464781725150/1638150628';
      IGV.AD_MOB_ID_INTER = 'ca-app-pub-7668464781725150/8044611026';
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      IGV.AD_MOB_ID_BANNER = 'ca-app-pub-7668464781725150/6068350226';
      IGV.AD_MOB_ID_INTER = 'ca-app-pub-7668464781725150/6428277028';
    } else {
      IGV.AD_MOB_ID_BANNER = '';
      IGV.AD_MOB_ID_INTER = '';
    }
  }

  public showBanner() {
    if (!/(android)/i.test(navigator.userAgent)
        && !/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      return false;
    }

    let adBannerOptions: AdMobOptions = <AdMobOptions>{};

    adBannerOptions = {
      adId: IGV.AD_MOB_ID_BANNER,
      position: this.adMob.AD_POSITION.BOTTOM_CENTER,
      isTesting: IGV.isTestingAdmob,
      autoShow: true
      //adExtras: this.adExtras
    }

    this.adMob.createBanner(adBannerOptions);

    return true;
  }

  public showInterstitial() {
    if (!/(android)/i.test(navigator.userAgent)
        && !/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      return false;
    }

    let adInterOptions: AdMobOptions = <AdMobOptions>{};

    adInterOptions = {
      adId: IGV.AD_MOB_ID_INTER,
      isTesting: IGV.isTestingAdmob,
      autoShow: true
      //adExtras: this.adExtras
    }

    this.adMob.prepareInterstitial(adInterOptions)
      .then(() => { this.adMob.showInterstitial(); });
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
