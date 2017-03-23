import { Component, ViewChild, Inject } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { StatusBar, Splashscreen } from 'ionic-native';

import { OT_GV, IGV } from './../globalVar/gv';

import { ListPage } from '../pages/list/list';
import { WeatherForecast } from '../pages/weatherForecast/weatherForecast';
import { CalculateWeather } from '../pages/calculateWeather/calculateWeather';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make CalculateWeather the root (or first) page
  rootPage: any = CalculateWeather;

  constructor(
    @Inject(OT_GV) private IGV: IGV,
    public platform: Platform,
    public menu: MenuController,
    public translate: TranslateService
  ) {
    this.initializeApp(translate);
  }

  initializeApp(translate) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
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
