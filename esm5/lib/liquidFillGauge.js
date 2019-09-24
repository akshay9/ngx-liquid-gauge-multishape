/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*!
* Note this was taken from Curtis Bratton's code: http://bl.ocks.org/brattonc/5e5ce9beee483220e2f6
* I upgraded the D3 API and made minor modifications along the way as I converted it to Typescript from Javascript.
* All credits go to Curtis.
* Dayo Adetoye. 2018. https://github.com/adedayo
*/
import * as d3 from 'd3';
/**
 * @return {?}
 */
export function liquidFillGaugeDefaultSettings() {
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
export function loadLiquidFillGauge(elementId, value, config) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlxdWlkRmlsbEdhdWdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWxpcXVpZC1nYXVnZS8iLCJzb3VyY2VzIjpbImxpYi9saXF1aWRGaWxsR2F1Z2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQVFBLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDOzs7O0FBU3pCLE1BQU07SUFDSixPQUFPO1FBQ0wsUUFBUSxFQUFFLENBQUM7O1FBQ1gsUUFBUSxFQUFFLEdBQUc7O1FBQ2IsZUFBZSxFQUFFLElBQUk7O1FBQ3JCLGFBQWEsRUFBRSxJQUFJOztRQUNuQixXQUFXLEVBQUUsU0FBUzs7UUFDdEIsVUFBVSxFQUFFLElBQUk7O1FBQ2hCLFNBQVMsRUFBRSxDQUFDOztRQUNaLFlBQVksRUFBRSxJQUFJOztRQUNsQixlQUFlLEVBQUUsS0FBSzs7UUFDdEIsUUFBUSxFQUFFLElBQUk7OztRQUVkLGlCQUFpQixFQUFFLElBQUk7O1FBQ3ZCLFdBQVcsRUFBRSxJQUFJOztRQUNqQixTQUFTLEVBQUUsU0FBUzs7UUFDcEIsVUFBVSxFQUFFLENBQUM7O1FBQ2IsZ0JBQWdCLEVBQUUsRUFBRTs7UUFDcEIsUUFBUSxFQUFFLENBQUM7OztRQUVYLFlBQVksRUFBRSxJQUFJOztRQUNsQixjQUFjLEVBQUUsSUFBSTs7UUFFcEIsU0FBUyxFQUFFLFNBQVM7O1FBQ3BCLGFBQWEsRUFBRSxTQUFTO0tBQ3pCLENBQUM7Q0FDSDs7Ozs7OztBQUVELE1BQU0sOEJBQThCLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTTtJQUMxRCxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7UUFDbEIsTUFBTSxHQUFHLDhCQUE4QixFQUFFLENBQUM7S0FDM0M7O0lBQ0QsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUM7O0lBQ3pDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtB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Q0FBQyxDQUFDOztJQUd2RSxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDOztJQUN0TixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFO1NBQ25CLENBQUMsQ0FBQyxVQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFDO1NBQzdCLENBQUMsQ0FBQyxVQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFDLENBQUM7SUFDbkMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDdEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDL0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDO1NBQ2xDLElBQUksQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDO1NBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7O0lBR3hCLElBQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENB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VSxDQUFDO2lCQUNuQixJQUFJLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQztpQkFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxZQUFZLEdBQUcsZUFBZSxHQUFHLEtBQUssQ0FBQztpQkFDekQsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ2QsRUFBRSxDQUFDLE9BQU8sRUFBRTtnQkFDWCxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztvQkFDbkUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztpQkFDckM7YUFDRixDQUFDLENBQUM7WUFDTCxTQUFTLENBQUMsVUFBVSxFQUFFO2lCQUNuQixRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztpQkFDN0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxZQUFZLEdBQUcsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNqRixDQUFDO0tBQ0g7SUFFRCxPQUFPLElBQUksWUFBWSxFQUFFLENBQUM7Q0FDM0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcclxuKiBOb3RlIHRoaXMgd2FzIHRha2VuIGZyb20gQ3VydGlzIEJyYXR0b24ncyBjb2RlOiBodHRwOi8vYmwub2Nrcy5vcmcvYnJhdHRvbmMvNWU1Y2U5YmVlZTQ4MzIyMGUyZjZcclxuKiBJIHVwZ3JhZGVkIHRoZSBEMyBBUEkgYW5kIG1hZGUgbWlub3IgbW9kaWZpY2F0aW9ucyBhbG9uZyB0aGUgd2F5IGFzIEkgY29udmVydGVkIGl0IHRvIFR5cGVzY3JpcHQgZnJvbSBKYXZhc2NyaXB0LlxyXG4qIEFsbCBjcmVkaXRzIGdvIHRvIEN1cnRpcy5cclxuKiBEYXlvIEFkZXRveWUuIDIwMTguIGh0dHBzOi8vZ2l0aHViLmNvbS9hZGVkYXlvXHJcbiovXHJcblxyXG5cclxuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xyXG5cclxuLyohXHJcbiAqIEBsaWNlbnNlIE9wZW4gc291cmNlIHVuZGVyIEJTRCAyLWNsYXVzZSAoaHR0cDovL2Nob29zZWFsaWNlbnNlLmNvbS9saWNlbnNlcy9ic2QtMi1jbGF1c2UvKVxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUsIEN1cnRpcyBCcmF0dG9uXHJcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIExpcXVpZCBGaWxsIEdhdWdlIHYxLjFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsaXF1aWRGaWxsR2F1Z2VEZWZhdWx0U2V0dGluZ3MoKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG1pblZhbHVlOiAwLCAvLyBUaGUgZ2F1Z2UgbWluaW11bSB2YWx1ZS5cclxuICAgIG1heFZhbHVlOiAxMDAsIC8vIFRoZSBnYXVnZSBtYXhpbXVtIHZhbHVlLlxyXG4gICAgY2lyY2xlVGhpY2tuZXNzOiAwLjA1LCAvLyBUaGUgb3V0ZXIgY2lyY2xlIHRoaWNrbmVzcyBhcyBhIHBlcmNlbnRhZ2Ugb2YgaXQncyByYWRpdXMuXHJcbiAgICBjaXJjbGVGaWxsR2FwOiAwLjA1LCAvLyBUaGUgc2l6ZSBvZiB0aGUgZ2FwIGJldHdlZW4gdGhlIG91dGVyIGNpcmNsZSBhbmQgd2F2ZSBjaXJjbGUgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSBvdXRlciBjaXJjbGVzIHJhZGl1cy5cclxuICAgIGNpcmNsZUNvbG9yOiAnIzE3OEJDQScsIC8vIFRoZSBjb2xvciBvZiB0aGUgb3V0ZXIgY2lyY2xlLlxyXG4gICAgd2F2ZUhlaWdodDogMC4wNSwgLy8gVGhlIHdhdmUgaGVpZ2h0IGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgcmFkaXVzIG9mIHRoZSB3YXZlIGNpcmNsZS5cclxuICAgIHdhdmVDb3VudDogMSwgLy8gVGhlIG51bWJlciBvZiBmdWxsIHdhdmVzIHBlciB3aWR0aCBvZiB0aGUgd2F2ZSBjaXJjbGUuXHJcbiAgICB3YXZlUmlzZVRpbWU6IDEwMDAsIC8vIFRoZSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB3YXZlIHRvIHJpc2UgZnJvbSAwIHRvIGl0J3MgZmluYWwgaGVpZ2h0LlxyXG4gICAgd2F2ZUFuaW1hdGVUaW1lOiAxODAwMCwgLy8gVGhlIGFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgYSBmdWxsIHdhdmUgdG8gZW50ZXIgdGhlIHdhdmUgY2lyY2xlLlxyXG4gICAgd2F2ZVJpc2U6IHRydWUsIC8vIENvbnRyb2wgaWYgdGhlIHdhdmUgc2hvdWxkIHJpc2UgZnJvbSAwIHRvIGl0J3MgZnVsbCBoZWlnaHQsIG9yIHN0YXJ0IGF0IGl0J3MgZnVsbCBoZWlnaHQuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICB3YXZlSGVpZ2h0U2NhbGluZzogdHJ1ZSwgLy8gQ29udHJvbHMgd2F2ZSBzaXplIHNjYWxpbmcgYXQgbG93IGFuZCBoaWdoIGZpbGwgcGVyY2VudGFnZXMuIFdoZW4gdHJ1ZSwgd2F2ZSBoZWlnaHQgcmVhY2hlcyBpdCdzIG1heGltdW0gYXQgNTAlIGZpbGwsIGFuZCBtaW5pbXVtIGF0IDAlIGFuZCAxMDAlIGZpbGwuIFRoaXMgaGVscHMgdG8gcHJldmVudCB0aGUgd2F2ZSBmcm9tIG1ha2luZyB0aGUgd2F2ZSBjaXJjbGUgZnJvbSBhcHBlYXIgdG90YWxseSBmdWxsIG9yIGVtcHR5IHdoZW4gbmVhciBpdCdzIG1pbmltdW0gb3IgbWF4aW11bSBmaWxsLlxyXG4gICAgd2F2ZUFuaW1hdGU6IHRydWUsIC8vIENvbnRyb2xzIGlmIHRoZSB3YXZlIHNjcm9sbHMgb3IgaXMgc3RhdGljLlxyXG4gICAgd2F2ZUNvbG9yOiAnIzE3OEJDQScsIC8vIFRoZSBjb2xvciBvZiB0aGUgZmlsbCB3YXZlLlxyXG4gICAgd2F2ZU9mZnNldDogMCwgLy8gVGhlIGFtb3VudCB0byBpbml0aWFsbHkgb2Zmc2V0IHRoZSB3YXZlLiAwID0gbm8gb2Zmc2V0LiAxID0gb2Zmc2V0IG9mIG9uZSBmdWxsIHdhdmUuXHJcbiAgICB0ZXh0VmVydFBvc2l0aW9uOiAuNSwgLy8gVGhlIGhlaWdodCBhdCB3aGljaCB0byBkaXNwbGF5IHRoZSBwZXJjZW50YWdlIHRleHQgd2l0aGluZyB0aGUgd2F2ZSBjaXJjbGUuIDAgPSBib3R0b20sIDEgPSB0b3AuXHJcbiAgICB0ZXh0U2l6ZTogMSwgLy8gVGhlIHJlbGF0aXZlIGhlaWdodCBvZiB0aGUgdGV4dCB0byBkaXNwbGF5IGluIHRoZSB3YXZlIGNpcmNsZS4gMSA9IDUwJVxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgdmFsdWVDb3VudFVwOiB0cnVlLCAvLyBJZiB0cnVlLCB0aGUgZGlzcGxheWVkIHZhbHVlIGNvdW50cyB1cCBmcm9tIDAgdG8gaXQncyBmaW5hbCB2YWx1ZSB1cG9uIGxvYWRpbmcuIElmIGZhbHNlLCB0aGUgZmluYWwgdmFsdWUgaXMgZGlzcGxheWVkLlxyXG4gICAgZGlzcGxheVBlcmNlbnQ6IHRydWUsIC8vIElmIHRydWUsIGEgJSBzeW1ib2wgaXMgZGlzcGxheWVkIGFmdGVyIHRoZSB2YWx1ZS5cclxuXHJcbiAgICB0ZXh0Q29sb3I6ICcjMDQ1NjgxJywgLy8gVGhlIGNvbG9yIG9mIHRoZSB2YWx1ZSB0ZXh0IHdoZW4gdGhlIHdhdmUgZG9lcyBub3Qgb3ZlcmxhcCBpdC5cclxuICAgIHdhdmVUZXh0Q29sb3I6ICcjQTREQmY4JyAvLyBUaGUgY29sb3Igb2YgdGhlIHZhbHVlIHRleHQgd2hlbiB0aGUgd2F2ZSBvdmVybGFwcyBpdC5cclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZExpcXVpZEZpbGxHYXVnZShlbGVtZW50SWQsIHZhbHVlLCBjb25maWcpIHtcclxuICBpZiAoY29uZmlnID09IG51bGwpIHtcclxuICAgIGNvbmZpZyA9IGxpcXVpZEZpbGxHYXVnZURlZmF1bHRTZXR0aW5ncygpO1xyXG4gIH1cclxuICBjb25zdCBnYXVnZSA9IGQzLnNlbGVjdCgnIycgKyBlbGVtZW50SWQpO1xyXG4gIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKHBhcnNlSW50KGdhdWdlLnN0eWxlKCd3aWR0aCcpLCAxMCksIHBhcnNlSW50KGdhdWdlLnN0eWxlKCdoZWlnaHQnKSwgMTApKSAvIDI7XHJcbiAgY29uc3QgbG9jYXRpb25YID0gcGFyc2VJbnQoZ2F1Z2Uuc3R5bGUoJ3dpZHRoJyksIDEwKSAvIDIgLSByYWRpdXM7XHJcbiAgY29uc3QgbG9jYXRpb25ZID0gcGFyc2VJbnQoZ2F1Z2Uuc3R5bGUoJ2hlaWdodCcpLCAxMCkgLyAyIC0gcmFkaXVzO1xyXG4gIGxldCBmaWxsUGVyY2VudCA9IE1hdGgubWF4KGNvbmZpZy5taW5WYWx1ZSwgTWF0aC5taW4oY29uZmlnLm1heFZhbHVlLCB2YWx1ZSkpIC8gY29uZmlnLm1heFZhbHVlO1xyXG5cclxuICBsZXQgd2F2ZUhlaWdodFNjYWxlO1xyXG4gIGlmIChjb25maWcud2F2ZUhlaWdodFNjYWxpbmcpIHtcclxuICAgIHdhdmVIZWlnaHRTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgICAgLnJhbmdlKFswLCBjb25maWcud2F2ZUhlaWdodCwgMF0pXHJcbiAgICAgIC5kb21haW4oWzAsIDUwLCAxMDBdKTtcclxuICB9IGVsc2Uge1xyXG4gICAgd2F2ZUhlaWdodFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAucmFuZ2UoW2NvbmZpZy53YXZlSGVpZ2h0LCBjb25maWcud2F2ZUhlaWdodF0pXHJcbiAgICAgIC5kb21haW4oWzAsIDEwMF0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdGV4dFBpeGVscyA9IChjb25maWcudGV4dFNpemUgKiByYWRpdXMgLyAyKTtcclxuICBjb25zdCB0ZXh0RmluYWxWYWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpLnRvRml4ZWQoMik7XHJcbiAgY29uc3QgdGV4dFN0YXJ0VmFsdWUgPSBjb25maWcudmFsdWVDb3VudFVwID8gY29uZmlnLm1pblZhbHVlIDogdGV4dEZpbmFsVmFsdWU7XHJcbiAgY29uc3QgcGVyY2VudFRleHQgPSBjb25maWcuZGlzcGxheVBlcmNlbnQgPyAnJScgOiAnJztcclxuICBjb25zdCBjaXJjbGVUaGlja25lc3MgPSBjb25maWcuY2lyY2xlVGhpY2tuZXNzICogcmFkaXVzO1xyXG4gIGNvbnN0IGNpcmNsZUZpbGxHYXAgPSBjb25maWcuY2lyY2xlRmlsbEdhcCAqIHJhZGl1cztcclxuICBjb25zdCBmaWxsQ2lyY2xlTWFyZ2luID0gY2lyY2xlVGhpY2tuZXNzICsgY2lyY2xlRmlsbEdhcDtcclxuICBjb25zdCBmaWxsQ2lyY2xlUmFkaXVzID0gcmFkaXVzIC0gZmlsbENpcmNsZU1hcmdpbjtcclxuICBsZXQgd2F2ZUhlaWdodCA9IGZpbGxDaXJjbGVSYWRpdXMgKiB3YXZlSGVpZ2h0U2NhbGUoZmlsbFBlcmNlbnQgKiAxMDApO1xyXG5cclxuICBjb25zdCB3YXZlTGVuZ3RoID0gZmlsbENpcmNsZVJhZGl1cyAqIDIgLyBjb25maWcud2F2ZUNvdW50O1xyXG4gIGNvbnN0IHdhdmVDbGlwQ291bnQgPSAxICsgY29uZmlnLndhdmVDb3VudDtcclxuICBjb25zdCB3YXZlQ2xpcFdpZHRoID0gd2F2ZUxlbmd0aCAqIHdhdmVDbGlwQ291bnQ7XHJcblxyXG4gIC8vIFJvdW5kaW5nIGZ1bmN0aW9ucyBzbyB0aGF0IHRoZSBjb3JyZWN0IG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyBpcyBhbHdheXMgZGlzcGxheWVkIGFzIHRoZSB2YWx1ZSBjb3VudHMgdXAuXHJcbiAgbGV0IHRleHRSb3VuZGVyID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgcmV0dXJuICcnICsgTWF0aC5yb3VuZCh2YWwpO1xyXG4gIH07XHJcbiAgaWYgKHBhcnNlRmxvYXQodGV4dEZpbmFsVmFsdWUpICE9PSBwYXJzZUZsb2F0KHRleHRSb3VuZGVyKHRleHRGaW5hbFZhbHVlKSkpIHtcclxuICAgIHRleHRSb3VuZGVyID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWwpLnRvRml4ZWQoMSk7XHJcbiAgICB9O1xyXG4gIH1cclxuICBpZiAocGFyc2VGbG9hdCh0ZXh0RmluYWxWYWx1ZSkgIT09IHBhcnNlRmxvYXQodGV4dFJvdW5kZXIodGV4dEZpbmFsVmFsdWUpKSkge1xyXG4gICAgdGV4dFJvdW5kZXIgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbCkudG9GaXhlZCgyKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBEYXRhIGZvciBidWlsZGluZyB0aGUgY2xpcCB3YXZlIGFyZWEuXHJcbiAgY29uc3QgZGF0YSA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDw9IDQwICogd2F2ZUNsaXBDb3VudDsgaSsrKSB7XHJcbiAgICBkYXRhLnB1c2goe1xyXG4gICAgICB4OiBpIC8gKDQwICogd2F2ZUNsaXBDb3VudCksXHJcbiAgICAgIHk6IChpIC8gKDQwKSlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gU2NhbGVzIGZvciBkcmF3aW5nIHRoZSBvdXRlciBjaXJjbGUuXHJcbiAgY29uc3QgZ2F1Z2VDaXJjbGVYID0gZDMuc2NhbGVMaW5lYXIoKS5yYW5nZShbMCwgMiAqIE1hdGguUEldKS5kb21haW4oWzAsIDFdKTtcclxuICBjb25zdCBnYXVnZUNpcmNsZVkgPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFswLCByYWRpdXNdKS5kb21haW4oWzAsIHJhZGl1c10pO1xyXG5cclxuICAvLyBTY2FsZXMgZm9yIGNvbnRyb2xsaW5nIHRoZSBzaXplIG9mIHRoZSBjbGlwcGluZyBwYXRoLlxyXG4gIGxldCB3YXZlU2NhbGVYID0gZDMuc2NhbGVMaW5lYXIoKS5yYW5nZShbMCwgd2F2ZUNsaXBXaWR0aF0pLmRvbWFpbihbMCwgMV0pO1xyXG4gIGxldCB3YXZlU2NhbGVZID0gZDMuc2NhbGVMaW5lYXIoKS5yYW5nZShbMCwgd2F2ZUhlaWdodF0pLmRvbWFpbihbMCwgMV0pO1xyXG5cclxuICAvLyBTY2FsZXMgZm9yIGNvbnRyb2xsaW5nIHRoZSBwb3NpdGlvbiBvZiB0aGUgY2xpcHBpbmcgcGF0aC5cclxuICBsZXQgd2F2ZVJpc2VTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgIC8vIFRoZSBjbGlwcGluZyBhcmVhIHNpemUgaXMgdGhlIGhlaWdodCBvZiB0aGUgZmlsbCBjaXJjbGUgKyB0aGUgd2F2ZSBoZWlnaHQsIHNvIHdlIHBvc2l0aW9uIHRoZSBjbGlwIHdhdmVcclxuICAgIC8vIHN1Y2ggdGhhdCB0aGUgaXQgd2lsbCBvdmVybGFwIHRoZSBmaWxsIGNpcmNsZSBhdCBhbGwgd2hlbiBhdCAwJSwgYW5kIHdpbGwgdG90YWxseSBjb3ZlciB0aGUgZmlsbFxyXG4gICAgLy8gY2lyY2xlIGF0IDEwMCUuXHJcbiAgICAucmFuZ2UoWyhmaWxsQ2lyY2xlTWFyZ2luICsgZmlsbENpcmNsZVJhZGl1cyAqIDIgKyB3YXZlSGVpZ2h0KSwgKGZpbGxDaXJjbGVNYXJnaW4gLSB3YXZlSGVpZ2h0KV0pXHJcbiAgICAuZG9tYWluKFswLCAxXSk7XHJcbiAgY29uc3Qgd2F2ZUFuaW1hdGVTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgIC5yYW5nZShbMCwgd2F2ZUNsaXBXaWR0aCAtIGZpbGxDaXJjbGVSYWRpdXMgKiAyXSkgLy8gUHVzaCB0aGUgY2xpcCBhcmVhIG9uZSBmdWxsIHdhdmUgdGhlbiBzbmFwIGJhY2suXHJcbiAgICAuZG9tYWluKFswLCAxXSk7XHJcblxyXG4gIC8vIFNjYWxlIGZvciBjb250cm9sbGluZyB0aGUgcG9zaXRpb24gb2YgdGhlIHRleHQgd2l0aGluIHRoZSBnYXVnZS5cclxuICBjb25zdCB0ZXh0UmlzZVNjYWxlWSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAgIC5yYW5nZShbZmlsbENpcmNsZU1hcmdpbiArIGZpbGxDaXJjbGVSYWRpdXMgKiAyLCAoZmlsbENpcmNsZU1hcmdpbiArIHRleHRQaXhlbHMgKiAwLjcpXSlcclxuICAgIC5kb21haW4oWzAsIDFdKTtcclxuXHJcbiAgLy8gQ2VudGVyIHRoZSBnYXVnZSB3aXRoaW4gdGhlIHBhcmVudCBTVkcuXHJcbiAgY29uc3QgZ2F1Z2VHcm91cCA9IGdhdWdlLmFwcGVuZCgnZycpXHJcbiAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbG9jYXRpb25YICsgJywnICsgbG9jYXRpb25ZICsgJyknKTtcclxuXHJcbiAgLy8gRHJhdyB0aGUgb3V0ZXIgUmVjdGFuZ2xlLlxyXG4gIHZhciByZWN0cG9pbnRzID0gW3t4OiAwLCB5OiAwfSwge3g6IDAsIHk6IHBhcnNlSW50KGdhdWdlLnN0eWxlKCdoZWlnaHQnKSl9LCB7eDogcGFyc2VJbnQoZ2F1Z2Uuc3R5bGUoJ3dpZHRoJyksIDEwKSwgeTogcGFyc2VJbnQoZ2F1Z2Uuc3R5bGUoJ2hlaWdodCcpKX0sIHt4OiBwYXJzZUludChnYXVnZS5zdHlsZSgnd2lkdGgnKSwgMTApLCB5OiAwfSwge3g6IDAsIHk6IDB9XTtcclxuICB2YXIgbGluZUZ1bmMgPSBkMy5saW5lKClcclxuICAgICAgLngoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC54IH0pXHJcbiAgICAgIC55KGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueSB9KTtcclxuICBnYXVnZUdyb3VwLmFwcGVuZCgncGF0aCcpXHJcbiAgICAuYXR0cignZCcsIGxpbmVGdW5jKHJlY3Rwb2ludHMpKVxyXG4gICAgLmF0dHIoJ3N0cm9rZScsIGNvbmZpZy5jaXJjbGVDb2xvcilcclxuICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCBjaXJjbGVUaGlja25lc3MpXHJcbiAgICAuYXR0cignZmlsbCcsICdub25lJyk7XHJcblxyXG4gIC8vIFRleHQgd2hlcmUgdGhlIHdhdmUgZG9lcyBub3Qgb3ZlcmxhcC5cclxuICBjb25zdCB0ZXh0MSA9IGdhdWdlR3JvdXAuYXBwZW5kKCd0ZXh0JylcclxuICAgIC50ZXh0KHRleHRSb3VuZGVyKHRleHRTdGFydFZhbHVlKSArIHBlcmNlbnRUZXh0KVxyXG4gICAgLmF0dHIoJ2NsYXNzJywgJ2xpcXVpZEZpbGxHYXVnZVRleHQnKVxyXG4gICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXHJcbiAgICAuYXR0cignZm9udC1zaXplJywgdGV4dFBpeGVscyArICdweCcpXHJcbiAgICAuc3R5bGUoJ2ZpbGwnLCBjb25maWcudGV4dENvbG9yKVxyXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHJhZGl1cyArICcsJyArIHRleHRSaXNlU2NhbGVZKGNvbmZpZy50ZXh0VmVydFBvc2l0aW9uKSArICcpJyk7XHJcblxyXG4gIC8vIFRoZSBjbGlwcGluZyB3YXZlIGFyZWEuXHJcbiAgY29uc3QgY2xpcEFyZWEgPSBkMy5hcmVhKClcclxuICAgIC54KGZ1bmN0aW9uIChkOiBhbnkpIHtcclxuICAgICAgcmV0dXJuIHdhdmVTY2FsZVgoZC54KTtcclxuICAgIH0pXHJcbiAgICAueTAoZnVuY3Rpb24gKGQ6IGFueSkge1xyXG4gICAgICByZXR1cm4gd2F2ZVNjYWxlWShNYXRoLnNpbihNYXRoLlBJICogMiAqIGNvbmZpZy53YXZlT2Zmc2V0ICogLTEgKyBNYXRoLlBJICogMiAqICgxIC0gY29uZmlnLndhdmVDb3VudCkgKyBkLnkgKiAyICogTWF0aC5QSSkpO1xyXG4gICAgfSlcclxuICAgIC55MShmdW5jdGlvbiAoZCkge1xyXG4gICAgICByZXR1cm4gKGZpbGxDaXJjbGVSYWRpdXMgKiAyICsgd2F2ZUhlaWdodCk7XHJcbiAgICB9KTtcclxuICBjb25zdCB3YXZlR3JvdXAgPSBnYXVnZUdyb3VwLmFwcGVuZCgnZGVmcycpXHJcbiAgICAuYXBwZW5kKCdjbGlwUGF0aCcpXHJcbiAgICAuYXR0cignaWQnLCAnY2xpcFdhdmUnICsgZWxlbWVudElkKTtcclxuICBjb25zdCB3YXZlID0gd2F2ZUdyb3VwLmFwcGVuZCgncGF0aCcpXHJcbiAgICAuZGF0dW0oZGF0YSlcclxuICAgIC5hdHRyKCdkJywgY2xpcEFyZWEpXHJcbiAgICAuYXR0cignVCcsIDApO1xyXG5cclxuICAvLyBUaGUgaW5uZXIgY2lyY2xlIHdpdGggdGhlIGNsaXBwaW5nIHdhdmUgYXR0YWNoZWQuXHJcbiAgY29uc3QgZmlsbENpcmNsZUdyb3VwID0gZ2F1Z2VHcm91cC5hcHBlbmQoJ2cnKVxyXG4gICAgLmF0dHIoJ2NsaXAtcGF0aCcsICd1cmwoI2NsaXBXYXZlJyArIGVsZW1lbnRJZCArICcpJyk7XHJcbiAgZmlsbENpcmNsZUdyb3VwLmFwcGVuZCgncmVjdCcpXHJcbiAgICAgICAgLmF0dHIoJ3gnLCAocmFkaXVzKSAtIGZpbGxDaXJjbGVSYWRpdXMpXHJcbiAgICAgICAgLmF0dHIoJ3knLCByYWRpdXMgLSBmaWxsQ2lyY2xlUmFkaXVzKVxyXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGZpbGxDaXJjbGVSYWRpdXMqMilcclxuICAgICAgICAuYXR0cignaGVpZ2h0JywgZmlsbENpcmNsZVJhZGl1cyoyKVxyXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsIGNvbmZpZy53YXZlQ29sb3IpO1xyXG5cclxuICAvLyBUZXh0IHdoZXJlIHRoZSB3YXZlIGRvZXMgb3ZlcmxhcC5cclxuICBjb25zdCB0ZXh0MiA9IGZpbGxDaXJjbGVHcm91cC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgLnRleHQodGV4dFJvdW5kZXIodGV4dFN0YXJ0VmFsdWUpICsgcGVyY2VudFRleHQpXHJcbiAgICAuYXR0cignY2xhc3MnLCAnbGlxdWlkRmlsbEdhdWdlVGV4dCcpXHJcbiAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcclxuICAgIC5hdHRyKCdmb250LXNpemUnLCB0ZXh0UGl4ZWxzICsgJ3B4JylcclxuICAgIC5zdHlsZSgnZmlsbCcsIGNvbmZpZy53YXZlVGV4dENvbG9yKVxyXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHJhZGl1cyArICcsJyArIHRleHRSaXNlU2NhbGVZKGNvbmZpZy50ZXh0VmVydFBvc2l0aW9uKSArICcpJyk7XHJcblxyXG4gIC8vIE1ha2UgdGhlIHZhbHVlIGNvdW50IHVwLlxyXG4gIGlmIChjb25maWcudmFsdWVDb3VudFVwKSB7XHJcbiAgICBjb25zdCB0ZXh0VHdlZW4gPSBmdW5jdGlvbiBnKCkge1xyXG4gICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUodGhpcy50ZXh0Q29udGVudCwgdGV4dEZpbmFsVmFsdWUpO1xyXG4gICAgICByZXR1cm4gKHQpID0+IHtcclxuICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gdGV4dFJvdW5kZXIoaSh0KSkgKyBwZXJjZW50VGV4dDtcclxuICAgICAgfTtcclxuICAgIH07XHJcbiAgICB0ZXh0MS50cmFuc2l0aW9uKClcclxuICAgICAgLmR1cmF0aW9uKGNvbmZpZy53YXZlUmlzZVRpbWUpXHJcbiAgICAgIC50d2VlbigndGV4dCcsIHRleHRUd2Vlbik7XHJcbiAgICB0ZXh0Mi50cmFuc2l0aW9uKClcclxuICAgICAgLmR1cmF0aW9uKGNvbmZpZy53YXZlUmlzZVRpbWUpXHJcbiAgICAgIC50d2VlbigndGV4dCcsIHRleHRUd2Vlbik7XHJcbiAgfVxyXG5cclxuICAvLyBNYWtlIHRoZSB3YXZlIHJpc2UuIHdhdmUgYW5kIHdhdmVHcm91cCBhcmUgc2VwYXJhdGUgc28gdGhhdCBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBtb3ZlbWVudCBjYW4gYmUgY29udHJvbGxlZCBpbmRlcGVuZGVudGx5LlxyXG4gIGNvbnN0IHdhdmVHcm91cFhQb3NpdGlvbiA9IGZpbGxDaXJjbGVNYXJnaW4gKyBmaWxsQ2lyY2xlUmFkaXVzICogMiAtIHdhdmVDbGlwV2lkdGg7XHJcbiAgaWYgKGNvbmZpZy53YXZlUmlzZSkge1xyXG5cclxuICAgIHdhdmVHcm91cC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB3YXZlR3JvdXBYUG9zaXRpb24gKyAnLCcgKyB3YXZlUmlzZVNjYWxlKDApICsgJyknKVxyXG4gICAgICAudHJhbnNpdGlvbigpXHJcbiAgICAgIC5kdXJhdGlvbihjb25maWcud2F2ZVJpc2VUaW1lKVxyXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgd2F2ZUdyb3VwWFBvc2l0aW9uICsgJywnICsgd2F2ZVJpc2VTY2FsZShmaWxsUGVyY2VudCkgKyAnKScpXHJcbiAgICAgIC5vbignc3RhcnQnLCAoKSA9PiB7XHJcbiAgICAgICAgd2F2ZS5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDEsMCknKTtcclxuICAgICAgfSk7IC8vIFRoaXMgdHJhbnNmb3JtIGlzIG5lY2Vzc2FyeSB0byBnZXQgdGhlIGNsaXAgd2F2ZSBwb3NpdGlvbmVkIGNvcnJlY3RseSB3aGVuIHdhdmVSaXNlPXRydWUgYW5kXHJcbiAgICAvLyB3YXZlQW5pbWF0ZT1mYWxzZS4gVGhlIHdhdmUgd2lsbCBub3QgcG9zaXRpb24gY29ycmVjdGx5IHdpdGhvdXQgdGhpcywgYnV0IGl0J3Mgbm90IGNsZWFyIHdoeSB0aGlzIGlzIGFjdHVhbGx5IG5lY2Vzc2FyeS5cclxuICB9IGVsc2Uge1xyXG4gICAgd2F2ZUdyb3VwLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHdhdmVHcm91cFhQb3NpdGlvbiArICcsJyArIHdhdmVSaXNlU2NhbGUoZmlsbFBlcmNlbnQpICsgJyknKTtcclxuICB9XHJcblxyXG4gIGlmIChjb25maWcud2F2ZUFuaW1hdGUpIHtcclxuICAgIGFuaW1hdGVXYXZlKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhbmltYXRlV2F2ZShfPzogYW55KSB7XHJcbiAgICB3YXZlLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHdhdmVBbmltYXRlU2NhbGUoK3dhdmUuYXR0cignVCcpKSArICcsMCknKTtcclxuICAgIHdhdmUudHJhbnNpdGlvbigpXHJcbiAgICAgIC5kdXJhdGlvbihjb25maWcud2F2ZUFuaW1hdGVUaW1lICogKDEgLSArd2F2ZS5hdHRyKCdUJykpKVxyXG4gICAgICAuZWFzZShkMy5lYXNlTGluZWFyKVxyXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgd2F2ZUFuaW1hdGVTY2FsZSgxKSArICcsMCknKVxyXG4gICAgICAuYXR0cignVCcsIDEpXHJcbiAgICAgIC5vbignZW5kJywgKCkgPT4ge1xyXG4gICAgICAgIHdhdmUuYXR0cignVCcsIDApO1xyXG4gICAgICAgIGFuaW1hdGVXYXZlKGNvbmZpZy53YXZlQW5pbWF0ZVRpbWUpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIEdhdWdlVXBkYXRlcigpIHtcclxuICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICBjb25zdCBuZXdGaW5hbFZhbHVlID0gcGFyc2VGbG9hdCh2YWwpLnRvRml4ZWQoMik7XHJcbiAgICAgIGxldCB0ZXh0Um91bmRlclVwZGF0ZXIgPSBmdW5jdGlvbiAodmFsMikge1xyXG4gICAgICAgIHJldHVybiAnJyArIE1hdGgucm91bmQodmFsMik7XHJcbiAgICAgIH07XHJcbiAgICAgIGlmIChwYXJzZUZsb2F0KG5ld0ZpbmFsVmFsdWUpICE9PSBwYXJzZUZsb2F0KHRleHRSb3VuZGVyVXBkYXRlcihuZXdGaW5hbFZhbHVlKSkpIHtcclxuICAgICAgICB0ZXh0Um91bmRlclVwZGF0ZXIgPSBmdW5jdGlvbiAodmFsMikge1xyXG4gICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsMikudG9GaXhlZCgxKTtcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChwYXJzZUZsb2F0KG5ld0ZpbmFsVmFsdWUpICE9PSBwYXJzZUZsb2F0KHRleHRSb3VuZGVyVXBkYXRlcihuZXdGaW5hbFZhbHVlKSkpIHtcclxuICAgICAgICB0ZXh0Um91bmRlclVwZGF0ZXIgPSBmdW5jdGlvbiAodmFsMikge1xyXG4gICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsMikudG9GaXhlZCgyKTtcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB0ZXh0VHdlZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaSA9IGQzLmludGVycG9sYXRlKHRoaXMudGV4dENvbnRlbnQsIHBhcnNlRmxvYXQodmFsdWUpLnRvRml4ZWQoMikpO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IHRleHRSb3VuZGVyVXBkYXRlcihpKHQpKSArIHBlcmNlbnRUZXh0O1xyXG4gICAgICAgIH07XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0ZXh0MS50cmFuc2l0aW9uKClcclxuICAgICAgICAuZHVyYXRpb24oY29uZmlnLndhdmVSaXNlVGltZSlcclxuICAgICAgICAudHdlZW4oJ3RleHQnLCB0ZXh0VHdlZW4pO1xyXG4gICAgICB0ZXh0Mi50cmFuc2l0aW9uKClcclxuICAgICAgICAuZHVyYXRpb24oY29uZmlnLndhdmVSaXNlVGltZSlcclxuICAgICAgICAudHdlZW4oJ3RleHQnLCB0ZXh0VHdlZW4pO1xyXG5cclxuICAgICAgZmlsbFBlcmNlbnQgPSBNYXRoLm1heChjb25maWcubWluVmFsdWUsIE1hdGgubWluKGNvbmZpZy5tYXhWYWx1ZSwgdmFsdWUpKSAvIGNvbmZpZy5tYXhWYWx1ZTtcclxuICAgICAgd2F2ZUhlaWdodCA9IGZpbGxDaXJjbGVSYWRpdXMgKiB3YXZlSGVpZ2h0U2NhbGUoZmlsbFBlcmNlbnQgKiAxMDApO1xyXG4gICAgICB3YXZlUmlzZVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAgIC8vIFRoZSBjbGlwcGluZyBhcmVhIHNpemUgaXMgdGhlIGhlaWdodCBvZiB0aGUgZmlsbCBjaXJjbGUgKyB0aGUgd2F2ZSBoZWlnaHQsIHNvIHdlIHBvc2l0aW9uIHRoZSBjbGlwIHdhdmVcclxuICAgICAgICAvLyBzdWNoIHRoYXQgdGhlIGl0IHdpbGwgb3ZlcmxhcCB0aGUgZmlsbCBjaXJjbGUgYXQgYWxsIHdoZW4gYXQgMCUsIGFuZCB3aWxsIHRvdGFsbHkgY292ZXIgdGhlIGZpbGxcclxuICAgICAgICAvLyBjaXJjbGUgYXQgMTAwJS5cclxuICAgICAgICAucmFuZ2UoWyhmaWxsQ2lyY2xlTWFyZ2luICsgZmlsbENpcmNsZVJhZGl1cyAqIDIgKyB3YXZlSGVpZ2h0KSwgKGZpbGxDaXJjbGVNYXJnaW4gLSB3YXZlSGVpZ2h0KV0pXHJcbiAgICAgICAgLmRvbWFpbihbMCwgMV0pO1xyXG4gICAgICBjb25zdCBuZXdIZWlnaHQgPSB3YXZlUmlzZVNjYWxlKGZpbGxQZXJjZW50KTtcclxuICAgICAgd2F2ZVNjYWxlWCA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoWzAsIHdhdmVDbGlwV2lkdGhdKS5kb21haW4oWzAsIDFdKTtcclxuICAgICAgd2F2ZVNjYWxlWSA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoWzAsIHdhdmVIZWlnaHRdKS5kb21haW4oWzAsIDFdKTtcclxuICAgICAgbGV0IG5ld0NsaXBBcmVhO1xyXG4gICAgICBpZiAoY29uZmlnLndhdmVIZWlnaHRTY2FsaW5nKSB7XHJcbiAgICAgICAgbmV3Q2xpcEFyZWEgPSBkMy5hcmVhKClcclxuICAgICAgICAgIC54KChkOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHdhdmVTY2FsZVgoZC54KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAueTAoKGQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gd2F2ZVNjYWxlWShNYXRoLnNpbihNYXRoLlBJICogMiAqIGNvbmZpZy53YXZlT2Zmc2V0ICogLTEgKyBNYXRoLlBJICogMiAqICgxIC0gY29uZmlnLndhdmVDb3VudCkgKyBkLnkgKiAyICogTWF0aC5QSSkpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC55MSgoZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKGZpbGxDaXJjbGVSYWRpdXMgKiAyICsgd2F2ZUhlaWdodCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXdDbGlwQXJlYSA9IGNsaXBBcmVhO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBuZXdXYXZlUG9zaXRpb24gPSBjb25maWcud2F2ZUFuaW1hdGUgPyB3YXZlQW5pbWF0ZVNjYWxlKDEpIDogMDtcclxuICAgICAgd2F2ZS50cmFuc2l0aW9uKClcclxuICAgICAgICAuZHVyYXRpb24oMClcclxuICAgICAgICAudHJhbnNpdGlvbigpXHJcbiAgICAgICAgLmR1cmF0aW9uKGNvbmZpZy53YXZlQW5pbWF0ZSA/IChjb25maWcud2F2ZUFuaW1hdGVUaW1lICogKDEgLSArd2F2ZS5hdHRyKCdUJykpKSA6IChjb25maWcud2F2ZVJpc2VUaW1lKSlcclxuICAgICAgICAuZWFzZShkMy5lYXNlTGluZWFyKVxyXG4gICAgICAgIC5hdHRyKCdkJywgbmV3Q2xpcEFyZWEpXHJcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG5ld1dhdmVQb3NpdGlvbiArICcsMCknKVxyXG4gICAgICAgIC5hdHRyKCdUJywgJzEnKVxyXG4gICAgICAgIC5vbignc3RhcnQnLCAoKSA9PiB7XHJcbiAgICAgICAgICBpZiAoY29uZmlnLndhdmVBbmltYXRlKSB7XHJcbiAgICAgICAgICAgIHdhdmUuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgd2F2ZUFuaW1hdGVTY2FsZSgwKSArICcsMCknKTtcclxuICAgICAgICAgICAgYW5pbWF0ZVdhdmUoY29uZmlnLndhdmVBbmltYXRlVGltZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHdhdmVHcm91cC50cmFuc2l0aW9uKClcclxuICAgICAgICAuZHVyYXRpb24oY29uZmlnLndhdmVSaXNlVGltZSlcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgd2F2ZUdyb3VwWFBvc2l0aW9uICsgJywnICsgbmV3SGVpZ2h0ICsgJyknKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IEdhdWdlVXBkYXRlcigpO1xyXG59XHJcbiJdfQ==