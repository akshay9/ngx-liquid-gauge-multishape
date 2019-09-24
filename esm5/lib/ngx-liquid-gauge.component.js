/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';
import * as liquid from './liquidFillGauge';
var NgxLiquidGaugeComponent = /** @class */ (function () {
    function NgxLiquidGaugeComponent() {
        this.id = 'gauge' + Math.floor(Math.random() * 100000) + 1;
        this.defaultSettings = liquid.liquidFillGaugeDefaultSettings();
        this.value = 0;
        this.minValue = this.defaultSettings.minValue;
        this.maxValue = this.defaultSettings.maxValue;
        this.circleThickness = this.defaultSettings.circleThickness;
        this.circleFillGap = this.defaultSettings.circleFillGap;
        this.circleColor = this.defaultSettings.circleColor;
        this.waveHeight = this.defaultSettings.waveHeight;
        this.waveCount = this.defaultSettings.waveCount;
        this.waveRiseTime = this.defaultSettings.waveRiseTime;
        this.waveAnimateTime = this.defaultSettings.waveAnimateTime;
        this.waveRise = this.defaultSettings.waveRise;
        this.waveHeightScaling = this.defaultSettings.waveHeightScaling;
        this.waveAnimate = this.defaultSettings.waveAnimate;
        this.waveColor = this.defaultSettings.waveColor;
        this.waveOffset = this.defaultSettings.waveOffset;
        this.textVertPosition = this.defaultSettings.textVertPosition;
        this.textSize = this.defaultSettings.textSize;
        this.valueCountUp = this.defaultSettings.valueCountUp;
        this.displayPercent = this.defaultSettings.displayPercent;
        this.textColor = this.defaultSettings.textColor;
        this.waveTextColor = this.defaultSettings.waveTextColor;
    }
    /**
     * @return {?}
     */
    NgxLiquidGaugeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.createChart();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxLiquidGaugeComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.createChart();
    };
    /**
     * @return {?}
     */
    NgxLiquidGaugeComponent.prototype.createChart = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = this.gauge.nativeElement;
        //clear previous chart
        d3.select(element).selectAll('*').remove();
        d3.select(element)
            .append('svg').attr('id', this.id)
            .attr('width', '150')
            .attr('height', '150');
        /** @type {?} */
        var settings = {
            minValue: this.minValue,
            maxValue: this.maxValue,
            circleThickness: this.circleThickness,
            circleFillGap: this.circleFillGap,
            circleColor: this.circleColor,
            waveHeight: this.waveHeight,
            waveCount: this.waveCount,
            waveRiseTime: this.waveRiseTime,
            waveAnimateTime: this.waveAnimateTime,
            waveRise: this.waveRise,
            waveHeightScaling: this.waveHeightScaling,
            waveAnimate: this.waveAnimate,
            waveColor: this.waveColor,
            waveOffset: this.waveOffset,
            textVertPosition: this.textVertPosition,
            textSize: this.textSize,
            valueCountUp: this.valueCountUp,
            displayPercent: this.displayPercent,
            textColor: this.textColor,
            waveTextColor: this.waveTextColor,
        };
        liquid.loadLiquidFillGauge(this.id, this.value, settings);
    };
    NgxLiquidGaugeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-ngx-liquid-gauge',
                    template: "<div #gauge></div>"
                }] }
    ];
    /** @nocollapse */
    NgxLiquidGaugeComponent.ctorParameters = function () { return []; };
    NgxLiquidGaugeComponent.propDecorators = {
        gauge: [{ type: ViewChild, args: ['gauge',] }],
        value: [{ type: Input }],
        minValue: [{ type: Input }],
        maxValue: [{ type: Input }],
        circleThickness: [{ type: Input }],
        circleFillGap: [{ type: Input }],
        circleColor: [{ type: Input }],
        waveHeight: [{ type: Input }],
        waveCount: [{ type: Input }],
        waveRiseTime: [{ type: Input }],
        waveAnimateTime: [{ type: Input }],
        waveRise: [{ type: Input }],
        waveHeightScaling: [{ type: Input }],
        waveAnimate: [{ type: Input }],
        waveColor: [{ type: Input }],
        waveOffset: [{ type: Input }],
        textVertPosition: [{ type: Input }],
        textSize: [{ type: Input }],
        valueCountUp: [{ type: Input }],
        displayPercent: [{ type: Input }],
        textColor: [{ type: Input }],
        waveTextColor: [{ type: Input }]
    };
    return NgxLiquidGaugeComponent;
}());
export { NgxLiquidGaugeComponent };
if (false) {
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.gauge;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.id;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.defaultSettings;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.value;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.minValue;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.maxValue;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.circleThickness;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.circleFillGap;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.circleColor;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.waveHeight;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.waveCount;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.waveRiseTime;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.waveAnimateTime;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.waveRise;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.waveHeightScaling;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.waveAnimate;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.waveColor;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.waveOffset;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.textVertPosition;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.textSize;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.valueCountUp;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.displayPercent;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.textColor;
    /** @type {?} */
    NgxLiquidGaugeComponent.prototype.waveTextColor;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWxpcXVpZC1nYXVnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbGlxdWlkLWdhdWdlLyIsInNvdXJjZXMiOlsibGliL25neC1saXF1aWQtZ2F1Z2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sS0FBSyxNQUFNLE1BQU0sbUJBQW1CLENBQUM7O0lBa0MxQztrQkF4QkssT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7K0JBQzNCLE1BQU0sQ0FBQyw4QkFBOEIsRUFBRTtxQkFDeEMsQ0FBQzt3QkFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVE7d0JBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUTsrQkFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlOzZCQUN0QyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWE7MkJBQ3BDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVzswQkFDakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVO3lCQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVM7NEJBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWTsrQkFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlO3dCQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVE7aUNBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCOzJCQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVc7eUJBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUzswQkFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVO2dDQUN6QixJQUFJLENBQUMsZUFB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ZCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XHJcbmltcG9ydCAqIGFzIGxpcXVpZCBmcm9tICcuL2xpcXVpZEZpbGxHYXVnZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi1uZ3gtbGlxdWlkLWdhdWdlJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgI2dhdWdlPjwvZGl2PmAsXHJcbiAgc3R5bGVzOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TGlxdWlkR2F1Z2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2dhdWdlJykgZ2F1Z2U6IGFueTtcclxuICBpZCA9ICdnYXVnZScgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDApICsgMTsgLy8gYXNzaWduIGEgcmFuZG9tIElEIHRvIFNWRyBjb21wb25lbnRcclxuICBwcml2YXRlIGRlZmF1bHRTZXR0aW5ncyA9IGxpcXVpZC5saXF1aWRGaWxsR2F1Z2VEZWZhdWx0U2V0dGluZ3MoKTtcclxuICBASW5wdXQoKSBwcml2YXRlIHZhbHVlID0gMDtcclxuICBASW5wdXQoKSBwcml2YXRlIG1pblZhbHVlID0gdGhpcy5kZWZhdWx0U2V0dGluZ3MubWluVmFsdWU7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSBtYXhWYWx1ZSA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLm1heFZhbHVlO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgY2lyY2xlVGhpY2tuZXNzID0gdGhpcy5kZWZhdWx0U2V0dGluZ3MuY2lyY2xlVGhpY2tuZXNzO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgY2lyY2xlRmlsbEdhcCA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLmNpcmNsZUZpbGxHYXA7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSBjaXJjbGVDb2xvciA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLmNpcmNsZUNvbG9yO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZUhlaWdodCA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLndhdmVIZWlnaHQ7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB3YXZlQ291bnQgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy53YXZlQ291bnQ7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB3YXZlUmlzZVRpbWUgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy53YXZlUmlzZVRpbWU7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB3YXZlQW5pbWF0ZVRpbWUgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy53YXZlQW5pbWF0ZVRpbWU7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB3YXZlUmlzZSA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLndhdmVSaXNlO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZUhlaWdodFNjYWxpbmcgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy53YXZlSGVpZ2h0U2NhbGluZztcclxuICBASW5wdXQoKSBwcml2YXRlIHdhdmVBbmltYXRlID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2F2ZUFuaW1hdGU7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB3YXZlQ29sb3IgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy53YXZlQ29sb3I7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB3YXZlT2Zmc2V0ID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2F2ZU9mZnNldDtcclxuICBASW5wdXQoKSBwcml2YXRlIHRleHRWZXJ0UG9zaXRpb24gPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy50ZXh0VmVydFBvc2l0aW9uO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgdGV4dFNpemUgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy50ZXh0U2l6ZTtcclxuICBASW5wdXQoKSBwcml2YXRlIHZhbHVlQ291bnRVcCA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLnZhbHVlQ291bnRVcDtcclxuICBASW5wdXQoKSBwcml2YXRlIGRpc3BsYXlQZXJjZW50ID0gdGhpcy5kZWZhdWx0U2V0dGluZ3MuZGlzcGxheVBlcmNlbnQ7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB0ZXh0Q29sb3IgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy50ZXh0Q29sb3I7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB3YXZlVGV4dENvbG9yID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2F2ZVRleHRDb2xvcjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUNoYXJ0KCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLmNyZWF0ZUNoYXJ0KCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVDaGFydCgpOiBhbnkge1xyXG4gICAgY29uc3QgZWxlbWVudDogRWxlbWVudCA9IHRoaXMuZ2F1Z2UubmF0aXZlRWxlbWVudDtcclxuICAgIC8vY2xlYXIgcHJldmlvdXMgY2hhcnRcclxuICAgIGQzLnNlbGVjdChlbGVtZW50KS5zZWxlY3RBbGwoJyonKS5yZW1vdmUoKTtcclxuXHJcbiAgICBkMy5zZWxlY3QoZWxlbWVudClcclxuICAgICAgLmFwcGVuZCgnc3ZnJykuYXR0cignaWQnLCB0aGlzLmlkKVxyXG4gICAgICAuYXR0cignd2lkdGgnLCAnMTUwJylcclxuICAgICAgLmF0dHIoJ2hlaWdodCcsICcxNTAnKTtcclxuICAgIGNvbnN0IHNldHRpbmdzID0ge1xyXG4gICAgICBtaW5WYWx1ZTogdGhpcy5taW5WYWx1ZSxcclxuICAgICAgbWF4VmFsdWU6IHRoaXMubWF4VmFsdWUsXHJcbiAgICAgIGNpcmNsZVRoaWNrbmVzczogdGhpcy5jaXJjbGVUaGlja25lc3MsXHJcbiAgICAgIGNpcmNsZUZpbGxHYXA6IHRoaXMuY2lyY2xlRmlsbEdhcCxcclxuICAgICAgY2lyY2xlQ29sb3I6IHRoaXMuY2lyY2xlQ29sb3IsXHJcbiAgICAgIHdhdmVIZWlnaHQ6IHRoaXMud2F2ZUhlaWdodCxcclxuICAgICAgd2F2ZUNvdW50OiB0aGlzLndhdmVDb3VudCxcclxuICAgICAgd2F2ZVJpc2VUaW1lOiB0aGlzLndhdmVSaXNlVGltZSxcclxuICAgICAgd2F2ZUFuaW1hdGVUaW1lOiB0aGlzLndhdmVBbmltYXRlVGltZSxcclxuICAgICAgd2F2ZVJpc2U6IHRoaXMud2F2ZVJpc2UsXHJcbiAgICAgIHdhdmVIZWlnaHRTY2FsaW5nOiB0aGlzLndhdmVIZWlnaHRTY2FsaW5nLFxyXG4gICAgICB3YXZlQW5pbWF0ZTogdGhpcy53YXZlQW5pbWF0ZSxcclxuICAgICAgd2F2ZUNvbG9yOiB0aGlzLndhdmVDb2xvcixcclxuICAgICAgd2F2ZU9mZnNldDogdGhpcy53YXZlT2Zmc2V0LFxyXG4gICAgICB0ZXh0VmVydFBvc2l0aW9uOiB0aGlzLnRleHRWZXJ0UG9zaXRpb24sXHJcbiAgICAgIHRleHRTaXplOiB0aGlzLnRleHRTaXplLFxyXG4gICAgICB2YWx1ZUNvdW50VXA6IHRoaXMudmFsdWVDb3VudFVwLFxyXG4gICAgICBkaXNwbGF5UGVyY2VudDogdGhpcy5kaXNwbGF5UGVyY2VudCxcclxuICAgICAgdGV4dENvbG9yOiB0aGlzLnRleHRDb2xvcixcclxuICAgICAgd2F2ZVRleHRDb2xvcjogdGhpcy53YXZlVGV4dENvbG9yLFxyXG4gICAgfTtcclxuICAgIGxpcXVpZC5sb2FkTGlxdWlkRmlsbEdhdWdlKHRoaXMuaWQsIHRoaXMudmFsdWUsIHNldHRpbmdzKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==