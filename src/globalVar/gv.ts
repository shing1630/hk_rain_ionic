import { OpaqueToken } from '@angular/core';

export let OT_GV = new OpaqueToken('gv');

export interface IGV {
    gLangInd: string;
    monthMap: {};
    weekDayEnMap: {};
    weekDayZhMap: {};
    filterYear: number;
    NEW: string;
    RAIN_SUN_THRESHOLD: number;
    SUNSHINE: string;
    DRIZZLE: string;
    LIGHT: string;
    MODERATE: string;
    HEAVY: string;
    VIOLENT_TORRENTIAL: string;
    SUNSHINE_EN: string;
    DRIZZLE_EN: string;
    LIGHT_EN: string;
    MODERATE_EN: string;
    HEAVY_EN: string;
    VIOLENT_EN: string;
    TORRENTIAL_EN: string;
    SUNSHINE_ZH: string;
    DRIZZLE_ZH: string;
    LIGHT_ZH: string;
    MODERATE_ZH: string;
    HEAVY_ZH: string;
    VIOLENT_ZH: string;
    TORRENTIAL_ZH: string;
    DRIZZLE_THRESHOLD: number;
    LIGHT_THRESHOLD: number;
    MODERATE_THRESHOLD: number;
    HEAVY_THRESHOLD: number;
    VIOLENT_THRESHOLD: number;
    TORRENTIAL_THRESHOLD: number;
    S0001: string;
    S0002: string;
    NO_OF_YEARS_CHANGED_TO_EN: string;
    NO_OF_YEARS_CHANGED_TO_ZH: string;
    SUBMITTED_SUCCESSFULLY_EN: string;
    SUBMITTED_SUCCESSFULLY_ZH: string;
}

export const IGV: IGV = {
    gLangInd: 'ZH',
    monthMap: {
        1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May',
        6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sept', 10: 'Oct', 11: 'Nov', 12: 'Dec'
    },
    weekDayEnMap: {
        0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed',
        4: 'Thu', 5: 'Fri', 6: 'Sat'
    },
    weekDayZhMap: {
        0: '日', 1: '一', 2: '二', 3: '三',
        4: '四', 5: '五', 6: '六'
    },
    filterYear: 25,
    NEW: 'new',
    RAIN_SUN_THRESHOLD: 50,
    SUNSHINE: 'sunshine',
    DRIZZLE: 'drizzle',
    LIGHT: 'light',
    MODERATE: 'moderate',
    HEAVY: 'heavy',
    VIOLENT_TORRENTIAL: 'violent_torrential',
    SUNSHINE_EN: 'Sunshine',
    DRIZZLE_EN: 'Drizzle',
    LIGHT_EN: 'Light',
    MODERATE_EN: 'Moderate',
    HEAVY_EN: 'Heavy',
    VIOLENT_EN: 'Violent',
    TORRENTIAL_EN: 'Torrential',
    SUNSHINE_ZH: '天晴',
    DRIZZLE_ZH: '毛毛雨',
    LIGHT_ZH: '小雨',
    MODERATE_ZH: '中雨',
    HEAVY_ZH: '大雨',
    VIOLENT_ZH: '暴雨',
    TORRENTIAL_ZH: '大暴雨',
    DRIZZLE_THRESHOLD: 0.05,
    LIGHT_THRESHOLD: 9.9,
    MODERATE_THRESHOLD: 24.9,
    HEAVY_THRESHOLD: 49.9,
    VIOLENT_THRESHOLD: 99.9,
    TORRENTIAL_THRESHOLD: 100,
    S0001: 'S0001:',
    S0002: 'S0002:',
    NO_OF_YEARS_CHANGED_TO_EN: 'No of years changed to',
    NO_OF_YEARS_CHANGED_TO_ZH: '年數改變至',
    SUBMITTED_SUCCESSFULLY_EN: 'Submitted successfully!',
    SUBMITTED_SUCCESSFULLY_ZH: '成功遞交!',

};

