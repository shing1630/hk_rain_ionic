import { OpaqueToken } from '@angular/core';

export let OT_GV = new OpaqueToken('gv');

export interface IGV {
    gLangInd: string;
}

export const IGV: IGV = {
    gLangInd: 'ZH'
};