import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { WeatherForecast } from '../pages/weatherForecast/weatherForecast';
import { CalculateWeather } from '../pages/calculateWeather/calculateWeather';
import { ForecastService } from '../services/forecast.service';
import { WeatherService } from '../services/weather.service';
import { OT_GV, IGV } from './../globalVar/gv';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    WeatherForecast,
    CalculateWeather
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    WeatherForecast,
    CalculateWeather
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: OT_GV, useValue: IGV },
    ForecastService,
    WeatherService
  ]
})
export class AppModule { }

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

