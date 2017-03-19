import { Component, ViewChild, Inject } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { OT_GV, IGV } from './../globalVar/gv';

import { OT_EN, IEN } from './../lang/en';
import { OT_ZH, IZH } from './../lang/zh';

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
  pagesZH: Array<{title: string, icon: string, component: any}>;
  pagesEN: Array<{title: string, icon: string, component: any}>;
  langInd: String;

  constructor(
    @Inject(OT_GV) private IGV: IGV,
    
    @Inject(OT_ZH) private IZH: IZH,
    @Inject(OT_EN) private IEN: IEN,
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.langInd = this.IGV.gLangInd;

    // set our app's pages
    this.pagesZH = [
      { title: this.IZH.HOME, icon: 'home', component: HelloIonicPage },
      { title: this.IZH.NINE_DAY_WEATHER_FORECAST, icon: 'cloud', component: WeatherForecast },
      { title: this.IZH.SETTING, icon: 'settings', component: ListPage },
      { title: this.IZH.ABOUT, icon: 'information-circle', component: HelloIonicPage },
      { title: this.IZH.FEEDBACK, icon: 'text', component: HelloIonicPage },
    ];
    this.pagesEN = [
      { title: this.IEN.HOME, icon: 'home', component: HelloIonicPage },
      { title: this.IEN.NINE_DAY_WEATHER_FORECAST, icon: 'cloud', component: WeatherForecast },
      { title: this.IEN.SETTING, icon: 'settings', component: ListPage },
      { title: this.IEN.ABOUT, icon: 'information-circle', component: HelloIonicPage },
      { title: this.IEN.FEEDBACK, icon: 'text', component: HelloIonicPage },
    ];
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  changeLangInd(lang) {
        this.langInd = lang;
        this.IGV.gLangInd = lang;
        this.menu.close();
    }
}
