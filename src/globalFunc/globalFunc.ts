import { Injectable, Inject } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AdMob, AdMobOptions } from '@ionic-native/admob';
import { Market } from '@ionic-native/market';
import { OT_GV, IGV } from './../globalVar/gv';

@Injectable()
export class GlobalFunc {

    public loading: any;

    constructor(
        @Inject(OT_GV) private IGV: IGV,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public adMob: AdMob,
        private market: Market,
        private toastCtrl: ToastController) { }


    // Open app store / market
    openMarket(appStoreID: string) {
        this.market.open(appStoreID);
    }
    // -------------  Alert -------------//
    presentSysErr() {
        if (this.IGV.gLangInd === 'zh') {
            let alert = this.alertCtrl.create({
                title: this.IGV.ERROR_ZH,
                subTitle: this.IGV.SORRY_SOMETHING_WRONG_ZH,
                buttons: ['OK']
            });
            alert.present();
        } else {
            let alert = this.alertCtrl.create({
                title: this.IGV.ERROR_EN,
                subTitle: this.IGV.SORRY_SOMETHING_WRONG_EN,
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

    // -------------  Loading -------------//
    loadingPresent() {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `
                <div class="centerAndMiddle">
                    <img width="50%" height="50%" src="assets/img/logo/hkRain_ain.gif">
                </div>`,
        });
        this.loading.present();
    }

    loadingDismiss() {
        this.loading.dismiss();
    }

    public initAds() {
        if (!this.adMob) {
            console.log("AdMob not found.");
            return;
        }
        this.setAdMobIds();
        this.showBanner();
        this.showInterstitial();
    }

    public setAdMobIds() {
        if (/(android)/i.test(navigator.userAgent)) {
            this.IGV.AD_MOB_ID_BANNER = 'ca-app-pub-7668464781725150/1638150628';
            this.IGV.AD_MOB_ID_INTER = 'ca-app-pub-7668464781725150/8044611026';
            this.IGV.AD_MOB_ID_VIDEO = 'ca-app-pub-7668464781725150/9590442629';
        } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            this.IGV.AD_MOB_ID_BANNER = 'ca-app-pub-7668464781725150/6068350226';
            this.IGV.AD_MOB_ID_INTER = 'ca-app-pub-7668464781725150/6428277028';
            this.IGV.AD_MOB_ID_VIDEO = 'ca-app-pub-7668464781725150/8113709427';
        } else {
            this.IGV.AD_MOB_ID_BANNER = '';
            this.IGV.AD_MOB_ID_INTER = '';
        }
    }

    public showBanner() {
        if (!/(android)/i.test(navigator.userAgent)
            && !/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            return false;
        }

        let adBannerOptions: AdMobOptions = <AdMobOptions>{};

        adBannerOptions = {
            adId: this.IGV.AD_MOB_ID_BANNER,
            position: this.adMob.AD_POSITION.BOTTOM_CENTER,
            isTesting: this.IGV.isTestingAdmob,
            autoShow: true
            //adExtras: this.adExtras
        }

        this.adMob.createBanner(adBannerOptions);

        return true;
    }

    public removeBanner() {
        this.adMob.removeBanner();
        return true;
    }

    public showInterstitial() {
        if (!/(android)/i.test(navigator.userAgent)
            && !/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            return false;
        }

        if (this.IGV.admobCount > 0) {
            this.IGV.admobCount--;
            return false;
        }

        let adInterOptions: AdMobOptions = <AdMobOptions>{};

        adInterOptions = {
            adId: this.IGV.AD_MOB_ID_INTER,
            isTesting: this.IGV.isTestingAdmob,
            autoShow: true
            //adExtras: this.adExtras
        }

        this.adMob.prepareInterstitial(adInterOptions)
            .then(() => { this.adMob.showInterstitial(); this.IGV.admobCount = this.IGV.ADMOB_MAX_NUMBER });
        return true;
    }

        public showInterstitialImmd() {
        if (!/(android)/i.test(navigator.userAgent)
            && !/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            return false;
        }

        let adInterOptions: AdMobOptions = <AdMobOptions>{};

        adInterOptions = {
            adId: this.IGV.AD_MOB_ID_INTER,
            isTesting: this.IGV.isTestingAdmob,
            autoShow: true
            //adExtras: this.adExtras
        }

        this.adMob.prepareInterstitial(adInterOptions)
            .then(() => { this.adMob.showInterstitial(); this.IGV.admobCount = this.IGV.ADMOB_MAX_NUMBER });
        return true;
    }

    public showRewardVideoAd() {

        this.loadingPresent();

        if (!/(android)/i.test(navigator.userAgent)
            && !/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            return false;
        }
        
        let adInterOptions: AdMobOptions = <AdMobOptions>{};

        adInterOptions = {
            adId: this.IGV.AD_MOB_ID_VIDEO,
            isTesting: this.IGV.isTestingAdmob,
            //adExtras: this.adExtras
        }

        this.adMob.prepareRewardVideoAd(adInterOptions)
            .then(() => { this.loadingDismiss(); this.adMob.showRewardVideoAd(); });
        return true;
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