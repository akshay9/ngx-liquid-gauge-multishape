/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';
import * as liquid from './liquidFillGauge';
export class NgxLiquidGaugeComponent {
    constructor() {
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
    ngOnInit() {
        this.createChart();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.createChart();
    }
    /**
     * @return {?}
     */
    createChart() {
        /** @type {?} */
        const element = this.gauge.nativeElement;
        //clear previous chart
        d3.select(element).selectAll('*').remove();
        d3.select(element)
            .append('svg').attr('id', this.id)
            .attr('width', '150')
            .attr('height', '150');
        /** @type {?} */
        const settings = {
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
    }
}
NgxLiquidGaugeComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-ngx-liquid-gauge',
                template: `<div #gauge></div>`
            }] }
];
/** @nocollapse */
NgxLiquidGaugeComponent.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWxpcXVpZC1nYXVnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbGlxdWlkLWdhdWdlLyIsInNvdXJjZXMiOlsibGliL25neC1saXF1aWQtZ2F1Z2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sS0FBSyxNQUFNLE1BQU0sbUJBQW1CLENBQUM7QUFPNUMsTUFBTTtJQTJCSjtrQkF4QkssT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7K0JBQzNCLE1BQU0sQ0FBQyw4QkFBOEIsRUFBRTtxQkFDeEMsQ0FBQzt3QkFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVE7d0JBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUTsrQkFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlOzZCQUN0QyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWE7MkJBQ3BDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVzswQkFDakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVO3lCQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVM7NEJBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWTsrQkFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlO3dCQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVE7aUNBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCOzJCQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVc7eUJBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUzswQkFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVO2dDQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQjt3QkFDN0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFROzRCQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVk7OEJBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYzt5QkFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTOzZCQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWE7S0FFbEQ7Ozs7SUFFakIsUUFBUTtRQUNOLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQjs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BCOzs7O0lBRUQsV0FBVzs7UUFDVCxNQUFNLE9BQU8sR0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQzs7UUFFbEQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFM0MsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO2FBQ2pDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO2FBQ3BCLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7O1FBQ3pCLE1BQU0sUUFBUSxHQUFHO1lBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2pDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUMvQixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUI7WUFDekMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUN2QyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1NBQ2xDLENBQUM7UUFDRixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzNEOzs7WUExRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRSxvQkFBb0I7YUFFL0I7Ozs7O29CQUdFLFNBQVMsU0FBQyxPQUFPO29CQUdqQixLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsS0FBSzs4QkFDTCxLQUFLOzRCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxLQUFLO3VCQUNMLEtBQUs7Z0NBQ0wsS0FBSzswQkFDTCxLQUFLO3dCQUNMLEtBQUs7eUJBQ0wsS0FBSzsrQkFDTCxLQUFLO3VCQUNMLEtBQUs7MkJBQ0wsS0FBSzs2QkFDTCxLQUFLO3dCQUNMLEtBQUs7NEJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xyXG5pbXBvcnQgKiBhcyBsaXF1aWQgZnJvbSAnLi9saXF1aWRGaWxsR2F1Z2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaWItbmd4LWxpcXVpZC1nYXVnZScsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2ICNnYXVnZT48L2Rpdj5gLFxyXG4gIHN0eWxlczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neExpcXVpZEdhdWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG5cclxuICBAVmlld0NoaWxkKCdnYXVnZScpIGdhdWdlOiBhbnk7XHJcbiAgaWQgPSAnZ2F1Z2UnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwKSArIDE7IC8vIGFzc2lnbiBhIHJhbmRvbSBJRCB0byBTVkcgY29tcG9uZW50XHJcbiAgcHJpdmF0ZSBkZWZhdWx0U2V0dGluZ3MgPSBsaXF1aWQubGlxdWlkRmlsbEdhdWdlRGVmYXVsdFNldHRpbmdzKCk7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB2YWx1ZSA9IDA7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSBtaW5WYWx1ZSA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLm1pblZhbHVlO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgbWF4VmFsdWUgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy5tYXhWYWx1ZTtcclxuICBASW5wdXQoKSBwcml2YXRlIGNpcmNsZVRoaWNrbmVzcyA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLmNpcmNsZVRoaWNrbmVzcztcclxuICBASW5wdXQoKSBwcml2YXRlIGNpcmNsZUZpbGxHYXAgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy5jaXJjbGVGaWxsR2FwO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgY2lyY2xlQ29sb3IgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy5jaXJjbGVDb2xvcjtcclxuICBASW5wdXQoKSBwcml2YXRlIHdhdmVIZWlnaHQgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy53YXZlSGVpZ2h0O1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZUNvdW50ID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2F2ZUNvdW50O1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZVJpc2VUaW1lID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2F2ZVJpc2VUaW1lO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZUFuaW1hdGVUaW1lID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2F2ZUFuaW1hdGVUaW1lO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZVJpc2UgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy53YXZlUmlzZTtcclxuICBASW5wdXQoKSBwcml2YXRlIHdhdmVIZWlnaHRTY2FsaW5nID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2F2ZUhlaWdodFNjYWxpbmc7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB3YXZlQW5pbWF0ZSA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLndhdmVBbmltYXRlO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZUNvbG9yID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2F2ZUNvbG9yO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZU9mZnNldCA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLndhdmVPZmZzZXQ7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB0ZXh0VmVydFBvc2l0aW9uID0gdGhpcy5kZWZhdWx0U2V0dGluZ3MudGV4dFZlcnRQb3NpdGlvbjtcclxuICBASW5wdXQoKSBwcml2YXRlIHRleHRTaXplID0gdGhpcy5kZWZhdWx0U2V0dGluZ3MudGV4dFNpemU7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB2YWx1ZUNvdW50VXAgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy52YWx1ZUNvdW50VXA7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSBkaXNwbGF5UGVyY2VudCA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLmRpc3BsYXlQZXJjZW50O1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgdGV4dENvbG9yID0gdGhpcy5kZWZhdWx0U2V0dGluZ3MudGV4dENvbG9yO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZVRleHRDb2xvciA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLndhdmVUZXh0Q29sb3I7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5jcmVhdGVDaGFydCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5jcmVhdGVDaGFydCgpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlQ2hhcnQoKTogYW55IHtcclxuICAgIGNvbnN0IGVsZW1lbnQ6IEVsZW1lbnQgPSB0aGlzLmdhdWdlLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAvL2NsZWFyIHByZXZpb3VzIGNoYXJ0XHJcbiAgICBkMy5zZWxlY3QoZWxlbWVudCkuc2VsZWN0QWxsKCcqJykucmVtb3ZlKCk7XHJcblxyXG4gICAgZDMuc2VsZWN0KGVsZW1lbnQpXHJcbiAgICAgIC5hcHBlbmQoJ3N2ZycpLmF0dHIoJ2lkJywgdGhpcy5pZClcclxuICAgICAgLmF0dHIoJ3dpZHRoJywgJzE1MCcpXHJcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCAnMTUwJyk7XHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IHtcclxuICAgICAgbWluVmFsdWU6IHRoaXMubWluVmFsdWUsXHJcbiAgICAgIG1heFZhbHVlOiB0aGlzLm1heFZhbHVlLFxyXG4gICAgICBjaXJjbGVUaGlja25lc3M6IHRoaXMuY2lyY2xlVGhpY2tuZXNzLFxyXG4gICAgICBjaXJjbGVGaWxsR2FwOiB0aGlzLmNpcmNsZUZpbGxHYXAsXHJcbiAgICAgIGNpcmNsZUNvbG9yOiB0aGlzLmNpcmNsZUNvbG9yLFxyXG4gICAgICB3YXZlSGVpZ2h0OiB0aGlzLndhdmVIZWlnaHQsXHJcbiAgICAgIHdhdmVDb3VudDogdGhpcy53YXZlQ291bnQsXHJcbiAgICAgIHdhdmVSaXNlVGltZTogdGhpcy53YXZlUmlzZVRpbWUsXHJcbiAgICAgIHdhdmVBbmltYXRlVGltZTogdGhpcy53YXZlQW5pbWF0ZVRpbWUsXHJcbiAgICAgIHdhdmVSaXNlOiB0aGlzLndhdmVSaXNlLFxyXG4gICAgICB3YXZlSGVpZ2h0U2NhbGluZzogdGhpcy53YXZlSGVpZ2h0U2NhbGluZyxcclxuICAgICAgd2F2ZUFuaW1hdGU6IHRoaXMud2F2ZUFuaW1hdGUsXHJcbiAgICAgIHdhdmVDb2xvcjogdGhpcy53YXZlQ29sb3IsXHJcbiAgICAgIHdhdmVPZmZzZXQ6IHRoaXMud2F2ZU9mZnNldCxcclxuICAgICAgdGV4dFZlcnRQb3NpdGlvbjogdGhpcy50ZXh0VmVydFBvc2l0aW9uLFxyXG4gICAgICB0ZXh0U2l6ZTogdGhpcy50ZXh0U2l6ZSxcclxuICAgICAgdmFsdWVDb3VudFVwOiB0aGlzLnZhbHVlQ291bnRVcCxcclxuICAgICAgZGlzcGxheVBlcmNlbnQ6IHRoaXMuZGlzcGxheVBlcmNlbnQsXHJcbiAgICAgIHRleHRDb2xvcjogdGhpcy50ZXh0Q29sb3IsXHJcbiAgICAgIHdhdmVUZXh0Q29sb3I6IHRoaXMud2F2ZVRleHRDb2xvcixcclxuICAgIH07XHJcbiAgICBsaXF1aWQubG9hZExpcXVpZEZpbGxHYXVnZSh0aGlzLmlkLCB0aGlzLnZhbHVlLCBzZXR0aW5ncyk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=