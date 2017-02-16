import { Component, Inject } from '@angular/core';
import { OT_ZH, IZH } from './../../lang/zh';


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(@Inject(OT_ZH) private IZH: IZH) {
    
    console.log('ZH: '+this.IZH.HOME);
  }
}
