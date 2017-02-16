import { Component, ViewChild, Inject } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { OT_EN, IEN } from './../lang/en';
import { OT_ZH, IZH } from './../lang/zh';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, icon: string, component: any}>;

  constructor(
    @Inject(OT_EN) private IEN: IEN,
    @Inject(OT_ZH) private IZH: IZH,
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

    this.IZH.HOME = 'KKKKKK';

    // set our app's pages
    this.pages = [
      { title: this.IZH.HOME, icon: 'home', component: HelloIonicPage },
      { title: this.IZH.NINE_DAY_WEATHER_FORECAST, icon: 'cloud', component: ListPage },
      { title: this.IZH.SETTING, icon: 'settings', component: HelloIonicPage },
      { title: this.IZH.ABOUT, icon: 'information-circle', component: HelloIonicPage },
      { title: this.IZH.FEEDBACK, icon: 'text', component: HelloIonicPage },
    ];
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
