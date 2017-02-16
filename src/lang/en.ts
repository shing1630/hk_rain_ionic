import { OpaqueToken } from '@angular/core';

export let OT_EN = new OpaqueToken('en');

export interface IEN {
    HK_RAIN: string;
    HOME: string;
    ENG: string;
    ZH: string;
    NINE_DAY_WEATHER_FORECAST: string;
    SETTING:  string;
    ABOUT: string;
    FEEDBACK: string;
}

export const IEN: IEN = {

    HK_RAIN: 'HK Rain',
    HOME: 'Home',
    ENG: 'ENG',
    ZH: '繁',
    NINE_DAY_WEATHER_FORECAST: '9-day Weather Forecast',
    SETTING:  'Setting',
    ABOUT: 'About',
    FEEDBACK: 'Feedback'
};