/*!
* Note this was taken from Curtis Bratton's code: http://bl.ocks.org/brattonc/5e5ce9beee483220e2f6
* I upgraded the D3 API and made minor modifications along the way as I converted it to Typescript from Javascript.
* All credits go to Curtis.
* Dayo Adetoye. 2018. https://github.com/adedayo
*/
/*!
 * @license Open source under BSD 2-clause (http://choosealicense.com/licenses/bsd-2-clause/)
 * Copyright (c) 2015, Curtis Bratton
 * All rights reserved.
 *
 * Liquid Fill Gauge v1.1
 */
export declare function liquidFillGaugeDefaultSettings(): {
    minValue: number;
    maxValue: number;
    circleThickness: number;
    circleFillGap: number;
    circleColor: string;
    waveHeight: number;
    waveCount: number;
    waveRiseTime: number;
    waveAnimateTime: number;
    waveRise: boolean;
    waveHeightScaling: boolean;
    waveAnimate: boolean;
    waveColor: string;
    waveOffset: number;
    textVertPosition: number;
    textSize: number;
    valueCountUp: boolean;
    displayPercent: boolean;
    textColor: string;
    waveTextColor: string;
};
export declare function loadLiquidFillGauge(elementId: any, value: any, config: any): any;
