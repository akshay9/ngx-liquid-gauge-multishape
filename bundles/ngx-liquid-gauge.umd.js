(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('d3')) :
    typeof define === 'function' && define.amd ? define('ngx-liquid-gauge', ['exports', '@angular/core', 'd3'], factory) :
    (factory((global['ngx-liquid-gauge'] = {}),global.ng.core,global.d3));
}(this, (function (exports,i0,d3) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxLiquidGaugeService = /** @class */ (function () {
        function NgxLiquidGaugeService() {
        }
        NgxLiquidGaugeService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        NgxLiquidGaugeService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgxLiquidGaugeService.ngInjectableDef = i0.defineInjectable({ factory: function NgxLiquidGaugeService_Factory() { return new NgxLiquidGaugeService(); }, token: NgxLiquidGaugeService, providedIn: "root" });
        return NgxLiquidGaugeService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @return {?}
     */
    function liquidFillGaugeDefaultSettings() {
        return {
            minValue: 0,
            // The gauge minimum value.
            maxValue: 100,
            // The gauge maximum value.
            circleThickness: 0.05,
            // The outer circle thickness as a percentage of it's radius.
            circleFillGap: 0.05,
            // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
            circleColor: '#178BCA',
            // The color of the outer circle.
            waveHeight: 0.05,
            // The wave height as a percentage of the radius of the wave circle.
            waveCount: 1,
            // The number of full waves per width of the wave circle.
            waveRiseTime: 1000,
            // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
            waveAnimateTime: 18000,
            // The amount of time in milliseconds for a full wave to enter the wave circle.
            waveRise: true,
            // Control if the wave should rise from 0 to it's full height, or start at it's full height.
            // tslint:disable-next-line:max-line-length
            waveHeightScaling: true,
            // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
            waveAnimate: true,
            // Controls if the wave scrolls or is static.
            waveColor: '#178BCA',
            // The color of the fill wave.
            waveOffset: 0,
            // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
            textVertPosition: .5,
            // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
            textSize: 1,
            // The relative height of the text to display in the wave circle. 1 = 50%
            // tslint:disable-next-line:max-line-length
            valueCountUp: true,
            // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
            displayPercent: true,
            // If true, a % symbol is displayed after the value.
            textColor: '#045681',
            // The color of the value text when the wave does not overlap it.
            waveTextColor: '#A4DBf8' // The color of the value text when the wave overlaps it.
        };
    }
    /**
     * @param {?} elementId
     * @param {?} value
     * @param {?} config
     * @return {?}
     */
    function loadLiquidFillGauge(elementId, value, config) {
        if (config == null) {
            config = liquidFillGaugeDefaultSettings();
        }
        /** @type {?} */
        var gauge = d3.select('#' + elementId);
        /** @type {?} */
        var radius = Math.min(parseInt(gauge.style('width'), 10), parseInt(gauge.style('height'), 10)) / 2;
        /** @type {?} */
        var locationX = parseInt(gauge.style('width'), 10) / 2 - radius;
        /** @type {?} */
        var locationY = parseInt(gauge.style('height'), 10) / 2 - radius;
        /** @type {?} */
        var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue;
        /** @type {?} */
        var waveHeightScale;
        if (config.waveHeightScaling) {
            waveHeightScale = d3.scaleLinear()
                .range([0, config.waveHeight, 0])
                .domain([0, 50, 100]);
        }
        else {
            waveHeightScale = d3.scaleLinear()
                .range([config.waveHeight, config.waveHeight])
                .domain([0, 100]);
        }
        /** @type {?} */
        var textPixels = (config.textSize * radius / 2);
        /** @type {?} */
        var textFinalValue = parseFloat(value).toFixed(2);
        /** @type {?} */
        var textStartValue = config.valueCountUp ? config.minValue : textFinalValue;
        /** @type {?} */
        var percentText = config.displayPercent ? '%' : '';
        /** @type {?} */
        var circleThickness = config.circleThickness * radius;
        /** @type {?} */
        var circleFillGap = config.circleFillGap * radius;
        /** @type {?} */
        var fillCircleMargin = circleThickness + circleFillGap;
        /** @type {?} */
        var fillCircleRadius = radius - fillCircleMargin;
        /** @type {?} */
        var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
        /** @type {?} */
        var waveLength = fillCircleRadius * 2 / config.waveCount;
        /** @type {?} */
        var waveClipCount = 1 + config.waveCount;
        /** @type {?} */
        var waveClipWidth = waveLength * waveClipCount;
        /** @type {?} */
        var textRounder = function (val) {
            return '' + Math.round(val);
        };
        if (parseFloat(textFinalValue) !== parseFloat(textRounder(textFinalValue))) {
            textRounder = function (val) {
                return parseFloat(val).toFixed(1);
            };
        }
        if (parseFloat(textFinalValue) !== parseFloat(textRounder(textFinalValue))) {
            textRounder = function (val) {
                return parseFloat(val).toFixed(2);
            };
        }
        /** @type {?} */
        var data = [];
        for (var i = 0; i <= 40 * waveClipCount; i++) {
            data.push({
                x: i / (40 * waveClipCount),
                y: (i / (40))
            });
        }
        /** @type {?} */
        var gaugeCircleX = d3.scaleLinear().range([0, 2 * Math.PI]).domain([0, 1]);
        /** @type {?} */
        var gaugeCircleY = d3.scaleLinear().range([0, radius]).domain([0, radius]);
        /** @type {?} */
        var waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
        /** @type {?} */
        var waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1]);
        /** @type {?} */
        var waveRiseScale = d3.scaleLinear()
            // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
            // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
            // circle at 100%.
            .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
            .domain([0, 1]);
        /** @type {?} */
        var waveAnimateScale = d3.scaleLinear()
            .range([0, waveClipWidth - fillCircleRadius * 2]) // Push the clip area one full wave then snap back.
            .domain([0, 1]);
        /** @type {?} */
        var textRiseScaleY = d3.scaleLinear()
            .range([fillCircleMargin + fillCircleRadius * 2, (fillCircleMargin + textPixels * 0.7)])
            .domain([0, 1]);
        /** @type {?} */
        var gaugeGroup = gauge.append('g')
            .attr('transform', 'translate(' + locationX + ',' + locationY + ')');
        /** @type {?} */
        var rectpoints = [{ x: 0, y: 0 }, { x: 0, y: parseInt(gauge.style('height')) }, { x: parseInt(gauge.style('width'), 10), y: parseInt(gauge.style('height')) }, { x: parseInt(gauge.style('width'), 10), y: 0 }, { x: 0, y: 0 }];
        /** @type {?} */
        var lineFunc = d3.line()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; });
        gaugeGroup.append('path')
            .attr('d', lineFunc(rectpoints))
            .attr('stroke', config.circleColor)
            .attr('stroke-width', circleThickness)
            .attr('fill', 'none');
        /** @type {?} */
        var text1 = gaugeGroup.append('text')
            .text(textRounder(textStartValue) + percentText)
            .attr('class', 'liquidFillGaugeText')
            .attr('text-anchor', 'middle')
            .attr('font-size', textPixels + 'px')
            .style('fill', config.textColor)
            .attr('transform', 'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')');
        /** @type {?} */
        var clipArea = d3.area()
            .x(function (d) {
            return waveScaleX(d.x);
        })
            .y0(function (d) {
            return waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI));
        })
            .y1(function (d) {
            return (fillCircleRadius * 2 + waveHeight);
        });
        /** @type {?} */
        var waveGroup = gaugeGroup.append('defs')
            .append('clipPath')
            .attr('id', 'clipWave' + elementId);
        /** @type {?} */
        var wave = waveGroup.append('path')
            .datum(data)
            .attr('d', clipArea)
            .attr('T', 0);
        /** @type {?} */
        var fillCircleGroup = gaugeGroup.append('g')
            .attr('clip-path', 'url(#clipWave' + elementId + ')');
        fillCircleGroup.append('rect')
            .attr('x', (radius) - fillCircleRadius)
            .attr('y', radius - fillCircleRadius)
            .attr('width', fillCircleRadius * 2)
            .attr('height', fillCircleRadius * 2)
            .style('fill', config.waveColor);
        /** @type {?} */
        var text2 = fillCircleGroup.append('text')
            .text(textRounder(textStartValue) + percentText)
            .attr('class', 'liquidFillGaugeText')
            .attr('text-anchor', 'middle')
            .attr('font-size', textPixels + 'px')
            .style('fill', config.waveTextColor)
            .attr('transform', 'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')');
        // Make the value count up.
        if (config.valueCountUp) {
            /** @type {?} */
            var textTween = function g() {
                var _this = this;
                /** @type {?} */
                var i = d3.interpolate(this.textContent, textFinalValue);
                return function (t) {
                    _this.textContent = textRounder(i(t)) + percentText;
                };
            };
            text1.transition()
                .duration(config.waveRiseTime)
                .tween('text', textTween);
            text2.transition()
                .duration(config.waveRiseTime)
                .tween('text', textTween);
        }
        /** @type {?} */
        var waveGroupXPosition = fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;
        if (config.waveRise) {
            waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(0) + ')')
                .transition()
                .duration(config.waveRiseTime)
                .attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')')
                .on('start', function () {
                wave.attr('transform', 'translate(1,0)');
            }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and
            // waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
        }
        else {
            waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')');
        }
        if (config.waveAnimate) {
            animateWave();
        }
        /**
         * @param {?=} _
         * @return {?}
         */
        function animateWave(_) {
            wave.attr('transform', 'translate(' + waveAnimateScale(+wave.attr('T')) + ',0)');
            wave.transition()
                .duration(config.waveAnimateTime * (1 - +wave.attr('T')))
                .ease(d3.easeLinear)
                .attr('transform', 'translate(' + waveAnimateScale(1) + ',0)')
                .attr('T', 1)
                .on('end', function () {
                wave.attr('T', 0);
                animateWave(config.waveAnimateTime);
            });
        }
        /**
         * @return {?}
         */
        function GaugeUpdater() {
            this.update = function (val) {
                var _this = this;
                /** @type {?} */
                var newFinalValue = parseFloat(val).toFixed(2);
                /** @type {?} */
                var textRounderUpdater = function (val2) {
                    return '' + Math.round(val2);
                };
                if (parseFloat(newFinalValue) !== parseFloat(textRounderUpdater(newFinalValue))) {
                    textRounderUpdater = function (val2) {
                        return parseFloat(val2).toFixed(1);
                    };
                }
                if (parseFloat(newFinalValue) !== parseFloat(textRounderUpdater(newFinalValue))) {
                    textRounderUpdater = function (val2) {
                        return parseFloat(val2).toFixed(2);
                    };
                }
                /** @type {?} */
                var textTween = function () {
                    /** @type {?} */
                    var i = d3.interpolate(_this.textContent, parseFloat(value).toFixed(2));
                    return function (t) {
                        this.textContent = textRounderUpdater(i(t)) + percentText;
                    };
                };
                text1.transition()
                    .duration(config.waveRiseTime)
                    .tween('text', textTween);
                text2.transition()
                    .duration(config.waveRiseTime)
                    .tween('text', textTween);
                fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue;
                waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
                waveRiseScale = d3.scaleLinear()
                    // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
                    // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
                    // circle at 100%.
                    .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
                    .domain([0, 1]);
                /** @type {?} */
                var newHeight = waveRiseScale(fillPercent);
                waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
                waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1]);
                /** @type {?} */
                var newClipArea;
                if (config.waveHeightScaling) {
                    newClipArea = d3.area()
                        .x(function (d) {
                        return waveScaleX(d.x);
                    })
                        .y0(function (d) {
                        return waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI));
                    })
                        .y1(function (d) {
                        return (fillCircleRadius * 2 + waveHeight);
                    });
                }
                else {
                    newClipArea = clipArea;
                }
                /** @type {?} */
                var newWavePosition = config.waveAnimate ? waveAnimateScale(1) : 0;
                wave.transition()
                    .duration(0)
                    .transition()
                    .duration(config.waveAnimate ? (config.waveAnimateTime * (1 - +wave.attr('T'))) : (config.waveRiseTime))
                    .ease(d3.easeLinear)
                    .attr('d', newClipArea)
                    .attr('transform', 'translate(' + newWavePosition + ',0)')
                    .attr('T', '1')
                    .on('start', function () {
                    if (config.waveAnimate) {
                        wave.attr('transform', 'translate(' + waveAnimateScale(0) + ',0)');
                        animateWave(config.waveAnimateTime);
                    }
                });
                waveGroup.transition()
                    .duration(config.waveRiseTime)
                    .attr('transform', 'translate(' + waveGroupXPosition + ',' + newHeight + ')');
            };
        }
        return new GaugeUpdater();
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxLiquidGaugeComponent = /** @class */ (function () {
        function NgxLiquidGaugeComponent() {
            this.id = 'gauge' + Math.floor(Math.random() * 100000) + 1;
            this.defaultSettings = liquidFillGaugeDefaultSettings();
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
                loadLiquidFillGauge(this.id, this.value, settings);
            };
        NgxLiquidGaugeComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'lib-ngx-liquid-gauge',
                        template: "<div #gauge></div>"
                    }] }
        ];
        /** @nocollapse */
        NgxLiquidGaugeComponent.ctorParameters = function () { return []; };
        NgxLiquidGaugeComponent.propDecorators = {
            gauge: [{ type: i0.ViewChild, args: ['gauge',] }],
            value: [{ type: i0.Input }],
            minValue: [{ type: i0.Input }],
            maxValue: [{ type: i0.Input }],
            circleThickness: [{ type: i0.Input }],
            circleFillGap: [{ type: i0.Input }],
            circleColor: [{ type: i0.Input }],
            waveHeight: [{ type: i0.Input }],
            waveCount: [{ type: i0.Input }],
            waveRiseTime: [{ type: i0.Input }],
            waveAnimateTime: [{ type: i0.Input }],
            waveRise: [{ type: i0.Input }],
            waveHeightScaling: [{ type: i0.Input }],
            waveAnimate: [{ type: i0.Input }],
            waveColor: [{ type: i0.Input }],
            waveOffset: [{ type: i0.Input }],
            textVertPosition: [{ type: i0.Input }],
            textSize: [{ type: i0.Input }],
            valueCountUp: [{ type: i0.Input }],
            displayPercent: [{ type: i0.Input }],
            textColor: [{ type: i0.Input }],
            waveTextColor: [{ type: i0.Input }]
        };
        return NgxLiquidGaugeComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxLiquidGaugeModule = /** @class */ (function () {
        function NgxLiquidGaugeModule() {
        }
        NgxLiquidGaugeModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [],
                        declarations: [NgxLiquidGaugeComponent],
                        exports: [NgxLiquidGaugeComponent]
                    },] }
        ];
        return NgxLiquidGaugeModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NgxLiquidGaugeService = NgxLiquidGaugeService;
    exports.NgxLiquidGaugeComponent = NgxLiquidGaugeComponent;
    exports.NgxLiquidGaugeModule = NgxLiquidGaugeModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWxpcXVpZC1nYXVnZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1saXF1aWQtZ2F1Z2UvbGliL25neC1saXF1aWQtZ2F1Z2Uuc2VydmljZS50cyIsIm5nOi8vbmd4LWxpcXVpZC1nYXVnZS9saWIvbGlxdWlkRmlsbEdhdWdlLnRzIiwibmc6Ly9uZ3gtbGlxdWlkLWdhdWdlL2xpYi9uZ3gtbGlxdWlkLWdhdWdlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWxpcXVpZC1nYXVnZS9saWIvbmd4LWxpcXVpZC1nYXVnZS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TGlxdWlkR2F1Z2VTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxufVxyXG4iLCIvKiFcclxuKiBOb3RlIHRoaXMgd2FzIHRha2VuIGZyb20gQ3VydGlzIEJyYXR0b24ncyBjb2RlOiBodHRwOi8vYmwub2Nrcy5vcmcvYnJhdHRvbmMvNWU1Y2U5YmVlZTQ4MzIyMGUyZjZcclxuKiBJIHVwZ3JhZGVkIHRoZSBEMyBBUEkgYW5kIG1hZGUgbWlub3IgbW9kaWZpY2F0aW9ucyBhbG9uZyB0aGUgd2F5IGFzIEkgY29udmVydGVkIGl0IHRvIFR5cGVzY3JpcHQgZnJvbSBKYXZhc2NyaXB0LlxyXG4qIEFsbCBjcmVkaXRzIGdvIHRvIEN1cnRpcy5cclxuKiBEYXlvIEFkZXRveWUuIDIwMTguIGh0dHBzOi8vZ2l0aHViLmNvbS9hZGVkYXlvXHJcbiovXHJcblxyXG5cclxuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xyXG5cclxuLyohXHJcbiAqIEBsaWNlbnNlIE9wZW4gc291cmNlIHVuZGVyIEJTRCAyLWNsYXVzZSAoaHR0cDovL2Nob29zZWFsaWNlbnNlLmNvbS9saWNlbnNlcy9ic2QtMi1jbGF1c2UvKVxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUsIEN1cnRpcyBCcmF0dG9uXHJcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIExpcXVpZCBGaWxsIEdhdWdlIHYxLjFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsaXF1aWRGaWxsR2F1Z2VEZWZhdWx0U2V0dGluZ3MoKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG1pblZhbHVlOiAwLCAvLyBUaGUgZ2F1Z2UgbWluaW11bSB2YWx1ZS5cclxuICAgIG1heFZhbHVlOiAxMDAsIC8vIFRoZSBnYXVnZSBtYXhpbXVtIHZhbHVlLlxyXG4gICAgY2lyY2xlVGhpY2tuZXNzOiAwLjA1LCAvLyBUaGUgb3V0ZXIgY2lyY2xlIHRoaWNrbmVzcyBhcyBhIHBlcmNlbnRhZ2Ugb2YgaXQncyByYWRpdXMuXHJcbiAgICBjaXJjbGVGaWxsR2FwOiAwLjA1LCAvLyBUaGUgc2l6ZSBvZiB0aGUgZ2FwIGJldHdlZW4gdGhlIG91dGVyIGNpcmNsZSBhbmQgd2F2ZSBjaXJjbGUgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSBvdXRlciBjaXJjbGVzIHJhZGl1cy5cclxuICAgIGNpcmNsZUNvbG9yOiAnIzE3OEJDQScsIC8vIFRoZSBjb2xvciBvZiB0aGUgb3V0ZXIgY2lyY2xlLlxyXG4gICAgd2F2ZUhlaWdodDogMC4wNSwgLy8gVGhlIHdhdmUgaGVpZ2h0IGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgcmFkaXVzIG9mIHRoZSB3YXZlIGNpcmNsZS5cclxuICAgIHdhdmVDb3VudDogMSwgLy8gVGhlIG51bWJlciBvZiBmdWxsIHdhdmVzIHBlciB3aWR0aCBvZiB0aGUgd2F2ZSBjaXJjbGUuXHJcbiAgICB3YXZlUmlzZVRpbWU6IDEwMDAsIC8vIFRoZSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB3YXZlIHRvIHJpc2UgZnJvbSAwIHRvIGl0J3MgZmluYWwgaGVpZ2h0LlxyXG4gICAgd2F2ZUFuaW1hdGVUaW1lOiAxODAwMCwgLy8gVGhlIGFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgYSBmdWxsIHdhdmUgdG8gZW50ZXIgdGhlIHdhdmUgY2lyY2xlLlxyXG4gICAgd2F2ZVJpc2U6IHRydWUsIC8vIENvbnRyb2wgaWYgdGhlIHdhdmUgc2hvdWxkIHJpc2UgZnJvbSAwIHRvIGl0J3MgZnVsbCBoZWlnaHQsIG9yIHN0YXJ0IGF0IGl0J3MgZnVsbCBoZWlnaHQuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICB3YXZlSGVpZ2h0U2NhbGluZzogdHJ1ZSwgLy8gQ29udHJvbHMgd2F2ZSBzaXplIHNjYWxpbmcgYXQgbG93IGFuZCBoaWdoIGZpbGwgcGVyY2VudGFnZXMuIFdoZW4gdHJ1ZSwgd2F2ZSBoZWlnaHQgcmVhY2hlcyBpdCdzIG1heGltdW0gYXQgNTAlIGZpbGwsIGFuZCBtaW5pbXVtIGF0IDAlIGFuZCAxMDAlIGZpbGwuIFRoaXMgaGVscHMgdG8gcHJldmVudCB0aGUgd2F2ZSBmcm9tIG1ha2luZyB0aGUgd2F2ZSBjaXJjbGUgZnJvbSBhcHBlYXIgdG90YWxseSBmdWxsIG9yIGVtcHR5IHdoZW4gbmVhciBpdCdzIG1pbmltdW0gb3IgbWF4aW11bSBmaWxsLlxyXG4gICAgd2F2ZUFuaW1hdGU6IHRydWUsIC8vIENvbnRyb2xzIGlmIHRoZSB3YXZlIHNjcm9sbHMgb3IgaXMgc3RhdGljLlxyXG4gICAgd2F2ZUNvbG9yOiAnIzE3OEJDQScsIC8vIFRoZSBjb2xvciBvZiB0aGUgZmlsbCB3YXZlLlxyXG4gICAgd2F2ZU9mZnNldDogMCwgLy8gVGhlIGFtb3VudCB0byBpbml0aWFsbHkgb2Zmc2V0IHRoZSB3YXZlLiAwID0gbm8gb2Zmc2V0LiAxID0gb2Zmc2V0IG9mIG9uZSBmdWxsIHdhdmUuXHJcbiAgICB0ZXh0VmVydFBvc2l0aW9uOiAuNSwgLy8gVGhlIGhlaWdodCBhdCB3aGljaCB0byBkaXNwbGF5IHRoZSBwZXJjZW50YWdlIHRleHQgd2l0aGluZyB0aGUgd2F2ZSBjaXJjbGUuIDAgPSBib3R0b20sIDEgPSB0b3AuXHJcbiAgICB0ZXh0U2l6ZTogMSwgLy8gVGhlIHJlbGF0aXZlIGhlaWdodCBvZiB0aGUgdGV4dCB0byBkaXNwbGF5IGluIHRoZSB3YXZlIGNpcmNsZS4gMSA9IDUwJVxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgdmFsdWVDb3VudFVwOiB0cnVlLCAvLyBJZiB0cnVlLCB0aGUgZGlzcGxheWVkIHZhbHVlIGNvdW50cyB1cCBmcm9tIDAgdG8gaXQncyBmaW5hbCB2YWx1ZSB1cG9uIGxvYWRpbmcuIElmIGZhbHNlLCB0aGUgZmluYWwgdmFsdWUgaXMgZGlzcGxheWVkLlxyXG4gICAgZGlzcGxheVBlcmNlbnQ6IHRydWUsIC8vIElmIHRydWUsIGEgJSBzeW1ib2wgaXMgZGlzcGxheWVkIGFmdGVyIHRoZSB2YWx1ZS5cclxuXHJcbiAgICB0ZXh0Q29sb3I6ICcjMDQ1NjgxJywgLy8gVGhlIGNvbG9yIG9mIHRoZSB2YWx1ZSB0ZXh0IHdoZW4gdGhlIHdhdmUgZG9lcyBub3Qgb3ZlcmxhcCBpdC5cclxuICAgIHdhdmVUZXh0Q29sb3I6ICcjQTREQmY4JyAvLyBUaGUgY29sb3Igb2YgdGhlIHZhbHVlIHRleHQgd2hlbiB0aGUgd2F2ZSBvdmVybGFwcyBpdC5cclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZExpcXVpZEZpbGxHYXVnZShlbGVtZW50SWQsIHZhbHVlLCBjb25maWcpIHtcclxuICBpZiAoY29uZmlnID09IG51bGwpIHtcclxuICAgIGNvbmZpZyA9IGxpcXVpZEZpbGxHYXVnZURlZmF1bHRTZXR0aW5ncygpO1xyXG4gIH1cclxuICBjb25zdCBnYXVnZSA9IGQzLnNlbGVjdCgnIycgKyBlbGVtZW50SWQpO1xyXG4gIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKHBhcnNlSW50KGdhdWdlLnN0eWxlKCd3aWR0aCcpLCAxMCksIHBhcnNlSW50KGdhdWdlLnN0eWxlKCdoZWlnaHQnKSwgMTApKSAvIDI7XHJcbiAgY29uc3QgbG9jYXRpb25YID0gcGFyc2VJbnQoZ2F1Z2Uuc3R5bGUoJ3dpZHRoJyksIDEwKSAvIDIgLSByYWRpdXM7XHJcbiAgY29uc3QgbG9jYXRpb25ZID0gcGFyc2VJbnQoZ2F1Z2Uuc3R5bGUoJ2hlaWdodCcpLCAxMCkgLyAyIC0gcmFkaXVzO1xyXG4gIGxldCBmaWxsUGVyY2VudCA9IE1hdGgubWF4KGNvbmZpZy5taW5WYWx1ZSwgTWF0aC5taW4oY29uZmlnLm1heFZhbHVlLCB2YWx1ZSkpIC8gY29uZmlnLm1heFZhbHVlO1xyXG5cclxuICBsZXQgd2F2ZUhlaWdodFNjYWxlO1xyXG4gIGlmIChjb25maWcud2F2ZUhlaWdodFNjYWxpbmcpIHtcclxuICAgIHdhdmVIZWlnaHRTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgLnJhbmdlKFswLCBjb25maWcud2F2ZUhlaWdodCwgMF0pXHJcbiAgICAgIC5kb21haW4oWzAsIDUwLCAxMDBdKTtcclxuICB9IGVsc2Uge1xyXG4gICAgd2F2ZUhlaWdodFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAucmFuZ2UoW2NvbmZpZy53YXZlSGVpZ2h0LCBjb25maWcud2F2ZUhlaWdodF0pXHJcbiAgICAgIC5kb21haW4oWzAsIDEwMF0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdGV4dFBpeGVscyA9IChjb25maWcudGV4dFNpemUgKiByYWRpdXMgLyAyKTtcclxuICBjb25zdCB0ZXh0RmluYWxWYWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpLnRvRml4ZWQoMik7XHJcbiAgY29uc3QgdGV4dFN0YXJ0VmFsdWUgPSBjb25maWcudmFsdWVDb3VudFVwID8gY29uZmlnLm1pblZhbHVlIDogdGV4dEZpbmFsVmFsdWU7XHJcbiAgY29uc3QgcGVyY2VudFRleHQgPSBjb25maWcuZGlzcGxheVBlcmNlbnQgPyAnJScgOiAnJztcclxuICBjb25zdCBjaXJjbGVUaGlja25lc3MgPSBjb25maWcuY2lyY2xlVGhpY2tuZXNzICogcmFkaXVzO1xyXG4gIGNvbnN0IGNpcmNsZUZpbGxHYXAgPSBjb25maWcuY2lyY2xlRmlsbEdhcCAqIHJhZGl1cztcclxuICBjb25zdCBmaWxsQ2lyY2xlTWFyZ2luID0gY2lyY2xlVGhpY2tuZXNzICsgY2lyY2xlRmlsbEdhcDtcclxuICBjb25zdCBmaWxsQ2lyY2xlUmFkaXVzID0gcmFkaXVzIC0gZmlsbENpcmNsZU1hcmdpbjtcclxuICBsZXQgd2F2ZUhlaWdodCA9IGZpbGxDaXJjbGVSYWRpdXMgKiB3YXZlSGVpZ2h0U2NhbGUoZmlsbFBlcmNlbnQgKiAxMDApO1xyXG5cclxuICBjb25zdCB3YXZlTGVuZ3RoID0gZmlsbENpcmNsZVJhZGl1cyAqIDIgLyBjb25maWcud2F2ZUNvdW50O1xyXG4gIGNvbnN0IHdhdmVDbGlwQ291bnQgPSAxICsgY29uZmlnLndhdmVDb3VudDtcclxuICBjb25zdCB3YXZlQ2xpcFdpZHRoID0gd2F2ZUxlbmd0aCAqIHdhdmVDbGlwQ291bnQ7XHJcblxyXG4gIC8vIFJvdW5kaW5nIGZ1bmN0aW9ucyBzbyB0aGF0IHRoZSBjb3JyZWN0IG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyBpcyBhbHdheXMgZGlzcGxheWVkIGFzIHRoZSB2YWx1ZSBjb3VudHMgdXAuXHJcbiAgbGV0IHRleHRSb3VuZGVyID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgcmV0dXJuICcnICsgTWF0aC5yb3VuZCh2YWwpO1xyXG4gIH07XHJcbiAgaWYgKHBhcnNlRmxvYXQodGV4dEZpbmFsVmFsdWUpICE9PSBwYXJzZUZsb2F0KHRleHRSb3VuZGVyKHRleHRGaW5hbFZhbHVlKSkpIHtcclxuICAgIHRleHRSb3VuZGVyID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWwpLnRvRml4ZWQoMSk7XHJcbiAgICB9O1xyXG4gIH1cclxuICBpZiAocGFyc2VGbG9hdCh0ZXh0RmluYWxWYWx1ZSkgIT09IHBhcnNlRmxvYXQodGV4dFJvdW5kZXIodGV4dEZpbmFsVmFsdWUpKSkge1xyXG4gICAgdGV4dFJvdW5kZXIgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbCkudG9GaXhlZCgyKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBEYXRhIGZvciBidWlsZGluZyB0aGUgY2xpcCB3YXZlIGFyZWEuXHJcbiAgY29uc3QgZGF0YSA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDw9IDQwICogd2F2ZUNsaXBDb3VudDsgaSsrKSB7XHJcbiAgICBkYXRhLnB1c2goe1xyXG4gICAgICB4OiBpIC8gKDQwICogd2F2ZUNsaXBDb3VudCksXHJcbiAgICAgIHk6IChpIC8gKDQwKSlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gU2NhbGVzIGZvciBkcmF3aW5nIHRoZSBvdXRlciBjaXJjbGUuXHJcbiAgY29uc3QgZ2F1Z2VDaXJjbGVYID0gZDMuc2NhbGVMaW5lYXIoKS5yYW5nZShbMCwgMiAqIE1hdGguUEldKS5kb21haW4oWzAsIDFdKTtcclxuICBjb25zdCBnYXVnZUNpcmNsZVkgPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFswLCByYWRpdXNdKS5kb21haW4oWzAsIHJhZGl1c10pO1xyXG5cclxuICAvLyBTY2FsZXMgZm9yIGNvbnRyb2xsaW5nIHRoZSBzaXplIG9mIHRoZSBjbGlwcGluZyBwYXRoLlxyXG4gIGxldCB3YXZlU2NhbGVYID0gZDMuc2NhbGVMaW5lYXIoKS5yYW5nZShbMCwgd2F2ZUNsaXBXaWR0aF0pLmRvbWFpbihbMCwgMV0pO1xyXG4gIGxldCB3YXZlU2NhbGVZID0gZDMuc2NhbGVMaW5lYXIoKS5yYW5nZShbMCwgd2F2ZUhlaWdodF0pLmRvbWFpbihbMCwgMV0pO1xyXG5cclxuICAvLyBTY2FsZXMgZm9yIGNvbnRyb2xsaW5nIHRoZSBwb3NpdGlvbiBvZiB0aGUgY2xpcHBpbmcgcGF0aC5cclxuICBsZXQgd2F2ZVJpc2VTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgIC8vIFRoZSBjbGlwcGluZyBhcmVhIHNpemUgaXMgdGhlIGhlaWdodCBvZiB0aGUgZmlsbCBjaXJjbGUgKyB0aGUgd2F2ZSBoZWlnaHQsIHNvIHdlIHBvc2l0aW9uIHRoZSBjbGlwIHdhdmVcclxuICAgIC8vIHN1Y2ggdGhhdCB0aGUgaXQgd2lsbCBvdmVybGFwIHRoZSBmaWxsIGNpcmNsZSBhdCBhbGwgd2hlbiBhdCAwJSwgYW5kIHdpbGwgdG90YWxseSBjb3ZlciB0aGUgZmlsbFxyXG4gICAgLy8gY2lyY2xlIGF0IDEwMCUuXHJcbiAgICAucmFuZ2UoWyhmaWxsQ2lyY2xlTWFyZ2luICsgZmlsbENpcmNsZVJhZGl1cyAqIDIgKyB3YXZlSGVpZ2h0KSwgKGZpbGxDaXJjbGVNYXJnaW4gLSB3YXZlSGVpZ2h0KV0pXHJcbiAgICAuZG9tYWluKFswLCAxXSk7XHJcbiAgY29uc3Qgd2F2ZUFuaW1hdGVTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgIC5yYW5nZShbMCwgd2F2ZUNsaXBXaWR0aCAtIGZpbGxDaXJjbGVSYWRpdXMgKiAyXSkgLy8gUHVzaCB0aGUgY2xpcCBhcmVhIG9uZSBmdWxsIHdhdmUgdGhlbiBzbmFwIGJhY2suXHJcbiAgICAuZG9tYWluKFswLCAxXSk7XHJcblxyXG4gIC8vIFNjYWxlIGZvciBjb250cm9sbGluZyB0aGUgcG9zaXRpb24gb2YgdGhlIHRleHQgd2l0aGluIHRoZSBnYXVnZS5cclxuICBjb25zdCB0ZXh0UmlzZVNjYWxlWSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgIC5yYW5nZShbZmlsbENpcmNsZU1hcmdpbiArIGZpbGxDaXJjbGVSYWRpdXMgKiAyLCAoZmlsbENpcmNsZU1hcmdpbiArIHRleHRQaXhlbHMgKiAwLjcpXSlcclxuICAgIC5kb21haW4oWzAsIDFdKTtcclxuXHJcbiAgLy8gQ2VudGVyIHRoZSBnYXVnZSB3aXRoaW4gdGhlIHBhcmVudCBTVkcuXHJcbiAgY29uc3QgZ2F1Z2VHcm91cCA9IGdhdWdlLmFwcGVuZCgnZycpXHJcbiAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbG9jYXRpb25YICsgJywnICsgbG9jYXRpb25ZICsgJyknKTtcclxuXHJcbiAgLy8gRHJhdyB0aGUgb3V0ZXIgUmVjdGFuZ2xlLlxyXG4gIHZhciByZWN0cG9pbnRzID0gW3t4OiAwLCB5OiAwfSwge3g6IDAsIHk6IHBhcnNlSW50KGdhdWdlLnN0eWxlKCdoZWlnaHQnKSl9LCB7eDogcGFyc2VJbnQoZ2F1Z2Uuc3R5bGUoJ3dpZHRoJyksIDEwKSwgeTogcGFyc2VJbnQoZ2F1Z2Uuc3R5bGUoJ2hlaWdodCcpKX0sIHt4OiBwYXJzZUludChnYXVnZS5zdHlsZSgnd2lkdGgnKSwgMTApLCB5OiAwfSwge3g6IDAsIHk6IDB9XTtcclxuICB2YXIgbGluZUZ1bmMgPSBkMy5saW5lKClcclxuICAgICAgLngoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC54IH0pXHJcbiAgICAgIC55KGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueSB9KTtcclxuICBnYXVnZUdyb3VwLmFwcGVuZCgncGF0aCcpXHJcbiAgICAuYXR0cignZCcsIGxpbmVGdW5jKHJlY3Rwb2ludHMpKVxyXG4gICAgLmF0dHIoJ3N0cm9rZScsIGNvbmZpZy5jaXJjbGVDb2xvcilcclxuICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCBjaXJjbGVUaGlja25lc3MpXHJcbiAgICAuYXR0cignZmlsbCcsICdub25lJyk7XHJcblxyXG4gIC8vIFRleHQgd2hlcmUgdGhlIHdhdmUgZG9lcyBub3Qgb3ZlcmxhcC5cclxuICBjb25zdCB0ZXh0MSA9IGdhdWdlR3JvdXAuYXBwZW5kKCd0ZXh0JylcclxuICAgIC50ZXh0KHRleHRSb3VuZGVyKHRleHRTdGFydFZhbHVlKSArIHBlcmNlbnRUZXh0KVxyXG4gICAgLmF0dHIoJ2NsYXNzJywgJ2xpcXVpZEZpbGxHYXVnZVRleHQnKVxyXG4gICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcbiAgICAuYXR0cignZm9udC1zaXplJywgdGV4dFBpeGVscyArICdweCcpXHJcbiAgICAuc3R5bGUoJ2ZpbGwnLCBjb25maWcudGV4dENvbG9yKVxyXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHJhZGl1cyArICcsJyArIHRleHRSaXNlU2NhbGVZKGNvbmZpZy50ZXh0VmVydFBvc2l0aW9uKSArICcpJyk7XHJcblxyXG4gIC8vIFRoZSBjbGlwcGluZyB3YXZlIGFyZWEuXHJcbiAgY29uc3QgY2xpcEFyZWEgPSBkMy5hcmVhKClcclxuICAgIC54KGZ1bmN0aW9uIChkOiBhbnkpIHtcclxuICAgICAgcmV0dXJuIHdhdmVTY2FsZVgoZC54KTtcclxuICAgIH0pXHJcbiAgICAueTAoZnVuY3Rpb24gKGQ6IGFueSkge1xyXG4gICAgICByZXR1cm4gd2F2ZVNjYWxlWShNYXRoLnNpbihNYXRoLlBJICogMiAqIGNvbmZpZy53YXZlT2Zmc2V0ICogLTEgKyBNYXRoLlBJICogMiAqICgxIC0gY29uZmlnLndhdmVDb3VudCkgKyBkLnkgKiAyICogTWF0aC5QSSkpO1xyXG4gICAgfSlcclxuICAgIC55MShmdW5jdGlvbiAoZCkge1xyXG4gICAgICByZXR1cm4gKGZpbGxDaXJjbGVSYWRpdXMgKiAyICsgd2F2ZUhlaWdodCk7XHJcbiAgICB9KTtcclxuICBjb25zdCB3YXZlR3JvdXAgPSBnYXVnZUdyb3VwLmFwcGVuZCgnZGVmcycpXHJcbiAgICAuYXBwZW5kKCdjbGlwUGF0aCcpXHJcbiAgICAuYXR0cignaWQnLCAnY2xpcFdhdmUnICsgZWxlbWVudElkKTtcclxuICBjb25zdCB3YXZlID0gd2F2ZUdyb3VwLmFwcGVuZCgncGF0aCcpXHJcbiAgICAuZGF0dW0oZGF0YSlcclxuICAgIC5hdHRyKCdkJywgY2xpcEFyZWEpXHJcbiAgICAuYXR0cignVCcsIDApO1xyXG5cclxuICAvLyBUaGUgaW5uZXIgY2lyY2xlIHdpdGggdGhlIGNsaXBwaW5nIHdhdmUgYXR0YWNoZWQuXHJcbiAgY29uc3QgZmlsbENpcmNsZUdyb3VwID0gZ2F1Z2VHcm91cC5hcHBlbmQoJ2cnKVxyXG4gICAgLmF0dHIoJ2NsaXAtcGF0aCcsICd1cmwoI2NsaXBXYXZlJyArIGVsZW1lbnRJZCArICcpJyk7XHJcbiAgZmlsbENpcmNsZUdyb3VwLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgLmF0dHIoJ3gnLCAocmFkaXVzKSAtIGZpbGxDaXJjbGVSYWRpdXMpXHJcbiAgICAgICAgLmF0dHIoJ3knLCByYWRpdXMgLSBmaWxsQ2lyY2xlUmFkaXVzKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGZpbGxDaXJjbGVSYWRpdXMqMilcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgZmlsbENpcmNsZVJhZGl1cyoyKVxyXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsIGNvbmZpZy53YXZlQ29sb3IpO1xyXG5cclxuICAvLyBUZXh0IHdoZXJlIHRoZSB3YXZlIGRvZXMgb3ZlcmxhcC5cclxuICBjb25zdCB0ZXh0MiA9IGZpbGxDaXJjbGVHcm91cC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgLnRleHQodGV4dFJvdW5kZXIodGV4dFN0YXJ0VmFsdWUpICsgcGVyY2VudFRleHQpXHJcbiAgICAuYXR0cignY2xhc3MnLCAnbGlxdWlkRmlsbEdhdWdlVGV4dCcpXHJcbiAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcclxuICAgIC5hdHRyKCdmb250LXNpemUnLCB0ZXh0UGl4ZWxzICsgJ3B4JylcclxuICAgIC5zdHlsZSgnZmlsbCcsIGNvbmZpZy53YXZlVGV4dENvbG9yKVxyXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHJhZGl1cyArICcsJyArIHRleHRSaXNlU2NhbGVZKGNvbmZpZy50ZXh0VmVydFBvc2l0aW9uKSArICcpJyk7XHJcblxyXG4gIC8vIE1ha2UgdGhlIHZhbHVlIGNvdW50IHVwLlxyXG4gIGlmIChjb25maWcudmFsdWVDb3VudFVwKSB7XHJcbiAgICBjb25zdCB0ZXh0VHdlZW4gPSBmdW5jdGlvbiBnKCkge1xyXG4gICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUodGhpcy50ZXh0Q29udGVudCwgdGV4dEZpbmFsVmFsdWUpO1xyXG4gICAgICByZXR1cm4gKHQpID0+IHtcclxuICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gdGV4dFJvdW5kZXIoaSh0KSkgKyBwZXJjZW50VGV4dDtcclxuICAgICAgfTtcclxuICAgIH07XHJcbiAgICB0ZXh0MS50cmFuc2l0aW9uKClcclxuICAgICAgLmR1cmF0aW9uKGNvbmZpZy53YXZlUmlzZVRpbWUpXHJcbiAgICAgIC50d2VlbigndGV4dCcsIHRleHRUd2Vlbik7XHJcbiAgICB0ZXh0Mi50cmFuc2l0aW9uKClcclxuICAgICAgLmR1cmF0aW9uKGNvbmZpZy53YXZlUmlzZVRpbWUpXHJcbiAgICAgIC50d2VlbigndGV4dCcsIHRleHRUd2Vlbik7XHJcbiAgfVxyXG5cclxuICAvLyBNYWtlIHRoZSB3YXZlIHJpc2UuIHdhdmUgYW5kIHdhdmVHcm91cCBhcmUgc2VwYXJhdGUgc28gdGhhdCBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBtb3ZlbWVudCBjYW4gYmUgY29udHJvbGxlZCBpbmRlcGVuZGVudGx5LlxyXG4gIGNvbnN0IHdhdmVHcm91cFhQb3NpdGlvbiA9IGZpbGxDaXJjbGVNYXJnaW4gKyBmaWxsQ2lyY2xlUmFkaXVzICogMiAtIHdhdmVDbGlwV2lkdGg7XHJcbiAgaWYgKGNvbmZpZy53YXZlUmlzZSkge1xyXG5cclxuICAgIHdhdmVHcm91cC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB3YXZlR3JvdXBYUG9zaXRpb24gKyAnLCcgKyB3YXZlUmlzZVNjYWxlKDApICsgJyknKVxyXG4gICAgICAudHJhbnNpdGlvbigpXHJcbiAgICAgIC5kdXJhdGlvbihjb25maWcud2F2ZVJpc2VUaW1lKVxyXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgd2F2ZUdyb3VwWFBvc2l0aW9uICsgJywnICsgd2F2ZVJpc2VTY2FsZShmaWxsUGVyY2VudCkgKyAnKScpXHJcbiAgICAgIC5vbignc3RhcnQnLCAoKSA9PiB7XHJcbiAgICAgICAgd2F2ZS5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDEsMCknKTtcclxuICAgICAgfSk7IC8vIFRoaXMgdHJhbnNmb3JtIGlzIG5lY2Vzc2FyeSB0byBnZXQgdGhlIGNsaXAgd2F2ZSBwb3NpdGlvbmVkIGNvcnJlY3RseSB3aGVuIHdhdmVSaXNlPXRydWUgYW5kXHJcbiAgICAvLyB3YXZlQW5pbWF0ZT1mYWxzZS4gVGhlIHdhdmUgd2lsbCBub3QgcG9zaXRpb24gY29ycmVjdGx5IHdpdGhvdXQgdGhpcywgYnV0IGl0J3Mgbm90IGNsZWFyIHdoeSB0aGlzIGlzIGFjdHVhbGx5IG5lY2Vzc2FyeS5cclxuICB9IGVsc2Uge1xyXG4gICAgd2F2ZUdyb3VwLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHdhdmVHcm91cFhQb3NpdGlvbiArICcsJyArIHdhdmVSaXNlU2NhbGUoZmlsbFBlcmNlbnQpICsgJyknKTtcclxuICB9XHJcblxyXG4gIGlmIChjb25maWcud2F2ZUFuaW1hdGUpIHtcclxuICAgIGFuaW1hdGVXYXZlKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhbmltYXRlV2F2ZShfPzogYW55KSB7XHJcbiAgICB3YXZlLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHdhdmVBbmltYXRlU2NhbGUoK3dhdmUuYXR0cignVCcpKSArICcsMCknKTtcclxuICAgIHdhdmUudHJhbnNpdGlvbigpXHJcbiAgICAgIC5kdXJhdGlvbihjb25maWcud2F2ZUFuaW1hdGVUaW1lICogKDEgLSArd2F2ZS5hdHRyKCdUJykpKVxyXG4gICAgICAuZWFzZShkMy5lYXNlTGluZWFyKVxyXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgd2F2ZUFuaW1hdGVTY2FsZSgxKSArICcsMCknKVxyXG4gICAgICAuYXR0cignVCcsIDEpXHJcbiAgICAgIC5vbignZW5kJywgKCkgPT4ge1xyXG4gICAgICAgIHdhdmUuYXR0cignVCcsIDApO1xyXG4gICAgICAgIGFuaW1hdGVXYXZlKGNvbmZpZy53YXZlQW5pbWF0ZVRpbWUpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIEdhdWdlVXBkYXRlcigpIHtcclxuICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICBjb25zdCBuZXdGaW5hbFZhbHVlID0gcGFyc2VGbG9hdCh2YWwpLnRvRml4ZWQoMik7XHJcbiAgICAgIGxldCB0ZXh0Um91bmRlclVwZGF0ZXIgPSBmdW5jdGlvbiAodmFsMikge1xyXG4gICAgICAgIHJldHVybiAnJyArIE1hdGgucm91bmQodmFsMik7XHJcbiAgICAgIH07XHJcbiAgICAgIGlmIChwYXJzZUZsb2F0KG5ld0ZpbmFsVmFsdWUpICE9PSBwYXJzZUZsb2F0KHRleHRSb3VuZGVyVXBkYXRlcihuZXdGaW5hbFZhbHVlKSkpIHtcclxuICAgICAgICB0ZXh0Um91bmRlclVwZGF0ZXIgPSBmdW5jdGlvbiAodmFsMikge1xyXG4gICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsMikudG9GaXhlZCgxKTtcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChwYXJzZUZsb2F0KG5ld0ZpbmFsVmFsdWUpICE9PSBwYXJzZUZsb2F0KHRleHRSb3VuZGVyVXBkYXRlcihuZXdGaW5hbFZhbHVlKSkpIHtcclxuICAgICAgICB0ZXh0Um91bmRlclVwZGF0ZXIgPSBmdW5jdGlvbiAodmFsMikge1xyXG4gICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsMikudG9GaXhlZCgyKTtcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB0ZXh0VHdlZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaSA9IGQzLmludGVycG9sYXRlKHRoaXMudGV4dENvbnRlbnQsIHBhcnNlRmxvYXQodmFsdWUpLnRvRml4ZWQoMikpO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IHRleHRSb3VuZGVyVXBkYXRlcihpKHQpKSArIHBlcmNlbnRUZXh0O1xyXG4gICAgICAgIH07XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0ZXh0MS50cmFuc2l0aW9uKClcclxuICAgICAgICAuZHVyYXRpb24oY29uZmlnLndhdmVSaXNlVGltZSlcclxuICAgICAgICAudHdlZW4oJ3RleHQnLCB0ZXh0VHdlZW4pO1xyXG4gICAgICB0ZXh0Mi50cmFuc2l0aW9uKClcclxuICAgICAgICAuZHVyYXRpb24oY29uZmlnLndhdmVSaXNlVGltZSlcclxuICAgICAgICAudHdlZW4oJ3RleHQnLCB0ZXh0VHdlZW4pO1xyXG5cclxuICAgICAgZmlsbFBlcmNlbnQgPSBNYXRoLm1heChjb25maWcubWluVmFsdWUsIE1hdGgubWluKGNvbmZpZy5tYXhWYWx1ZSwgdmFsdWUpKSAvIGNvbmZpZy5tYXhWYWx1ZTtcclxuICAgICAgd2F2ZUhlaWdodCA9IGZpbGxDaXJjbGVSYWRpdXMgKiB3YXZlSGVpZ2h0U2NhbGUoZmlsbFBlcmNlbnQgKiAxMDApO1xyXG4gICAgICB3YXZlUmlzZVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC8vIFRoZSBjbGlwcGluZyBhcmVhIHNpemUgaXMgdGhlIGhlaWdodCBvZiB0aGUgZmlsbCBjaXJjbGUgKyB0aGUgd2F2ZSBoZWlnaHQsIHNvIHdlIHBvc2l0aW9uIHRoZSBjbGlwIHdhdmVcclxuICAgICAgICAvLyBzdWNoIHRoYXQgdGhlIGl0IHdpbGwgb3ZlcmxhcCB0aGUgZmlsbCBjaXJjbGUgYXQgYWxsIHdoZW4gYXQgMCUsIGFuZCB3aWxsIHRvdGFsbHkgY292ZXIgdGhlIGZpbGxcclxuICAgICAgICAvLyBjaXJjbGUgYXQgMTAwJS5cclxuICAgICAgICAucmFuZ2UoWyhmaWxsQ2lyY2xlTWFyZ2luICsgZmlsbENpcmNsZVJhZGl1cyAqIDIgKyB3YXZlSGVpZ2h0KSwgKGZpbGxDaXJjbGVNYXJnaW4gLSB3YXZlSGVpZ2h0KV0pXHJcbiAgICAgICAgLmRvbWFpbihbMCwgMV0pO1xyXG4gICAgICBjb25zdCBuZXdIZWlnaHQgPSB3YXZlUmlzZVNjYWxlKGZpbGxQZXJjZW50KTtcclxuICAgICAgd2F2ZVNjYWxlWCA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoWzAsIHdhdmVDbGlwV2lkdGhdKS5kb21haW4oWzAsIDFdKTtcclxuICAgICAgd2F2ZVNjYWxlWSA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoWzAsIHdhdmVIZWlnaHRdKS5kb21haW4oWzAsIDFdKTtcclxuICAgICAgbGV0IG5ld0NsaXBBcmVhO1xyXG4gICAgICBpZiAoY29uZmlnLndhdmVIZWlnaHRTY2FsaW5nKSB7XHJcbiAgICAgICAgbmV3Q2xpcEFyZWEgPSBkMy5hcmVhKClcclxuICAgICAgICAgIC54KChkOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHdhdmVTY2FsZVgoZC54KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAueTAoKGQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gd2F2ZVNjYWxlWShNYXRoLnNpbihNYXRoLlBJICogMiAqIGNvbmZpZy53YXZlT2Zmc2V0ICogLTEgKyBNYXRoLlBJICogMiAqICgxIC0gY29uZmlnLndhdmVDb3VudCkgKyBkLnkgKiAyICogTWF0aC5QSSkpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC55MSgoZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKGZpbGxDaXJjbGVSYWRpdXMgKiAyICsgd2F2ZUhlaWdodCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdDbGlwQXJlYSA9IGNsaXBBcmVhO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBuZXdXYXZlUG9zaXRpb24gPSBjb25maWcud2F2ZUFuaW1hdGUgPyB3YXZlQW5pbWF0ZVNjYWxlKDEpIDogMDtcclxuICAgICAgd2F2ZS50cmFuc2l0aW9uKClcclxuICAgICAgICAuZHVyYXRpb24oMClcclxuICAgICAgICAudHJhbnNpdGlvbigpXHJcbiAgICAgICAgLmR1cmF0aW9uKGNvbmZpZy53YXZlQW5pbWF0ZSA/IChjb25maWcud2F2ZUFuaW1hdGVUaW1lICogKDEgLSArd2F2ZS5hdHRyKCdUJykpKSA6IChjb25maWcud2F2ZVJpc2VUaW1lKSlcclxuICAgICAgICAuZWFzZShkMy5lYXNlTGluZWFyKVxyXG4gICAgICAgIC5hdHRyKCdkJywgbmV3Q2xpcEFyZWEpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG5ld1dhdmVQb3NpdGlvbiArICcsMCknKVxyXG4gICAgICAgIC5hdHRyKCdUJywgJzEnKVxyXG4gICAgICAgIC5vbignc3RhcnQnLCAoKSA9PiB7XHJcbiAgICAgICAgICBpZiAoY29uZmlnLndhdmVBbmltYXRlKSB7XHJcbiAgICAgICAgICAgIHdhdmUuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgd2F2ZUFuaW1hdGVTY2FsZSgwKSArICcsMCknKTtcclxuICAgICAgICAgICAgYW5pbWF0ZVdhdmUoY29uZmlnLndhdmVBbmltYXRlVGltZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHdhdmVHcm91cC50cmFuc2l0aW9uKClcclxuICAgICAgICAuZHVyYXRpb24oY29uZmlnLndhdmVSaXNlVGltZSlcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgd2F2ZUdyb3VwWFBvc2l0aW9uICsgJywnICsgbmV3SGVpZ2h0ICsgJyknKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IEdhdWdlVXBkYXRlcigpO1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xyXG5pbXBvcnQgKiBhcyBsaXF1aWQgZnJvbSAnLi9saXF1aWRGaWxsR2F1Z2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaWItbmd4LWxpcXVpZC1nYXVnZScsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2ICNnYXVnZT48L2Rpdj5gLFxyXG4gIHN0eWxlczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neExpcXVpZEdhdWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG5cclxuICBAVmlld0NoaWxkKCdnYXVnZScpIGdhdWdlOiBhbnk7XHJcbiAgaWQgPSAnZ2F1Z2UnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwKSArIDE7IC8vIGFzc2lnbiBhIHJhbmRvbSBJRCB0byBTVkcgY29tcG9uZW50XHJcbiAgcHJpdmF0ZSBkZWZhdWx0U2V0dGluZ3MgPSBsaXF1aWQubGlxdWlkRmlsbEdhdWdlRGVmYXVsdFNldHRpbmdzKCk7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB2YWx1ZSA9IDA7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSBtaW5WYWx1ZSA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLm1pblZhbHVlO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgbWF4VmFsdWUgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy5tYXhWYWx1ZTtcclxuICBASW5wdXQoKSBwcml2YXRlIGNpcmNsZVRoaWNrbmVzcyA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLmNpcmNsZVRoaWNrbmVzcztcclxuICBASW5wdXQoKSBwcml2YXRlIGNpcmNsZUZpbGxHYXAgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy5jaXJjbGVGaWxsR2FwO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgY2lyY2xlQ29sb3IgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy5jaXJjbGVDb2xvcjtcclxuICBASW5wdXQoKSBwcml2YXRlIHdhdmVIZWlnaHQgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy53YXZlSGVpZ2h0O1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZUNvdW50ID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2F2ZUNvdW50O1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZVJpc2VUaW1lID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2F2ZVJpc2VUaW1lO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZUFuaW1hdGVUaW1lID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2F2ZUFuaW1hdGVUaW1lO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZVJpc2UgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy53YXZlUmlzZTtcclxuICBASW5wdXQoKSBwcml2YXRlIHdhdmVIZWlnaHRTY2FsaW5nID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2F2ZUhlaWdodFNjYWxpbmc7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB3YXZlQW5pbWF0ZSA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLndhdmVBbmltYXRlO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZUNvbG9yID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2F2ZUNvbG9yO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZU9mZnNldCA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLndhdmVPZmZzZXQ7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB0ZXh0VmVydFBvc2l0aW9uID0gdGhpcy5kZWZhdWx0U2V0dGluZ3MudGV4dFZlcnRQb3NpdGlvbjtcclxuICBASW5wdXQoKSBwcml2YXRlIHRleHRTaXplID0gdGhpcy5kZWZhdWx0U2V0dGluZ3MudGV4dFNpemU7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB2YWx1ZUNvdW50VXAgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy52YWx1ZUNvdW50VXA7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSBkaXNwbGF5UGVyY2VudCA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLmRpc3BsYXlQZXJjZW50O1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgdGV4dENvbG9yID0gdGhpcy5kZWZhdWx0U2V0dGluZ3MudGV4dENvbG9yO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZVRleHRDb2xvciA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLndhdmVUZXh0Q29sb3I7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5jcmVhdGVDaGFydCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5jcmVhdGVDaGFydCgpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlQ2hhcnQoKTogYW55IHtcclxuICAgIGNvbnN0IGVsZW1lbnQ6IEVsZW1lbnQgPSB0aGlzLmdhdWdlLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAvL2NsZWFyIHByZXZpb3VzIGNoYXJ0XHJcbiAgICBkMy5zZWxlY3QoZWxlbWVudCkuc2VsZWN0QWxsKCcqJykucmVtb3ZlKCk7XHJcblxyXG4gICAgZDMuc2VsZWN0KGVsZW1lbnQpXHJcbiAgICAgIC5hcHBlbmQoJ3N2ZycpLmF0dHIoJ2lkJywgdGhpcy5pZClcclxuICAgICAgLmF0dHIoJ3dpZHRoJywgJzE1MCcpXHJcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCAnMTUwJyk7XHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IHtcclxuICAgICAgbWluVmFsdWU6IHRoaXMubWluVmFsdWUsXHJcbiAgICAgIG1heFZhbHVlOiB0aGlzLm1heFZhbHVlLFxyXG4gICAgICBjaXJjbGVUaGlja25lc3M6IHRoaXMuY2lyY2xlVGhpY2tuZXNzLFxyXG4gICAgICBjaXJjbGVGaWxsR2FwOiB0aGlzLmNpcmNsZUZpbGxHYXAsXHJcbiAgICAgIGNpcmNsZUNvbG9yOiB0aGlzLmNpcmNsZUNvbG9yLFxyXG4gICAgICB3YXZlSGVpZ2h0OiB0aGlzLndhdmVIZWlnaHQsXHJcbiAgICAgIHdhdmVDb3VudDogdGhpcy53YXZlQ291bnQsXHJcbiAgICAgIHdhdmVSaXNlVGltZTogdGhpcy53YXZlUmlzZVRpbWUsXHJcbiAgICAgIHdhdmVBbmltYXRlVGltZTogdGhpcy53YXZlQW5pbWF0ZVRpbWUsXHJcbiAgICAgIHdhdmVSaXNlOiB0aGlzLndhdmVSaXNlLFxyXG4gICAgICB3YXZlSGVpZ2h0U2NhbGluZzogdGhpcy53YXZlSGVpZ2h0U2NhbGluZyxcclxuICAgICAgd2F2ZUFuaW1hdGU6IHRoaXMud2F2ZUFuaW1hdGUsXHJcbiAgICAgIHdhdmVDb2xvcjogdGhpcy53YXZlQ29sb3IsXHJcbiAgICAgIHdhdmVPZmZzZXQ6IHRoaXMud2F2ZU9mZnNldCxcclxuICAgICAgdGV4dFZlcnRQb3NpdGlvbjogdGhpcy50ZXh0VmVydFBvc2l0aW9uLFxyXG4gICAgICB0ZXh0U2l6ZTogdGhpcy50ZXh0U2l6ZSxcclxuICAgICAgdmFsdWVDb3VudFVwOiB0aGlzLnZhbHVlQ291bnRVcCxcclxuICAgICAgZGlzcGxheVBlcmNlbnQ6IHRoaXMuZGlzcGxheVBlcmNlbnQsXHJcbiAgICAgIHRleHRDb2xvcjogdGhpcy50ZXh0Q29sb3IsXHJcbiAgICAgIHdhdmVUZXh0Q29sb3I6IHRoaXMud2F2ZVRleHRDb2xvcixcclxuICAgIH07XHJcbiAgICBsaXF1aWQubG9hZExpcXVpZEZpbGxHYXVnZSh0aGlzLmlkLCB0aGlzLnZhbHVlLCBzZXR0aW5ncyk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ3hMaXF1aWRHYXVnZUNvbXBvbmVudCB9IGZyb20gJy4vbmd4LWxpcXVpZC1nYXVnZS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtOZ3hMaXF1aWRHYXVnZUNvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW05neExpcXVpZEdhdWdlQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TGlxdWlkR2F1Z2VNb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiZDMuc2VsZWN0IiwiZDMuc2NhbGVMaW5lYXIiLCJkMy5saW5lIiwiZDMuYXJlYSIsImQzLmludGVycG9sYXRlIiwiZDMuZWFzZUxpbmVhciIsImxpcXVpZC5saXF1aWRGaWxsR2F1Z2VEZWZhdWx0U2V0dGluZ3MiLCJsaXF1aWQubG9hZExpcXVpZEZpbGxHYXVnZSIsIkNvbXBvbmVudCIsIlZpZXdDaGlsZCIsIklucHV0IiwiTmdNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQU9FO1NBQWlCOztvQkFMbEJBLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7O29DQUpEOzs7Ozs7Ozs7O0FDaUJBO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxDQUFDOztZQUNYLFFBQVEsRUFBRSxHQUFHOztZQUNiLGVBQWUsRUFBRSxJQUFJOztZQUNyQixhQUFhLEVBQUUsSUFBSTs7WUFDbkIsV0FBVyxFQUFFLFNBQVM7O1lBQ3RCLFVBQVUsRUFBRSxJQUFJOztZQUNoQixTQUFTLEVBQUUsQ0FBQzs7WUFDWixZQUFZLEVBQUUsSUFBSTs7WUFDbEIsZUFBZSxFQUFFLEtBQUs7O1lBQ3RCLFFBQVEsRUFBRSxJQUFJOzs7WUFFZCxpQkFBaUIsRUFBRSxJQUFJOztZQUN2QixXQUFXLEVBQUUsSUFBSTs7WUFDakIsU0FBUyxFQUFFLFNBQVM7O1lBQ3BCLFVBQVUsRUFBRSxDQUFDOztZQUNiLGdCQUFnQixFQUFFLEVBQUU7O1lBQ3BCLFFBQVEsRUFBRSxDQUFDOzs7WUFFWCxZQUFZLEVBQUUsSUFBSTs7WUFDbEIsY0FBYyxFQUFFLElBQUk7O1lBRXBCLFNBQVMsRUFBRSxTQUFTOztZQUNwQixhQUFhLEVBQUUsU0FBUztTQUN6QixDQUFDO0tBQ0g7Ozs7Ozs7QUFFRCxpQ0FBb0MsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNO1FB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