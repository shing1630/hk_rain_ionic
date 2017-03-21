import { Component, Inject } from '@angular/core';
import { OT_GV, IGV } from './../../globalVar/gv';

import { Forecast } from "../../models/Forecast";
import { ForecastService } from "../../services/forecast.service";


@Component({
  selector: 'page-weatherForecast',
  templateUrl: 'weatherForecast.html'
})
export class WeatherForecast {
  forecastList: Forecast[] = [];

  langInd: string;

  monthMap: {};
  weekDayEnMap: {};
  weekDayZhMap: {};

  constructor(
    @Inject(OT_GV) private IGV: IGV,
    private forecastService: ForecastService) {
    this.langInd = IGV.gLangInd;
    this.monthMap = IGV.monthMap;
    this.weekDayEnMap = IGV.weekDayEnMap;
    this.weekDayZhMap = IGV.weekDayZhMap;
  }

  ngOnInit() {
    this.forecastService.getForecast()
      .then(forecastList => {
        this.forecastList = forecastList;
        for (var key in this.forecastList) {
          if (this.forecastList.hasOwnProperty(key)) {
            let currDate: Date = new Date();
            currDate.setDate(currDate.getDate() + Number(key));
            this.forecastList[key].weekDay = Number(currDate.getDay());
          }
        }
      });
  }
}
