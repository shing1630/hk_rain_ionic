import { Component, ViewChild, Inject } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { StatusBar, Splashscreen } from 'ionic-native';

import { OT_GV, IGV } from './../globalVar/gv';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { WeatherForecast } from '../pages/weatherForecast/weatherForecast';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  langInd: String;

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
    this.langInd = 'zh';
    this.IGV.gLangInd = 'zh';
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let toPage: any;
    switch (page) {
      case 'HelloIonicPage': {
        toPage = HelloIonicPage;
        break;
      }
      case 'WeatherForecast': {
        toPage = WeatherForecast;
        break;
      }
      case 'ListPage': {
        toPage = ListPage;
        break;
      }
      default: {
        toPage = HelloIonicPage;
        break;
      }
    }
    this.nav.setRoot(toPage);
  }

  changeLangInd(lang) {
    this.translate.use(lang);
    this.langInd = lang;
    this.IGV.gLangInd = lang;
    this.menu.close();
  }
}
