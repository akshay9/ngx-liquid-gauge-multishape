import { Injectable, Component, ViewChild, Input, NgModule, defineInjectable } from '@angular/core';
import { select, scaleLinear, line, area, interpolate, easeLinear } from 'd3';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxLiquidGaugeService = /** @class */ (function () {
    function NgxLiquidGaugeService() {
    }
    NgxLiquidGaugeService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgxLiquidGaugeService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgxLiquidGaugeService.ngInjectableDef = defineInjectable({ factory: function NgxLiquidGaugeService_Factory() { return new NgxLiquidGaugeService(); }, token: NgxLiquidGaugeService, providedIn: "root" });
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
    var gauge = select('#' + elementId);
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
        waveHeightScale = scaleLinear()
            .range([0, config.waveHeight, 0])
            .domain([0, 50, 100]);
    }
    else {
        waveHeightScale = scaleLinear()
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
    var gaugeCircleX = scaleLinear().range([0, 2 * Math.PI]).domain([0, 1]);
    /** @type {?} */
    var gaugeCircleY = scaleLinear().range([0, radius]).domain([0, radius]);
    /** @type {?} */
    var waveScaleX = scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
    /** @type {?} */
    var waveScaleY = scaleLinear().range([0, waveHeight]).domain([0, 1]);
    /** @type {?} */
    var waveRiseScale = scaleLinear()
        // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
        // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
        // circle at 100%.
        .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
        .domain([0, 1]);
    /** @type {?} */
    var waveAnimateScale = scaleLinear()
        .range([0, waveClipWidth - fillCircleRadius * 2]) // Push the clip area one full wave then snap back.
        .domain([0, 1]);
    /** @type {?} */
    var textRiseScaleY = scaleLinear()
        .range([fillCircleMargin + fillCircleRadius * 2, (fillCircleMargin + textPixels * 0.7)])
        .domain([0, 1]);
    /** @type {?} */
    var gaugeGroup = gauge.append('g')
        .attr('transform', 'translate(' + locationX + ',' + locationY + ')');
    /** @type {?} */
    var rectpoints = [{ x: 0, y: 0 }, { x: 0, y: parseInt(gauge.style('height')) }, { x: parseInt(gauge.style('width'), 10), y: parseInt(gauge.style('height')) }, { x: parseInt(gauge.style('width'), 10), y: 0 }, { x: 0, y: 0 }];
    /** @type {?} */
    var lineFunc = line()
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
    var clipArea = area()
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
            var i = interpolate(this.textContent, textFinalValue);
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
            .ease(easeLinear)
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
                var i = interpolate(_this.textContent, parseFloat(value).toFixed(2));
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
            waveRiseScale = scaleLinear()
                // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
                // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
                // circle at 100%.
                .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
                .domain([0, 1]);
            /** @type {?} */
            var newHeight = waveRiseScale(fillPercent);
            waveScaleX = scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
            waveScaleY = scaleLinear().range([0, waveHeight]).domain([0, 1]);
            /** @type {?} */
            var newClipArea;
            if (config.waveHeightScaling) {
                newClipArea = area()
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
                .ease(easeLinear)
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
        select(element).selectAll('*').remove();
        select(element)
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxLiquidGaugeModule = /** @class */ (function () {
    function NgxLiquidGaugeModule() {
    }
    NgxLiquidGaugeModule.decorators = [
        { type: NgModule, args: [{
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

export { NgxLiquidGaugeService, NgxLiquidGaugeComponent, NgxLiquidGaugeModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWxpcXVpZC1nYXVnZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWxpcXVpZC1nYXVnZS9saWIvbmd4LWxpcXVpZC1nYXVnZS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtbGlxdWlkLWdhdWdlL2xpYi9saXF1aWRGaWxsR2F1Z2UudHMiLCJuZzovL25neC1saXF1aWQtZ2F1Z2UvbGliL25neC1saXF1aWQtZ2F1Z2UuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbGlxdWlkLWdhdWdlL2xpYi9uZ3gtbGlxdWlkLWdhdWdlLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hMaXF1aWRHYXVnZVNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59XHJcbiIsIi8qIVxyXG4qIE5vdGUgdGhpcyB3YXMgdGFrZW4gZnJvbSBDdXJ0aXMgQnJhdHRvbidzIGNvZGU6IGh0dHA6Ly9ibC5vY2tzLm9yZy9icmF0dG9uYy81ZTVjZTliZWVlNDgzMjIwZTJmNlxyXG4qIEkgdXBncmFkZWQgdGhlIEQzIEFQSSBhbmQgbWFkZSBtaW5vciBtb2RpZmljYXRpb25zIGFsb25nIHRoZSB3YXkgYXMgSSBjb252ZXJ0ZWQgaXQgdG8gVHlwZXNjcmlwdCBmcm9tIEphdmFzY3JpcHQuXHJcbiogQWxsIGNyZWRpdHMgZ28gdG8gQ3VydGlzLlxyXG4qIERheW8gQWRldG95ZS4gMjAxOC4gaHR0cHM6Ly9naXRodWIuY29tL2FkZWRheW9cclxuKi9cclxuXHJcblxyXG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XHJcblxyXG4vKiFcclxuICogQGxpY2Vuc2UgT3BlbiBzb3VyY2UgdW5kZXIgQlNEIDItY2xhdXNlIChodHRwOi8vY2hvb3NlYWxpY2Vuc2UuY29tL2xpY2Vuc2VzL2JzZC0yLWNsYXVzZS8pXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNSwgQ3VydGlzIEJyYXR0b25cclxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogTGlxdWlkIEZpbGwgR2F1Z2UgdjEuMVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxpcXVpZEZpbGxHYXVnZURlZmF1bHRTZXR0aW5ncygpIHtcclxuICByZXR1cm4ge1xyXG4gICAgbWluVmFsdWU6IDAsIC8vIFRoZSBnYXVnZSBtaW5pbXVtIHZhbHVlLlxyXG4gICAgbWF4VmFsdWU6IDEwMCwgLy8gVGhlIGdhdWdlIG1heGltdW0gdmFsdWUuXHJcbiAgICBjaXJjbGVUaGlja25lc3M6IDAuMDUsIC8vIFRoZSBvdXRlciBjaXJjbGUgdGhpY2tuZXNzIGFzIGEgcGVyY2VudGFnZSBvZiBpdCdzIHJhZGl1cy5cclxuICAgIGNpcmNsZUZpbGxHYXA6IDAuMDUsIC8vIFRoZSBzaXplIG9mIHRoZSBnYXAgYmV0d2VlbiB0aGUgb3V0ZXIgY2lyY2xlIGFuZCB3YXZlIGNpcmNsZSBhcyBhIHBlcmNlbnRhZ2Ugb2YgdGhlIG91dGVyIGNpcmNsZXMgcmFkaXVzLlxyXG4gICAgY2lyY2xlQ29sb3I6ICcjMTc4QkNBJywgLy8gVGhlIGNvbG9yIG9mIHRoZSBvdXRlciBjaXJjbGUuXHJcbiAgICB3YXZlSGVpZ2h0OiAwLjA1LCAvLyBUaGUgd2F2ZSBoZWlnaHQgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSByYWRpdXMgb2YgdGhlIHdhdmUgY2lyY2xlLlxyXG4gICAgd2F2ZUNvdW50OiAxLCAvLyBUaGUgbnVtYmVyIG9mIGZ1bGwgd2F2ZXMgcGVyIHdpZHRoIG9mIHRoZSB3YXZlIGNpcmNsZS5cclxuICAgIHdhdmVSaXNlVGltZTogMTAwMCwgLy8gVGhlIGFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHdhdmUgdG8gcmlzZSBmcm9tIDAgdG8gaXQncyBmaW5hbCBoZWlnaHQuXHJcbiAgICB3YXZlQW5pbWF0ZVRpbWU6IDE4MDAwLCAvLyBUaGUgYW1vdW50IG9mIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciBhIGZ1bGwgd2F2ZSB0byBlbnRlciB0aGUgd2F2ZSBjaXJjbGUuXHJcbiAgICB3YXZlUmlzZTogdHJ1ZSwgLy8gQ29udHJvbCBpZiB0aGUgd2F2ZSBzaG91bGQgcmlzZSBmcm9tIDAgdG8gaXQncyBmdWxsIGhlaWdodCwgb3Igc3RhcnQgYXQgaXQncyBmdWxsIGhlaWdodC5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAgIHdhdmVIZWlnaHRTY2FsaW5nOiB0cnVlLCAvLyBDb250cm9scyB3YXZlIHNpemUgc2NhbGluZyBhdCBsb3cgYW5kIGhpZ2ggZmlsbCBwZXJjZW50YWdlcy4gV2hlbiB0cnVlLCB3YXZlIGhlaWdodCByZWFjaGVzIGl0J3MgbWF4aW11bSBhdCA1MCUgZmlsbCwgYW5kIG1pbmltdW0gYXQgMCUgYW5kIDEwMCUgZmlsbC4gVGhpcyBoZWxwcyB0byBwcmV2ZW50IHRoZSB3YXZlIGZyb20gbWFraW5nIHRoZSB3YXZlIGNpcmNsZSBmcm9tIGFwcGVhciB0b3RhbGx5IGZ1bGwgb3IgZW1wdHkgd2hlbiBuZWFyIGl0J3MgbWluaW11bSBvciBtYXhpbXVtIGZpbGwuXHJcbiAgICB3YXZlQW5pbWF0ZTogdHJ1ZSwgLy8gQ29udHJvbHMgaWYgdGhlIHdhdmUgc2Nyb2xscyBvciBpcyBzdGF0aWMuXHJcbiAgICB3YXZlQ29sb3I6ICcjMTc4QkNBJywgLy8gVGhlIGNvbG9yIG9mIHRoZSBmaWxsIHdhdmUuXHJcbiAgICB3YXZlT2Zmc2V0OiAwLCAvLyBUaGUgYW1vdW50IHRvIGluaXRpYWxseSBvZmZzZXQgdGhlIHdhdmUuIDAgPSBubyBvZmZzZXQuIDEgPSBvZmZzZXQgb2Ygb25lIGZ1bGwgd2F2ZS5cclxuICAgIHRleHRWZXJ0UG9zaXRpb246IC41LCAvLyBUaGUgaGVpZ2h0IGF0IHdoaWNoIHRvIGRpc3BsYXkgdGhlIHBlcmNlbnRhZ2UgdGV4dCB3aXRoaW5nIHRoZSB3YXZlIGNpcmNsZS4gMCA9IGJvdHRvbSwgMSA9IHRvcC5cclxuICAgIHRleHRTaXplOiAxLCAvLyBUaGUgcmVsYXRpdmUgaGVpZ2h0IG9mIHRoZSB0ZXh0IHRvIGRpc3BsYXkgaW4gdGhlIHdhdmUgY2lyY2xlLiAxID0gNTAlXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICB2YWx1ZUNvdW50VXA6IHRydWUsIC8vIElmIHRydWUsIHRoZSBkaXNwbGF5ZWQgdmFsdWUgY291bnRzIHVwIGZyb20gMCB0byBpdCdzIGZpbmFsIHZhbHVlIHVwb24gbG9hZGluZy4gSWYgZmFsc2UsIHRoZSBmaW5hbCB2YWx1ZSBpcyBkaXNwbGF5ZWQuXHJcbiAgICBkaXNwbGF5UGVyY2VudDogdHJ1ZSwgLy8gSWYgdHJ1ZSwgYSAlIHN5bWJvbCBpcyBkaXNwbGF5ZWQgYWZ0ZXIgdGhlIHZhbHVlLlxyXG5cclxuICAgIHRleHRDb2xvcjogJyMwNDU2ODEnLCAvLyBUaGUgY29sb3Igb2YgdGhlIHZhbHVlIHRleHQgd2hlbiB0aGUgd2F2ZSBkb2VzIG5vdCBvdmVybGFwIGl0LlxyXG4gICAgd2F2ZVRleHRDb2xvcjogJyNBNERCZjgnIC8vIFRoZSBjb2xvciBvZiB0aGUgdmFsdWUgdGV4dCB3aGVuIHRoZSB3YXZlIG92ZXJsYXBzIGl0LlxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkTGlxdWlkRmlsbEdhdWdlKGVsZW1lbnRJZCwgdmFsdWUsIGNvbmZpZykge1xyXG4gIGlmIChjb25maWcgPT0gbnVsbCkge1xyXG4gICAgY29uZmlnID0gbGlxdWlkRmlsbEdhdWdlRGVmYXVsdFNldHRpbmdzKCk7XHJcbiAgfVxyXG4gIGNvbnN0IGdhdWdlID0gZDMuc2VsZWN0KCcjJyArIGVsZW1lbnRJZCk7XHJcbiAgY29uc3QgcmFkaXVzID0gTWF0aC5taW4ocGFyc2VJbnQoZ2F1Z2Uuc3R5bGUoJ3dpZHRoJyksIDEwKSwgcGFyc2VJbnQoZ2F1Z2Uuc3R5bGUoJ2hlaWdodCcpLCAxMCkpIC8gMjtcclxuICBjb25zdCBsb2NhdGlvblggPSBwYXJzZUludChnYXVnZS5zdHlsZSgnd2lkdGgnKSwgMTApIC8gMiAtIHJhZGl1cztcclxuICBjb25zdCBsb2NhdGlvblkgPSBwYXJzZUludChnYXVnZS5zdHlsZSgnaGVpZ2h0JyksIDEwKSAvIDIgLSByYWRpdXM7XHJcbiAgbGV0IGZpbGxQZXJjZW50ID0gTWF0aC5tYXgoY29uZmlnLm1pblZhbHVlLCBNYXRoLm1pbihjb25maWcubWF4VmFsdWUsIHZhbHVlKSkgLyBjb25maWcubWF4VmFsdWU7XHJcblxyXG4gIGxldCB3YXZlSGVpZ2h0U2NhbGU7XHJcbiAgaWYgKGNvbmZpZy53YXZlSGVpZ2h0U2NhbGluZykge1xyXG4gICAgd2F2ZUhlaWdodFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAucmFuZ2UoWzAsIGNvbmZpZy53YXZlSGVpZ2h0LCAwXSlcclxuICAgICAgLmRvbWFpbihbMCwgNTAsIDEwMF0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB3YXZlSGVpZ2h0U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgIC5yYW5nZShbY29uZmlnLndhdmVIZWlnaHQsIGNvbmZpZy53YXZlSGVpZ2h0XSlcclxuICAgICAgLmRvbWFpbihbMCwgMTAwXSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0ZXh0UGl4ZWxzID0gKGNvbmZpZy50ZXh0U2l6ZSAqIHJhZGl1cyAvIDIpO1xyXG4gIGNvbnN0IHRleHRGaW5hbFZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSkudG9GaXhlZCgyKTtcclxuICBjb25zdCB0ZXh0U3RhcnRWYWx1ZSA9IGNvbmZpZy52YWx1ZUNvdW50VXAgPyBjb25maWcubWluVmFsdWUgOiB0ZXh0RmluYWxWYWx1ZTtcclxuICBjb25zdCBwZXJjZW50VGV4dCA9IGNvbmZpZy5kaXNwbGF5UGVyY2VudCA/ICclJyA6ICcnO1xyXG4gIGNvbnN0IGNpcmNsZVRoaWNrbmVzcyA9IGNvbmZpZy5jaXJjbGVUaGlja25lc3MgKiByYWRpdXM7XHJcbiAgY29uc3QgY2lyY2xlRmlsbEdhcCA9IGNvbmZpZy5jaXJjbGVGaWxsR2FwICogcmFkaXVzO1xyXG4gIGNvbnN0IGZpbGxDaXJjbGVNYXJnaW4gPSBjaXJjbGVUaGlja25lc3MgKyBjaXJjbGVGaWxsR2FwO1xyXG4gIGNvbnN0IGZpbGxDaXJjbGVSYWRpdXMgPSByYWRpdXMgLSBmaWxsQ2lyY2xlTWFyZ2luO1xyXG4gIGxldCB3YXZlSGVpZ2h0ID0gZmlsbENpcmNsZVJhZGl1cyAqIHdhdmVIZWlnaHRTY2FsZShmaWxsUGVyY2VudCAqIDEwMCk7XHJcblxyXG4gIGNvbnN0IHdhdmVMZW5ndGggPSBmaWxsQ2lyY2xlUmFkaXVzICogMiAvIGNvbmZpZy53YXZlQ291bnQ7XHJcbiAgY29uc3Qgd2F2ZUNsaXBDb3VudCA9IDEgKyBjb25maWcud2F2ZUNvdW50O1xyXG4gIGNvbnN0IHdhdmVDbGlwV2lkdGggPSB3YXZlTGVuZ3RoICogd2F2ZUNsaXBDb3VudDtcclxuXHJcbiAgLy8gUm91bmRpbmcgZnVuY3Rpb25zIHNvIHRoYXQgdGhlIGNvcnJlY3QgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIGlzIGFsd2F5cyBkaXNwbGF5ZWQgYXMgdGhlIHZhbHVlIGNvdW50cyB1cC5cclxuICBsZXQgdGV4dFJvdW5kZXIgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICByZXR1cm4gJycgKyBNYXRoLnJvdW5kKHZhbCk7XHJcbiAgfTtcclxuICBpZiAocGFyc2VGbG9hdCh0ZXh0RmluYWxWYWx1ZSkgIT09IHBhcnNlRmxvYXQodGV4dFJvdW5kZXIodGV4dEZpbmFsVmFsdWUpKSkge1xyXG4gICAgdGV4dFJvdW5kZXIgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbCkudG9GaXhlZCgxKTtcclxuICAgIH07XHJcbiAgfVxyXG4gIGlmIChwYXJzZUZsb2F0KHRleHRGaW5hbFZhbHVlKSAhPT0gcGFyc2VGbG9hdCh0ZXh0Um91bmRlcih0ZXh0RmluYWxWYWx1ZSkpKSB7XHJcbiAgICB0ZXh0Um91bmRlciA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsKS50b0ZpeGVkKDIpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIERhdGEgZm9yIGJ1aWxkaW5nIHRoZSBjbGlwIHdhdmUgYXJlYS5cclxuICBjb25zdCBkYXRhID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gNDAgKiB3YXZlQ2xpcENvdW50OyBpKyspIHtcclxuICAgIGRhdGEucHVzaCh7XHJcbiAgICAgIHg6IGkgLyAoNDAgKiB3YXZlQ2xpcENvdW50KSxcclxuICAgICAgeTogKGkgLyAoNDApKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBTY2FsZXMgZm9yIGRyYXdpbmcgdGhlIG91dGVyIGNpcmNsZS5cclxuICBjb25zdCBnYXVnZUNpcmNsZVggPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFswLCAyICogTWF0aC5QSV0pLmRvbWFpbihbMCwgMV0pO1xyXG4gIGNvbnN0IGdhdWdlQ2lyY2xlWSA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoWzAsIHJhZGl1c10pLmRvbWFpbihbMCwgcmFkaXVzXSk7XHJcblxyXG4gIC8vIFNjYWxlcyBmb3IgY29udHJvbGxpbmcgdGhlIHNpemUgb2YgdGhlIGNsaXBwaW5nIHBhdGguXHJcbiAgbGV0IHdhdmVTY2FsZVggPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFswLCB3YXZlQ2xpcFdpZHRoXSkuZG9tYWluKFswLCAxXSk7XHJcbiAgbGV0IHdhdmVTY2FsZVkgPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFswLCB3YXZlSGVpZ2h0XSkuZG9tYWluKFswLCAxXSk7XHJcblxyXG4gIC8vIFNjYWxlcyBmb3IgY29udHJvbGxpbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSBjbGlwcGluZyBwYXRoLlxyXG4gIGxldCB3YXZlUmlzZVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgLy8gVGhlIGNsaXBwaW5nIGFyZWEgc2l6ZSBpcyB0aGUgaGVpZ2h0IG9mIHRoZSBmaWxsIGNpcmNsZSArIHRoZSB3YXZlIGhlaWdodCwgc28gd2UgcG9zaXRpb24gdGhlIGNsaXAgd2F2ZVxyXG4gICAgLy8gc3VjaCB0aGF0IHRoZSBpdCB3aWxsIG92ZXJsYXAgdGhlIGZpbGwgY2lyY2xlIGF0IGFsbCB3aGVuIGF0IDAlLCBhbmQgd2lsbCB0b3RhbGx5IGNvdmVyIHRoZSBmaWxsXHJcbiAgICAvLyBjaXJjbGUgYXQgMTAwJS5cclxuICAgIC5yYW5nZShbKGZpbGxDaXJjbGVNYXJnaW4gKyBmaWxsQ2lyY2xlUmFkaXVzICogMiArIHdhdmVIZWlnaHQpLCAoZmlsbENpcmNsZU1hcmdpbiAtIHdhdmVIZWlnaHQpXSlcclxuICAgIC5kb21haW4oWzAsIDFdKTtcclxuICBjb25zdCB3YXZlQW5pbWF0ZVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgLnJhbmdlKFswLCB3YXZlQ2xpcFdpZHRoIC0gZmlsbENpcmNsZVJhZGl1cyAqIDJdKSAvLyBQdXNoIHRoZSBjbGlwIGFyZWEgb25lIGZ1bGwgd2F2ZSB0aGVuIHNuYXAgYmFjay5cclxuICAgIC5kb21haW4oWzAsIDFdKTtcclxuXHJcbiAgLy8gU2NhbGUgZm9yIGNvbnRyb2xsaW5nIHRoZSBwb3NpdGlvbiBvZiB0aGUgdGV4dCB3aXRoaW4gdGhlIGdhdWdlLlxyXG4gIGNvbnN0IHRleHRSaXNlU2NhbGVZID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgLnJhbmdlKFtmaWxsQ2lyY2xlTWFyZ2luICsgZmlsbENpcmNsZVJhZGl1cyAqIDIsIChmaWxsQ2lyY2xlTWFyZ2luICsgdGV4dFBpeGVscyAqIDAuNyldKVxyXG4gICAgLmRvbWFpbihbMCwgMV0pO1xyXG5cclxuICAvLyBDZW50ZXIgdGhlIGdhdWdlIHdpdGhpbiB0aGUgcGFyZW50IFNWRy5cclxuICBjb25zdCBnYXVnZUdyb3VwID0gZ2F1Z2UuYXBwZW5kKCdnJylcclxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBsb2NhdGlvblggKyAnLCcgKyBsb2NhdGlvblkgKyAnKScpO1xyXG5cclxuICAvLyBEcmF3IHRoZSBvdXRlciBSZWN0YW5nbGUuXHJcbiAgdmFyIHJlY3Rwb2ludHMgPSBbe3g6IDAsIHk6IDB9LCB7eDogMCwgeTogcGFyc2VJbnQoZ2F1Z2Uuc3R5bGUoJ2hlaWdodCcpKX0sIHt4OiBwYXJzZUludChnYXVnZS5zdHlsZSgnd2lkdGgnKSwgMTApLCB5OiBwYXJzZUludChnYXVnZS5zdHlsZSgnaGVpZ2h0JykpfSwge3g6IHBhcnNlSW50KGdhdWdlLnN0eWxlKCd3aWR0aCcpLCAxMCksIHk6IDB9LCB7eDogMCwgeTogMH1dO1xyXG4gIHZhciBsaW5lRnVuYyA9IGQzLmxpbmUoKVxyXG4gICAgICAueChmdW5jdGlvbihkKSB7IHJldHVybiBkLnggfSlcclxuICAgICAgLnkoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC55IH0pO1xyXG4gIGdhdWdlR3JvdXAuYXBwZW5kKCdwYXRoJylcclxuICAgIC5hdHRyKCdkJywgbGluZUZ1bmMocmVjdHBvaW50cykpXHJcbiAgICAuYXR0cignc3Ryb2tlJywgY29uZmlnLmNpcmNsZUNvbG9yKVxyXG4gICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIGNpcmNsZVRoaWNrbmVzcylcclxuICAgIC5hdHRyKCdmaWxsJywgJ25vbmUnKTtcclxuXHJcbiAgLy8gVGV4dCB3aGVyZSB0aGUgd2F2ZSBkb2VzIG5vdCBvdmVybGFwLlxyXG4gIGNvbnN0IHRleHQxID0gZ2F1Z2VHcm91cC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgLnRleHQodGV4dFJvdW5kZXIodGV4dFN0YXJ0VmFsdWUpICsgcGVyY2VudFRleHQpXHJcbiAgICAuYXR0cignY2xhc3MnLCAnbGlxdWlkRmlsbEdhdWdlVGV4dCcpXHJcbiAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcclxuICAgIC5hdHRyKCdmb250LXNpemUnLCB0ZXh0UGl4ZWxzICsgJ3B4JylcclxuICAgIC5zdHlsZSgnZmlsbCcsIGNvbmZpZy50ZXh0Q29sb3IpXHJcbiAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgcmFkaXVzICsgJywnICsgdGV4dFJpc2VTY2FsZVkoY29uZmlnLnRleHRWZXJ0UG9zaXRpb24pICsgJyknKTtcclxuXHJcbiAgLy8gVGhlIGNsaXBwaW5nIHdhdmUgYXJlYS5cclxuICBjb25zdCBjbGlwQXJlYSA9IGQzLmFyZWEoKVxyXG4gICAgLngoZnVuY3Rpb24gKGQ6IGFueSkge1xyXG4gICAgICByZXR1cm4gd2F2ZVNjYWxlWChkLngpO1xyXG4gICAgfSlcclxuICAgIC55MChmdW5jdGlvbiAoZDogYW55KSB7XHJcbiAgICAgIHJldHVybiB3YXZlU2NhbGVZKE1hdGguc2luKE1hdGguUEkgKiAyICogY29uZmlnLndhdmVPZmZzZXQgKiAtMSArIE1hdGguUEkgKiAyICogKDEgLSBjb25maWcud2F2ZUNvdW50KSArIGQueSAqIDIgKiBNYXRoLlBJKSk7XHJcbiAgICB9KVxyXG4gICAgLnkxKGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgIHJldHVybiAoZmlsbENpcmNsZVJhZGl1cyAqIDIgKyB3YXZlSGVpZ2h0KTtcclxuICAgIH0pO1xyXG4gIGNvbnN0IHdhdmVHcm91cCA9IGdhdWdlR3JvdXAuYXBwZW5kKCdkZWZzJylcclxuICAgIC5hcHBlbmQoJ2NsaXBQYXRoJylcclxuICAgIC5hdHRyKCdpZCcsICdjbGlwV2F2ZScgKyBlbGVtZW50SWQpO1xyXG4gIGNvbnN0IHdhdmUgPSB3YXZlR3JvdXAuYXBwZW5kKCdwYXRoJylcclxuICAgIC5kYXR1bShkYXRhKVxyXG4gICAgLmF0dHIoJ2QnLCBjbGlwQXJlYSlcclxuICAgIC5hdHRyKCdUJywgMCk7XHJcblxyXG4gIC8vIFRoZSBpbm5lciBjaXJjbGUgd2l0aCB0aGUgY2xpcHBpbmcgd2F2ZSBhdHRhY2hlZC5cclxuICBjb25zdCBmaWxsQ2lyY2xlR3JvdXAgPSBnYXVnZUdyb3VwLmFwcGVuZCgnZycpXHJcbiAgICAuYXR0cignY2xpcC1wYXRoJywgJ3VybCgjY2xpcFdhdmUnICsgZWxlbWVudElkICsgJyknKTtcclxuICBmaWxsQ2lyY2xlR3JvdXAuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAuYXR0cigneCcsIChyYWRpdXMpIC0gZmlsbENpcmNsZVJhZGl1cylcclxuICAgICAgICAuYXR0cigneScsIHJhZGl1cyAtIGZpbGxDaXJjbGVSYWRpdXMpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgZmlsbENpcmNsZVJhZGl1cyoyKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBmaWxsQ2lyY2xlUmFkaXVzKjIpXHJcbiAgICAgICAgLnN0eWxlKCdmaWxsJywgY29uZmlnLndhdmVDb2xvcik7XHJcblxyXG4gIC8vIFRleHQgd2hlcmUgdGhlIHdhdmUgZG9lcyBvdmVybGFwLlxyXG4gIGNvbnN0IHRleHQyID0gZmlsbENpcmNsZUdyb3VwLmFwcGVuZCgndGV4dCcpXHJcbiAgICAudGV4dCh0ZXh0Um91bmRlcih0ZXh0U3RhcnRWYWx1ZSkgKyBwZXJjZW50VGV4dClcclxuICAgIC5hdHRyKCdjbGFzcycsICdsaXF1aWRGaWxsR2F1Z2VUZXh0JylcclxuICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxyXG4gICAgLmF0dHIoJ2ZvbnQtc2l6ZScsIHRleHRQaXhlbHMgKyAncHgnKVxyXG4gICAgLnN0eWxlKCdmaWxsJywgY29uZmlnLndhdmVUZXh0Q29sb3IpXHJcbiAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgcmFkaXVzICsgJywnICsgdGV4dFJpc2VTY2FsZVkoY29uZmlnLnRleHRWZXJ0UG9zaXRpb24pICsgJyknKTtcclxuXHJcbiAgLy8gTWFrZSB0aGUgdmFsdWUgY291bnQgdXAuXHJcbiAgaWYgKGNvbmZpZy52YWx1ZUNvdW50VXApIHtcclxuICAgIGNvbnN0IHRleHRUd2VlbiA9IGZ1bmN0aW9uIGcoKSB7XHJcbiAgICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZSh0aGlzLnRleHRDb250ZW50LCB0ZXh0RmluYWxWYWx1ZSk7XHJcbiAgICAgIHJldHVybiAodCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSB0ZXh0Um91bmRlcihpKHQpKSArIHBlcmNlbnRUZXh0O1xyXG4gICAgICB9O1xyXG4gICAgfTtcclxuICAgIHRleHQxLnRyYW5zaXRpb24oKVxyXG4gICAgICAuZHVyYXRpb24oY29uZmlnLndhdmVSaXNlVGltZSlcclxuICAgICAgLnR3ZWVuKCd0ZXh0JywgdGV4dFR3ZWVuKTtcclxuICAgIHRleHQyLnRyYW5zaXRpb24oKVxyXG4gICAgICAuZHVyYXRpb24oY29uZmlnLndhdmVSaXNlVGltZSlcclxuICAgICAgLnR3ZWVuKCd0ZXh0JywgdGV4dFR3ZWVuKTtcclxuICB9XHJcblxyXG4gIC8vIE1ha2UgdGhlIHdhdmUgcmlzZS4gd2F2ZSBhbmQgd2F2ZUdyb3VwIGFyZSBzZXBhcmF0ZSBzbyB0aGF0IGhvcml6b250YWwgYW5kIHZlcnRpY2FsIG1vdmVtZW50IGNhbiBiZSBjb250cm9sbGVkIGluZGVwZW5kZW50bHkuXHJcbiAgY29uc3Qgd2F2ZUdyb3VwWFBvc2l0aW9uID0gZmlsbENpcmNsZU1hcmdpbiArIGZpbGxDaXJjbGVSYWRpdXMgKiAyIC0gd2F2ZUNsaXBXaWR0aDtcclxuICBpZiAoY29uZmlnLndhdmVSaXNlKSB7XHJcblxyXG4gICAgd2F2ZUdyb3VwLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHdhdmVHcm91cFhQb3NpdGlvbiArICcsJyArIHdhdmVSaXNlU2NhbGUoMCkgKyAnKScpXHJcbiAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgLmR1cmF0aW9uKGNvbmZpZy53YXZlUmlzZVRpbWUpXHJcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB3YXZlR3JvdXBYUG9zaXRpb24gKyAnLCcgKyB3YXZlUmlzZVNjYWxlKGZpbGxQZXJjZW50KSArICcpJylcclxuICAgICAgLm9uKCdzdGFydCcsICgpID0+IHtcclxuICAgICAgICB3YXZlLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMSwwKScpO1xyXG4gICAgICB9KTsgLy8gVGhpcyB0cmFuc2Zvcm0gaXMgbmVjZXNzYXJ5IHRvIGdldCB0aGUgY2xpcCB3YXZlIHBvc2l0aW9uZWQgY29ycmVjdGx5IHdoZW4gd2F2ZVJpc2U9dHJ1ZSBhbmRcclxuICAgIC8vIHdhdmVBbmltYXRlPWZhbHNlLiBUaGUgd2F2ZSB3aWxsIG5vdCBwb3NpdGlvbiBjb3JyZWN0bHkgd2l0aG91dCB0aGlzLCBidXQgaXQncyBub3QgY2xlYXIgd2h5IHRoaXMgaXMgYWN0dWFsbHkgbmVjZXNzYXJ5LlxyXG4gIH0gZWxzZSB7XHJcbiAgICB3YXZlR3JvdXAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgd2F2ZUdyb3VwWFBvc2l0aW9uICsgJywnICsgd2F2ZVJpc2VTY2FsZShmaWxsUGVyY2VudCkgKyAnKScpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGNvbmZpZy53YXZlQW5pbWF0ZSkge1xyXG4gICAgYW5pbWF0ZVdhdmUoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFuaW1hdGVXYXZlKF8/OiBhbnkpIHtcclxuICAgIHdhdmUuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgd2F2ZUFuaW1hdGVTY2FsZSgrd2F2ZS5hdHRyKCdUJykpICsgJywwKScpO1xyXG4gICAgd2F2ZS50cmFuc2l0aW9uKClcclxuICAgICAgLmR1cmF0aW9uKGNvbmZpZy53YXZlQW5pbWF0ZVRpbWUgKiAoMSAtICt3YXZlLmF0dHIoJ1QnKSkpXHJcbiAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpXHJcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB3YXZlQW5pbWF0ZVNjYWxlKDEpICsgJywwKScpXHJcbiAgICAgIC5hdHRyKCdUJywgMSlcclxuICAgICAgLm9uKCdlbmQnLCAoKSA9PiB7XHJcbiAgICAgICAgd2F2ZS5hdHRyKCdUJywgMCk7XHJcbiAgICAgICAgYW5pbWF0ZVdhdmUoY29uZmlnLndhdmVBbmltYXRlVGltZSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gR2F1Z2VVcGRhdGVyKCkge1xyXG4gICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgIGNvbnN0IG5ld0ZpbmFsVmFsdWUgPSBwYXJzZUZsb2F0KHZhbCkudG9GaXhlZCgyKTtcclxuICAgICAgbGV0IHRleHRSb3VuZGVyVXBkYXRlciA9IGZ1bmN0aW9uICh2YWwyKSB7XHJcbiAgICAgICAgcmV0dXJuICcnICsgTWF0aC5yb3VuZCh2YWwyKTtcclxuICAgICAgfTtcclxuICAgICAgaWYgKHBhcnNlRmxvYXQobmV3RmluYWxWYWx1ZSkgIT09IHBhcnNlRmxvYXQodGV4dFJvdW5kZXJVcGRhdGVyKG5ld0ZpbmFsVmFsdWUpKSkge1xyXG4gICAgICAgIHRleHRSb3VuZGVyVXBkYXRlciA9IGZ1bmN0aW9uICh2YWwyKSB7XHJcbiAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWwyKS50b0ZpeGVkKDEpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHBhcnNlRmxvYXQobmV3RmluYWxWYWx1ZSkgIT09IHBhcnNlRmxvYXQodGV4dFJvdW5kZXJVcGRhdGVyKG5ld0ZpbmFsVmFsdWUpKSkge1xyXG4gICAgICAgIHRleHRSb3VuZGVyVXBkYXRlciA9IGZ1bmN0aW9uICh2YWwyKSB7XHJcbiAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWwyKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHRleHRUd2VlbiA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUodGhpcy50ZXh0Q29udGVudCwgcGFyc2VGbG9hdCh2YWx1ZSkudG9GaXhlZCgyKSk7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gdGV4dFJvdW5kZXJVcGRhdGVyKGkodCkpICsgcGVyY2VudFRleHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRleHQxLnRyYW5zaXRpb24oKVxyXG4gICAgICAgIC5kdXJhdGlvbihjb25maWcud2F2ZVJpc2VUaW1lKVxyXG4gICAgICAgIC50d2VlbigndGV4dCcsIHRleHRUd2Vlbik7XHJcbiAgICAgIHRleHQyLnRyYW5zaXRpb24oKVxyXG4gICAgICAgIC5kdXJhdGlvbihjb25maWcud2F2ZVJpc2VUaW1lKVxyXG4gICAgICAgIC50d2VlbigndGV4dCcsIHRleHRUd2Vlbik7XHJcblxyXG4gICAgICBmaWxsUGVyY2VudCA9IE1hdGgubWF4KGNvbmZpZy5taW5WYWx1ZSwgTWF0aC5taW4oY29uZmlnLm1heFZhbHVlLCB2YWx1ZSkpIC8gY29uZmlnLm1heFZhbHVlO1xyXG4gICAgICB3YXZlSGVpZ2h0ID0gZmlsbENpcmNsZVJhZGl1cyAqIHdhdmVIZWlnaHRTY2FsZShmaWxsUGVyY2VudCAqIDEwMCk7XHJcbiAgICAgIHdhdmVSaXNlU2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLy8gVGhlIGNsaXBwaW5nIGFyZWEgc2l6ZSBpcyB0aGUgaGVpZ2h0IG9mIHRoZSBmaWxsIGNpcmNsZSArIHRoZSB3YXZlIGhlaWdodCwgc28gd2UgcG9zaXRpb24gdGhlIGNsaXAgd2F2ZVxyXG4gICAgICAgIC8vIHN1Y2ggdGhhdCB0aGUgaXQgd2lsbCBvdmVybGFwIHRoZSBmaWxsIGNpcmNsZSBhdCBhbGwgd2hlbiBhdCAwJSwgYW5kIHdpbGwgdG90YWxseSBjb3ZlciB0aGUgZmlsbFxyXG4gICAgICAgIC8vIGNpcmNsZSBhdCAxMDAlLlxyXG4gICAgICAgIC5yYW5nZShbKGZpbGxDaXJjbGVNYXJnaW4gKyBmaWxsQ2lyY2xlUmFkaXVzICogMiArIHdhdmVIZWlnaHQpLCAoZmlsbENpcmNsZU1hcmdpbiAtIHdhdmVIZWlnaHQpXSlcclxuICAgICAgICAuZG9tYWluKFswLCAxXSk7XHJcbiAgICAgIGNvbnN0IG5ld0hlaWdodCA9IHdhdmVSaXNlU2NhbGUoZmlsbFBlcmNlbnQpO1xyXG4gICAgICB3YXZlU2NhbGVYID0gZDMuc2NhbGVMaW5lYXIoKS5yYW5nZShbMCwgd2F2ZUNsaXBXaWR0aF0pLmRvbWFpbihbMCwgMV0pO1xyXG4gICAgICB3YXZlU2NhbGVZID0gZDMuc2NhbGVMaW5lYXIoKS5yYW5nZShbMCwgd2F2ZUhlaWdodF0pLmRvbWFpbihbMCwgMV0pO1xyXG4gICAgICBsZXQgbmV3Q2xpcEFyZWE7XHJcbiAgICAgIGlmIChjb25maWcud2F2ZUhlaWdodFNjYWxpbmcpIHtcclxuICAgICAgICBuZXdDbGlwQXJlYSA9IGQzLmFyZWEoKVxyXG4gICAgICAgICAgLngoKGQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gd2F2ZVNjYWxlWChkLngpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC55MCgoZDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB3YXZlU2NhbGVZKE1hdGguc2luKE1hdGguUEkgKiAyICogY29uZmlnLndhdmVPZmZzZXQgKiAtMSArIE1hdGguUEkgKiAyICogKDEgLSBjb25maWcud2F2ZUNvdW50KSArIGQueSAqIDIgKiBNYXRoLlBJKSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnkxKChkKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmlsbENpcmNsZVJhZGl1cyAqIDIgKyB3YXZlSGVpZ2h0KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld0NsaXBBcmVhID0gY2xpcEFyZWE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG5ld1dhdmVQb3NpdGlvbiA9IGNvbmZpZy53YXZlQW5pbWF0ZSA/IHdhdmVBbmltYXRlU2NhbGUoMSkgOiAwO1xyXG4gICAgICB3YXZlLnRyYW5zaXRpb24oKVxyXG4gICAgICAgIC5kdXJhdGlvbigwKVxyXG4gICAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgICAuZHVyYXRpb24oY29uZmlnLndhdmVBbmltYXRlID8gKGNvbmZpZy53YXZlQW5pbWF0ZVRpbWUgKiAoMSAtICt3YXZlLmF0dHIoJ1QnKSkpIDogKGNvbmZpZy53YXZlUmlzZVRpbWUpKVxyXG4gICAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpXHJcbiAgICAgICAgLmF0dHIoJ2QnLCBuZXdDbGlwQXJlYSlcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbmV3V2F2ZVBvc2l0aW9uICsgJywwKScpXHJcbiAgICAgICAgLmF0dHIoJ1QnLCAnMScpXHJcbiAgICAgICAgLm9uKCdzdGFydCcsICgpID0+IHtcclxuICAgICAgICAgIGlmIChjb25maWcud2F2ZUFuaW1hdGUpIHtcclxuICAgICAgICAgICAgd2F2ZS5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB3YXZlQW5pbWF0ZVNjYWxlKDApICsgJywwKScpO1xyXG4gICAgICAgICAgICBhbmltYXRlV2F2ZShjb25maWcud2F2ZUFuaW1hdGVUaW1lKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgd2F2ZUdyb3VwLnRyYW5zaXRpb24oKVxyXG4gICAgICAgIC5kdXJhdGlvbihjb25maWcud2F2ZVJpc2VUaW1lKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB3YXZlR3JvdXBYUG9zaXRpb24gKyAnLCcgKyBuZXdIZWlnaHQgKyAnKScpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiBuZXcgR2F1Z2VVcGRhdGVyKCk7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XHJcbmltcG9ydCAqIGFzIGxpcXVpZCBmcm9tICcuL2xpcXVpZEZpbGxHYXVnZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi1uZ3gtbGlxdWlkLWdhdWdlJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgI2dhdWdlPjwvZGl2PmAsXHJcbiAgc3R5bGVzOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TGlxdWlkR2F1Z2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2dhdWdlJykgZ2F1Z2U6IGFueTtcclxuICBpZCA9ICdnYXVnZScgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDApICsgMTsgLy8gYXNzaWduIGEgcmFuZG9tIElEIHRvIFNWRyBjb21wb25lbnRcclxuICBwcml2YXRlIGRlZmF1bHRTZXR0aW5ncyA9IGxpcXVpZC5saXF1aWRGaWxsR2F1Z2VEZWZhdWx0U2V0dGluZ3MoKTtcclxuICBASW5wdXQoKSBwcml2YXRlIHZhbHVlID0gMDtcclxuICBASW5wdXQoKSBwcml2YXRlIG1pblZhbHVlID0gdGhpcy5kZWZhdWx0U2V0dGluZ3MubWluVmFsdWU7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSBtYXhWYWx1ZSA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLm1heFZhbHVlO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgY2lyY2xlVGhpY2tuZXNzID0gdGhpcy5kZWZhdWx0U2V0dGluZ3MuY2lyY2xlVGhpY2tuZXNzO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgY2lyY2xlRmlsbEdhcCA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLmNpcmNsZUZpbGxHYXA7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSBjaXJjbGVDb2xvciA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLmNpcmNsZUNvbG9yO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZUhlaWdodCA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLndhdmVIZWlnaHQ7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB3YXZlQ291bnQgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy53YXZlQ291bnQ7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB3YXZlUmlzZVRpbWUgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy53YXZlUmlzZVRpbWU7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB3YXZlQW5pbWF0ZVRpbWUgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy53YXZlQW5pbWF0ZVRpbWU7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB3YXZlUmlzZSA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLndhdmVSaXNlO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgd2F2ZUhlaWdodFNjYWxpbmcgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy53YXZlSGVpZ2h0U2NhbGluZztcclxuICBASW5wdXQoKSBwcml2YXRlIHdhdmVBbmltYXRlID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2F2ZUFuaW1hdGU7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB3YXZlQ29sb3IgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy53YXZlQ29sb3I7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB3YXZlT2Zmc2V0ID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2F2ZU9mZnNldDtcclxuICBASW5wdXQoKSBwcml2YXRlIHRleHRWZXJ0UG9zaXRpb24gPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy50ZXh0VmVydFBvc2l0aW9uO1xyXG4gIEBJbnB1dCgpIHByaXZhdGUgdGV4dFNpemUgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy50ZXh0U2l6ZTtcclxuICBASW5wdXQoKSBwcml2YXRlIHZhbHVlQ291bnRVcCA9IHRoaXMuZGVmYXVsdFNldHRpbmdzLnZhbHVlQ291bnRVcDtcclxuICBASW5wdXQoKSBwcml2YXRlIGRpc3BsYXlQZXJjZW50ID0gdGhpcy5kZWZhdWx0U2V0dGluZ3MuZGlzcGxheVBlcmNlbnQ7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB0ZXh0Q29sb3IgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy50ZXh0Q29sb3I7XHJcbiAgQElucHV0KCkgcHJpdmF0ZSB3YXZlVGV4dENvbG9yID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2F2ZVRleHRDb2xvcjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUNoYXJ0KCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLmNyZWF0ZUNoYXJ0KCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVDaGFydCgpOiBhbnkge1xyXG4gICAgY29uc3QgZWxlbWVudDogRWxlbWVudCA9IHRoaXMuZ2F1Z2UubmF0aXZlRWxlbWVudDtcclxuICAgIC8vY2xlYXIgcHJldmlvdXMgY2hhcnRcclxuICAgIGQzLnNlbGVjdChlbGVtZW50KS5zZWxlY3RBbGwoJyonKS5yZW1vdmUoKTtcclxuXHJcbiAgICBkMy5zZWxlY3QoZWxlbWVudClcclxuICAgICAgLmFwcGVuZCgnc3ZnJykuYXR0cignaWQnLCB0aGlzLmlkKVxyXG4gICAgICAuYXR0cignd2lkdGgnLCAnMTUwJylcclxuICAgICAgLmF0dHIoJ2hlaWdodCcsICcxNTAnKTtcclxuICAgIGNvbnN0IHNldHRpbmdzID0ge1xyXG4gICAgICBtaW5WYWx1ZTogdGhpcy5taW5WYWx1ZSxcclxuICAgICAgbWF4VmFsdWU6IHRoaXMubWF4VmFsdWUsXHJcbiAgICAgIGNpcmNsZVRoaWNrbmVzczogdGhpcy5jaXJjbGVUaGlja25lc3MsXHJcbiAgICAgIGNpcmNsZUZpbGxHYXA6IHRoaXMuY2lyY2xlRmlsbEdhcCxcclxuICAgICAgY2lyY2xlQ29sb3I6IHRoaXMuY2lyY2xlQ29sb3IsXHJcbiAgICAgIHdhdmVIZWlnaHQ6IHRoaXMud2F2ZUhlaWdodCxcclxuICAgICAgd2F2ZUNvdW50OiB0aGlzLndhdmVDb3VudCxcclxuICAgICAgd2F2ZVJpc2VUaW1lOiB0aGlzLndhdmVSaXNlVGltZSxcclxuICAgICAgd2F2ZUFuaW1hdGVUaW1lOiB0aGlzLndhdmVBbmltYXRlVGltZSxcclxuICAgICAgd2F2ZVJpc2U6IHRoaXMud2F2ZVJpc2UsXHJcbiAgICAgIHdhdmVIZWlnaHRTY2FsaW5nOiB0aGlzLndhdmVIZWlnaHRTY2FsaW5nLFxyXG4gICAgICB3YXZlQW5pbWF0ZTogdGhpcy53YXZlQW5pbWF0ZSxcclxuICAgICAgd2F2ZUNvbG9yOiB0aGlzLndhdmVDb2xvcixcclxuICAgICAgd2F2ZU9mZnNldDogdGhpcy53YXZlT2Zmc2V0LFxyXG4gICAgICB0ZXh0VmVydFBvc2l0aW9uOiB0aGlzLnRleHRWZXJ0UG9zaXRpb24sXHJcbiAgICAgIHRleHRTaXplOiB0aGlzLnRleHRTaXplLFxyXG4gICAgICB2YWx1ZUNvdW50VXA6IHRoaXMudmFsdWVDb3VudFVwLFxyXG4gICAgICBkaXNwbGF5UGVyY2VudDogdGhpcy5kaXNwbGF5UGVyY2VudCxcclxuICAgICAgdGV4dENvbG9yOiB0aGlzLnRleHRDb2xvcixcclxuICAgICAgd2F2ZVRleHRDb2xvcjogdGhpcy53YXZlVGV4dENvbG9yLFxyXG4gICAgfTtcclxuICAgIGxpcXVpZC5sb2FkTGlxdWlkRmlsbEdhdWdlKHRoaXMuaWQsIHRoaXMudmFsdWUsIHNldHRpbmdzKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5neExpcXVpZEdhdWdlQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtbGlxdWlkLWdhdWdlLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW05neExpcXVpZEdhdWdlQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbTmd4TGlxdWlkR2F1Z2VDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hMaXF1aWRHYXVnZU1vZHVsZSB7IH1cclxuIl0sIm5hbWVzIjpbImQzLnNlbGVjdCIsImQzLnNjYWxlTGluZWFyIiwiZDMubGluZSIsImQzLmFyZWEiLCJkMy5pbnRlcnBvbGF0ZSIsImQzLmVhc2VMaW5lYXIiLCJsaXF1aWQubGlxdWlkRmlsbEdhdWdlRGVmYXVsdFNldHRpbmdzIiwibGlxdWlkLmxvYWRMaXF1aWRGaWxsR2F1Z2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtJQU9FO0tBQWlCOztnQkFMbEIsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7Z0NBSkQ7Ozs7Ozs7Ozs7QUNpQkE7SUFDRSxPQUFPO1FBQ0wsUUFBUSxFQUFFLENBQUM7O1FBQ1gsUUFBUSxFQUFFLEdBQUc7O1FBQ2IsZUFBZSxFQUFFLElBQUk7O1FBQ3JCLGFBQWEsRUFBRSxJQUFJOztRQUNuQixXQUFXLEVBQUUsU0FBUzs7UUFDdEIsVUFBVSxFQUFFLElBQUk7O1FBQ2hCLFNBQVMsRUFBRSxDQUFDOztRQUNaLFlBQVksRUFBRSxJQUFJOztRQUNsQixlQUFlLEVBQUUsS0FBSzs7UUFDdEIsUUFBUSxFQUFFLElBQUk7OztRQUVkLGlCQUFpQixFQUFFLElBQUk7O1FBQ3ZCLFdBQVcsRUFBRSxJQUFJOztRQUNqQixTQUFTLEVBQUUsU0FBUzs7UUFDcEIsVUFBVSxFQUFFLENBQUM7O1FBQ2IsZ0JBQWdCLEVBQUUsRUFBRTs7UUFDcEIsUUFBUSxFQUFFLENBQUM7OztRQUVYLFlBQVksRUFBRSxJQUFJOztRQUNsQixjQUFjLEVBQUUsSUFBSTs7UUFFcEIsU0FBUyxFQUFFLFNBQVM7O1FBQ3BCLGFBQWEsRUFBRSxTQUFTO0tBQ3pCLENBQUM7Q0FDSDs7Ozs7OztBQUVELDZCQUFvQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU07SUFDMUQsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1FBQ2xCLE1BQU0sR0FBRyw4QkFBOEIsRUFBRSxDQUFDO0tBQzNDOztJQUNELElBQU0sS0FBSyxHQUFHQSxNQUFTLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDOztJQUN6QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztJQUNyRyxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDOztJQUNsRSxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDOztJQUNuRSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7SUFFaEcsSUFBSSxlQUFlLENBQUM7SUFDcEIsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEVBQUU7UUFDNUIsZUFBZSxHQUFHQyxXQUFjLEVBQUU7YUFDL0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDaEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3pCO1NBQU07UUFDTCxlQUFlLEdBQUdBLFdBQWMsRUFBRTthQUMvQixLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUM3QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNyQjs7SUFFRCxJQUFNLFVBQVUsSUFBSSxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzs7SUFDbEQsSUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFDcEQsSUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQzs7SUFDOUUsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLGNBQWMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDOztJQUNyRCxJQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQzs7SUFDeEQsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7O0lBQ3BELElBQU0sZ0JBQWdCLEdBQUcsZUFBZSxHQUFHLGFBQWEsQ0FBQzs7SUFDekQsSUFBTSxnQkFBZ0IsR0FBRyxNQUFNLEdBQUcsZ0JBQWdCLENBQUM7O0lBQ25ELElBQUksVUFBVSxHQUFHLGdCQUFnQixHQUFHLGVBQWUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUM7O0lBRXZFLElBQU0sVUFBVSxHQUFHLGdCQUFnQixHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDOztJQUMzRCxJQUFNLGFBQWEsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQzs7SUFDM0MsSUFBTSxhQUFhLEdBQUcsVUFBVSxHQUFHLGFBQWEsQ0FBQzs7SUFHakQsSUFBSSxXQUFXLEdBQUcsVUFBVSxHQUFHO1FBQzdCLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDN0IsQ0FBQztJQUNGLElBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRTtRQUMxRSxXQUFXLEdBQUcsVUFBVSxHQUFHO1lBQ3pCLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQyxDQUFDO0tBQ0g7SUFDRCxJQUFJLFVBQVUsQ0FBQyxjQUFjLENBQUMsS0FBSyxVQUFVLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUU7UUFDMUUsV0FBVyxHQUFHLFVBQVUsR0FBRztZQUN6QixPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkMsQ0FBQztLQUNIOztJQUdELElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ1IsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsYUFBYSxDQUFDO1lBQzNCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDZCxDQUFDLENBQUM7S0FDSjs7SUFHRCxJQUFNLFlBQVksR0FBR0EsV0FBYyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFDN0UsSUFBTSxZQUFZLEdBQUdBLFdBQWMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDOztJQUc3RSxJQUFJLFVBQVUsR0FBR0EsV0FBYyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7O0lBQzNFLElBQUksVUFBVSxHQUFHQSxXQUFjLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFHeEUsSUFBSSxhQUFhLEdBQUdBLFdBQWMsRUFBRTs7OztTQUlqQyxLQUFLLENBQUMsRUFBRSxnQkFBZ0IsR0FBRyxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsVUFBVSxJQUFJLGdCQUFnQixHQUFHLFVBQVUsRUFBRSxDQUFDO1NBQ2hHLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUNsQixJQUFNLGdCQUFnQixHQUFHQSxXQUFjLEVBQUU7U0FDdEMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsR0FBRyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNoRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFHbEIsSUFBTSxjQUFjLEdBQUdBLFdBQWMsRUFBRTtTQUNwQyxLQUFLLENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsZ0JBQWdCLEdBQUcsVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDO1NBQ3ZGLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUdsQixJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNqQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksR0FBRyxTQUFTLEdBQUcsR0FBRyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQzs7SUFHdkUsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQzs7SUFDdE4sSUFBSSxRQUFRLEdBQUdDLElBQU8sRUFBRTtTQUNuQixDQUFDLENBQUMsVUFBUyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQztTQUM3QixDQUFDLENBQUMsVUFBUyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ3RCLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQy9CLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQztTQUNsQyxJQUFJLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQztTQUNyQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztJQUd4QixJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztTQUMvQyxJQUFJLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDO1NBQ3BDLElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO1NBQzdCLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxHQUFHLElBQUksQ0FBQztTQUNwQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDL0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxZQUFZLEdBQUcsTUFBTSxHQUFHLEdBQUcsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7O0lBR2xHLElBQU0sUUFBUSxHQUFHQyxJQUFPLEVBQUU7U0FDdkIsQ0FBQyxDQUFDLFVBQVUsQ0FBTTtRQUNqQixPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEIsQ0FBQztTQUNELEVBQUUsQ0FBQyxVQUFVLENBQU07UUFDbEIsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDOUgsQ0FBQztTQUNELEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDYixRQUFRLGdCQUFnQixHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUU7S0FDNUMsQ0FBQyxDQUFDOztJQUNMLElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ3hDLE1BQU0sQ0FBQyxVQUFVLENBQUM7U0FDbEIsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLEdBQUcsU0FBUyxDQUFDLENBQUM7O0lBQ3RDLElBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2xDLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDWCxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQztTQUNuQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDOztJQUdoQixJQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUMzQyxJQUFJLENBQUMsV0FBVyxFQUFFLGVBQWUsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDeEQsZUFBZSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDdkIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sSUFBSSxnQkFBZ0IsQ0FBQztTQUN0QyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztTQUNwQyxJQUFJLENBQUMsT0FBTyxFQUFFLGdCQUFnQixHQUFDLENBQUMsQ0FBQztTQUNqQyxJQUFJLENBQUMsUUFBUSxFQUFFLGdCQUFnQixHQUFDLENBQUMsQ0FBQztTQUNsQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFHdkMsSUFBTSxLQUFLLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRyxXQUFXLENBQUM7U0FDL0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQztTQUNwQyxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQztTQUM3QixJQUFJLENBQUMsV0FBVyxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDcEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDO1NBQ25DLElBQUksQ0FBQyxXQUFXLEVBQUUsWUFBWSxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDOztJQUdsRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7O1FBQ3ZCLElBQU0sU0FBUyxHQUFHO1lBQUEsaUJBS2pCOztZQUpDLElBQU0sQ0FBQyxHQUFHQyxXQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUMzRCxPQUFPLFVBQUMsQ0FBQztnQkFDUCxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7YUFDcEQsQ0FBQztTQUNILENBQUM7UUFDRixLQUFLLENBQUMsVUFBVSxFQUFFO2FBQ2YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7YUFDN0IsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM1QixLQUFLLENBQUMsVUFBVSxFQUFFO2FBQ2YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7YUFDN0IsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztLQUM3Qjs7SUFHRCxJQUFNLGtCQUFrQixHQUFHLGdCQUFnQixHQUFHLGdCQUFnQixHQUFHLENBQUMsR0FBRyxhQUFhLENBQUM7SUFDbkYsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1FBRW5CLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksR0FBRyxrQkFBa0IsR0FBRyxHQUFHLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUMxRixVQUFVLEVBQUU7YUFDWixRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzthQUM3QixJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksR0FBRyxrQkFBa0IsR0FBRyxHQUFHLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUM3RixFQUFFLENBQUMsT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztTQUMxQyxDQUFDLENBQUM7O0tBRU47U0FBTTtRQUNMLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksR0FBRyxrQkFBa0IsR0FBRyxHQUFHLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0tBQ3pHO0lBRUQsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO1FBQ3RCLFdBQVcsRUFBRSxDQUFDO0tBQ2Y7Ozs7O0lBRUQscUJBQXFCLENBQU87UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsWUFBWSxHQUFHLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxVQUFVLEVBQUU7YUFDZCxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDeEQsSUFBSSxDQUFDQyxVQUFhLENBQUM7YUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQzdELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQ1osRUFBRSxDQUFDLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLFdBQVcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDckMsQ0FBQyxDQUFDO0tBQ047Ozs7SUFFRDtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxHQUFHO1lBQWIsaUJBMkViOztZQTFFQyxJQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUNqRCxJQUFJLGtCQUFrQixHQUFHLFVBQVUsSUFBSTtnQkFDckMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM5QixDQUFDO1lBQ0YsSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssVUFBVSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUU7Z0JBQy9FLGtCQUFrQixHQUFHLFVBQVUsSUFBSTtvQkFDakMsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNwQyxDQUFDO2FBQ0g7WUFDRCxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxVQUFVLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRTtnQkFDL0Usa0JBQWtCLEdBQUcsVUFBVSxJQUFJO29CQUNqQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3BDLENBQUM7YUFDSDs7WUFFRCxJQUFNLFNBQVMsR0FBRzs7Z0JBQ2hCLElBQU0sQ0FBQyxHQUFHRCxXQUFjLENBQUMsS0FBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pFLE9BQU8sVUFBVSxDQUFDO29CQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztpQkFDM0QsQ0FBQzthQUNILENBQUM7WUFFRixLQUFLLENBQUMsVUFBVSxFQUFFO2lCQUNmLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO2lCQUM3QixLQUFLLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzVCLEtBQUssQ0FBQyxVQUFVLEVBQUU7aUJBQ2YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7aUJBQzdCLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFNUIsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzVGLFVBQVUsR0FBRyxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ25FLGFBQWEsR0FBR0gsV0FBYyxFQUFFOzs7O2lCQUk3QixLQUFLLENBQUMsRUFBRSxnQkFBZ0IsR0FBRyxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsVUFBVSxJQUFJLGdCQUFnQixHQUFHLFVBQVUsRUFBRSxDQUFDO2lCQUNoRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDbEIsSUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdDLFVBQVUsR0FBR0EsV0FBYyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkUsVUFBVSxHQUFHQSxXQUFjLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDcEUsSUFBSSxXQUFXLENBQUM7WUFDaEIsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzVCLFdBQVcsR0FBR0UsSUFBTyxFQUFFO3FCQUNwQixDQUFDLENBQUMsVUFBQyxDQUFNO29CQUNSLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDeEIsQ0FBQztxQkFDRCxFQUFFLENBQUMsVUFBQyxDQUFNO29CQUNULE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUM5SCxDQUFDO3FCQUNELEVBQUUsQ0FBQyxVQUFDLENBQUM7b0JBQ0osUUFBUSxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFO2lCQUM1QyxDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDTCxXQUFXLEdBQUcsUUFBUSxDQUFDO2FBQ3hCOztZQUVELElBQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxVQUFVLEVBQUU7aUJBQ2QsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDWCxVQUFVLEVBQUU7aUJBQ1osUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLGVBQWUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUN2RyxJQUFJLENBQUNFLFVBQWEsQ0FBQztpQkFDbkIsSUFBSSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUM7aUJBQ3RCLElBQUksQ0FBQyxXQUFXLEVBQUUsWUFBWSxHQUFHLGVBQWUsR0FBRyxLQUFLLENBQUM7aUJBQ3pELElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUNkLEVBQUUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ1gsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO29CQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7b0JBQ25FLFdBQVcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQ3JDO2FBQ0YsQ0FBQyxDQUFDO1lBQ0wsU0FBUyxDQUFDLFVBQVUsRUFBRTtpQkFDbkIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7aUJBQzdCLElBQUksQ0FBQyxXQUFXLEVBQUUsWUFBWSxHQUFHLGtCQUFrQixHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDakYsQ0FBQztLQUNIO0lBRUQsT0FBTyxJQUFJLFlBQVksRUFBRSxDQUFDO0NBQzNCOzs7Ozs7QUMvVEQ7SUFvQ0U7a0JBeEJLLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDOytCQUMzQkMsOEJBQXFDLEVBQUU7cUJBQ3hDLENBQUM7d0JBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRO3dCQUM3QixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVE7K0JBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZTs2QkFDdEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhOzJCQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVc7MEJBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVTt5QkFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTOzRCQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVk7K0JBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZTt3QkFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRO2lDQUNwQixJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQjsyQkFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXO3lCQUNsQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVM7MEJBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVTtnQ0FDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0I7d0JBQzdDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUTs0QkFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZOzhCQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWM7eUJBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUzs2QkFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhO0tBRWxEOzs7O0lBRWpCLDBDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQjs7Ozs7SUFFRCw2Q0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BCOzs7O0lBRUQsNkNBQVc7OztJQUFYOztRQUNFLElBQU0sT0FBTyxHQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDOztRQUVsRE4sTUFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUUzQ0EsTUFBUyxDQUFDLE9BQU8sQ0FBQzthQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDakMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7YUFDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQzs7UUFDekIsSUFBTSxRQUFRLEdBQUc7WUFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtZQUN6QyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3ZDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDL0IsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ25DLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7U0FDbEMsQ0FBQztRQUNGTyxtQkFBMEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDM0Q7O2dCQTFFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLG9CQUFvQjtpQkFFL0I7Ozs7O3dCQUdFLFNBQVMsU0FBQyxPQUFPO3dCQUdqQixLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsS0FBSztrQ0FDTCxLQUFLO2dDQUNMLEtBQUs7OEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzRCQUNMLEtBQUs7K0JBQ0wsS0FBSztrQ0FDTCxLQUFLOzJCQUNMLEtBQUs7b0NBQ0wsS0FBSzs4QkFDTCxLQUFLOzRCQUNMLEtBQUs7NkJBQ0wsS0FBSzttQ0FDTCxLQUFLOzJCQUNMLEtBQUs7K0JBQ0wsS0FBSztpQ0FDTCxLQUFLOzRCQUNMLEtBQUs7Z0NBQ0wsS0FBSzs7a0NBbENSOzs7Ozs7O0FDQUE7Ozs7Z0JBR0MsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxFQUNSO29CQUNELFlBQVksRUFBRSxDQUFDLHVCQUF1QixDQUFDO29CQUN2QyxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDbkM7OytCQVJEOzs7Ozs7Ozs7Ozs7Ozs7In0=