import { Injectable, Inject } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { OT_GV, IGV } from './../globalVar/gv';

@Injectable()
export class GlobalFunc {

    constructor( 
        @Inject(OT_GV) private IGV: IGV,
        public alertCtrl: AlertController,
        private toastCtrl: ToastController) { }

    // -------------  Alert -------------//
    presentSysErr() {
        if (this.IGV.gLangInd === 'zh') {
            let alert = this.alertCtrl.create({
                title: IGV.ERROR_ZH,
                subTitle: IGV.SORRY_SOMETHING_WRONG_ZH,
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

    presentAlert(inputTitle: string, inputSubTitle: string) {
        let alert = this.alertCtrl.create({
            title: inputTitle,
            subTitle: inputSubTitle,
            buttons: ['OK']
        });
        alert.present();
    }

    // -------------  Toast -------------//
    showToastNoNetwork() {
        if (this.IGV.gLangInd === 'zh') {
            let toast = this.toastCtrl.create({
                message: this.IGV.NO_NETWORK_CONNECTION_ZH,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        } else {
            let toast = this.toastCtrl.create({
                message: this.IGV.NO_NETWORK_CONNECTION_EN,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
    }

}