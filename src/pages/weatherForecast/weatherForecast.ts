import { Component, Inject } from '@angular/core';
import { OT_GV, IGV } from './../../globalVar/gv';


@Component({
  selector: 'page-weatherForecast',
  templateUrl: 'weatherForecast.html'
})
export class WeatherForecast {
  constructor(
    @Inject(OT_GV) private IGV: IGV) {
  }
}
