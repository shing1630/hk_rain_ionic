import { OpaqueToken } from '@angular/core';

export let OT_GV = new OpaqueToken('gv');

export interface IGV {
    gLangInd: string;
    monthMap: {};
    weekDayEnMap: {};
    weekDayZhMap: {};
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
    }

};

