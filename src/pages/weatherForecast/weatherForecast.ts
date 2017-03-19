import { Component, Inject } from '@angular/core';
import { OT_GV, IGV } from './../../globalVar/gv';

import { OT_EN, IEN } from './../../lang/en';
import { OT_ZH, IZH } from './../../lang/zh';


@Component({
  selector: 'selector-weatherForecast',
  templateUrl: 'weatherForecast.html'
})
export class WeatherForecast {
  constructor(   
    @Inject(OT_GV) private IGV: IGV,
    @Inject(OT_ZH) private IZH: IZH,
    @Inject(OT_EN) private IEN: IEN,) {
    
  }
}
