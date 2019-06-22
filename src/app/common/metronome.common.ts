import {Injectable} from '@angular/core';

@Injectable()
export class MetronomeCommon {

    public prev(array: any[], selectedObj: any): any {
        for (let i = 0; i < array.length; i++) {
            const param: any = array[i];
            if (selectedObj === param) {
                if (i > 0) {
                    selectedObj = array[i - 1];
                    break;
                }
            }
        }

        return selectedObj;
    }

    public next(array: any[], selectedObj: any): any {
        for (let i = 0; i < array.length; i++) {
            const param: any = array[i];
            if (selectedObj === param) {
                if (i < array.length - 1) {
                    selectedObj = array[i + 1];
                    break;
                }
            }
        }
        return selectedObj;
    }
}
