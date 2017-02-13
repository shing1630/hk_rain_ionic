import { OpaqueToken } from '@angular/core';

export let OT_ZH = new OpaqueToken('zh');

export interface IZH {
    HK_RAIN: string;
    HOME: string;
    ENG: string;
    ZH: string;
    NINE_DAY_WEATHER_FORECAST: string;
    SETTING:  string;
    ABOUT: string;
    FEEDBACK: string;
}

export const IZH: IZH = {
    HK_RAIN: '香港雨',
    HOME: '首頁',
    ENG: 'ENG',
    ZH: '繁',
    NINE_DAY_WEATHER_FORECAST: '九天天氣預報',
    SETTING:  '設定',
    ABOUT: '關於',
    FEEDBACK: '回饋'
};