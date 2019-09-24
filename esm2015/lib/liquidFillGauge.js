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
    const gauge = d3.select('#' + elementId);
    /** @type {?} */
    const radius = Math.min(parseInt(gauge.style('width'), 10), parseInt(gauge.style('height'), 10)) / 2;
    /** @type {?} */
    const locationX = parseInt(gauge.style('width'), 10) / 2 - radius;
    /** @type {?} */
    const locationY = parseInt(gauge.style('height'), 10) / 2 - radius;
    /** @type {?} */
    let fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue;
    /** @type {?} */
    let waveHeightScale;
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
    const textPixels = (config.textSize * radius / 2);
    /** @type {?} */
    const textFinalValue = parseFloat(value).toFixed(2);
    /** @type {?} */
    const textStartValue = config.valueCountUp ? config.minValue : textFinalValue;
    /** @type {?} */
    const percentText = config.displayPercent ? '%' : '';
    /** @type {?} */
    const circleThickness = config.circleThickness * radius;
    /** @type {?} */
    const circleFillGap = config.circleFillGap * radius;
    /** @type {?} */
    const fillCircleMargin = circleThickness + circleFillGap;
    /** @type {?} */
    const fillCircleRadius = radius - fillCircleMargin;
    /** @type {?} */
    let waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
    /** @type {?} */
    const waveLength = fillCircleRadius * 2 / config.waveCount;
    /** @type {?} */
    const waveClipCount = 1 + config.waveCount;
    /** @type {?} */
    const waveClipWidth = waveLength * waveClipCount;
    /** @type {?} */
    let textRounder = function (val) {
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
    const data = [];
    for (let i = 0; i <= 40 * waveClipCount; i++) {
        data.push({
            x: i / (40 * waveClipCount),
            y: (i / (40))
        });
    }
    /** @type {?} */
    const gaugeCircleX = d3.scaleLinear().range([0, 2 * Math.PI]).domain([0, 1]);
    /** @type {?} */
    const gaugeCircleY = d3.scaleLinear().range([0, radius]).domain([0, radius]);
    /** @type {?} */
    let waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
    /** @type {?} */
    let waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1]);
    /** @type {?} */
    let waveRiseScale = d3.scaleLinear()
        // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
        // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
        // circle at 100%.
        .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
        .domain([0, 1]);
    /** @type {?} */
    const waveAnimateScale = d3.scaleLinear()
        .range([0, waveClipWidth - fillCircleRadius * 2]) // Push the clip area one full wave then snap back.
        .domain([0, 1]);
    /** @type {?} */
    const textRiseScaleY = d3.scaleLinear()
        .range([fillCircleMargin + fillCircleRadius * 2, (fillCircleMargin + textPixels * 0.7)])
        .domain([0, 1]);
    /** @type {?} */
    const gaugeGroup = gauge.append('g')
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
    const text1 = gaugeGroup.append('text')
        .text(textRounder(textStartValue) + percentText)
        .attr('class', 'liquidFillGaugeText')
        .attr('text-anchor', 'middle')
        .attr('font-size', textPixels + 'px')
        .style('fill', config.textColor)
        .attr('transform', 'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')');
    /** @type {?} */
    const clipArea = d3.area()
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
    const waveGroup = gaugeGroup.append('defs')
        .append('clipPath')
        .attr('id', 'clipWave' + elementId);
    /** @type {?} */
    const wave = waveGroup.append('path')
        .datum(data)
        .attr('d', clipArea)
        .attr('T', 0);
    /** @type {?} */
    const fillCircleGroup = gaugeGroup.append('g')
        .attr('clip-path', 'url(#clipWave' + elementId + ')');
    fillCircleGroup.append('rect')
        .attr('x', (radius) - fillCircleRadius)
        .attr('y', radius - fillCircleRadius)
        .attr('width', fillCircleRadius * 2)
        .attr('height', fillCircleRadius * 2)
        .style('fill', config.waveColor);
    /** @type {?} */
    const text2 = fillCircleGroup.append('text')
        .text(textRounder(textStartValue) + percentText)
        .attr('class', 'liquidFillGaugeText')
        .attr('text-anchor', 'middle')
        .attr('font-size', textPixels + 'px')
        .style('fill', config.waveTextColor)
        .attr('transform', 'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')');
    // Make the value count up.
    if (config.valueCountUp) {
        /** @type {?} */
        const textTween = function g() {
            /** @type {?} */
            const i = d3.interpolate(this.textContent, textFinalValue);
            return (t) => {
                this.textContent = textRounder(i(t)) + percentText;
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
    const waveGroupXPosition = fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;
    if (config.waveRise) {
        waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(0) + ')')
            .transition()
            .duration(config.waveRiseTime)
            .attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')')
            .on('start', () => {
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
            .on('end', () => {
            wave.attr('T', 0);
            animateWave(config.waveAnimateTime);
        });
    }
    /**
     * @return {?}
     */
    function GaugeUpdater() {
        this.update = function (val) {
            /** @type {?} */
            const newFinalValue = parseFloat(val).toFixed(2);
            /** @type {?} */
            let textRounderUpdater = function (val2) {
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
            const textTween = () => {
                /** @type {?} */
                const i = d3.interpolate(this.textContent, parseFloat(value).toFixed(2));
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
            const newHeight = waveRiseScale(fillPercent);
            waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
            waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1]);
            /** @type {?} */
            let newClipArea;
            if (config.waveHeightScaling) {
                newClipArea = d3.area()
                    .x((d) => {
                    return waveScaleX(d.x);
                })
                    .y0((d) => {
                    return waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI));
                })
                    .y1((d) => {
                    return (fillCircleRadius * 2 + waveHeight);
                });
            }
            else {
                newClipArea = clipArea;
            }
            /** @type {?} */
            const newWavePosition = config.waveAnimate ? waveAnimateScale(1) : 0;
            wave.transition()
                .duration(0)
                .transition()
                .duration(config.waveAnimate ? (config.waveAnimateTime * (1 - +wave.attr('T'))) : (config.waveRiseTime))
                .ease(d3.easeLinear)
                .attr('d', newClipArea)
                .attr('transform', 'translate(' + newWavePosition + ',0)')
                .attr('T', '1')
                .on('start', () => {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlxdWlkRmlsbEdhdWdlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWxpcXVpZC1nYXVnZS8iLCJzb3VyY2VzIjpbImxpYi9saXF1aWRGaWxsR2F1Z2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQVFBLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDOzs7O0FBU3pCLE1BQU07SUFDSixPQUFPO1FBQ0wsUUFBUSxFQUFFLENBQUM7O1FBQ1gsUUFBUSxFQUFFLEdBQUc7O1FBQ2IsZUFBZSxFQUFFLElBQUk7O1FBQ3JCLGFBQWEsRUFBRSxJQUFJOztRQUNuQixXQUFXLEVBQUUsU0FBUzs7UUFDdEIsVUFBVSxFQUFFLElBQUk7O1FBQ2hCLFNBQVMsRUFBRSxDQUFDOztRQUNaLFlBQVksRUFBRSxJQUFJOztRQUNsQixlQUFlLEVBQUUsS0FBSzs7UUFDdEIsUUFBUSxFQUFFLElBQUk7OztRQUVkLGlCQUFpQixFQUFFLElBQUk7O1FBQ3ZCLFdBQVcsRUFBRSxJQUFJOztRQUNqQixTQUFTLEVBQUUsU0FBUzs7UUFDcEIsVUFBVSxFQUFFLENBQUM7O1FBQ2IsZ0JBQWdCLEVBQUUsRUFBRTs7UUFDcEIsUUFBUSxFQUFFLENBQUM7OztRQUVYLFlBQVksRUFBRSxJQUFJOztRQUNsQixjQUFjLEVBQUUsSUFBSTs7UUFFcEIsU0FBUyxFQUFFLFNBQVM7O1FBQ3BCLGFBQWEsRUFBRSxTQUFTO0tBQ3pCLENBQUM7Q0FDSDs7Ozs7OztBQUVELE1BQU0sOEJBQThCLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTTtJQUMxRCxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7UUFDbEIsTUFBTSxHQUFHLDhCQUE4QixFQUFFLENBQUM7S0FDM0M7O0lBQ0QsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUM7O0lBQ3pDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtB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Q0FBQyxDQUFDOztJQUd2RSxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDOztJQUN0TixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFO1NBQ25CLENBQUMsQ0FBQyxVQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFDO1NBQzdCLENBQUMsQ0FBQyxVQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFDLENBQUM7SUFDbkMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDdEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDL0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDO1NBQ2xDLElBQUksQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDO1NBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7O0lBR3hCLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENB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QUMsWUFBWSxDQUFDLENBQUM7aUJBQ3ZHLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO2lCQUNuQixJQUFJLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQztpQkFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxZQUFZLEdBQUcsZUFBZSxHQUFHLEtBQUssQ0FBQztpQkFDekQsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ2QsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ2hCLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsWUFBWSxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO29CQUNuRSxXQUFXLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUNyQzthQUNGLENBQUMsQ0FBQztZQUNMLFNBQVMsQ0FBQyxVQUFVLEVBQUU7aUJBQ25CLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO2lCQUM3QixJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksR0FBRyxrQkFBa0IsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ2pGLENBQUM7S0FDSDtJQUVELE9BQU8sSUFBSSxZQUFZLEVBQUUsQ0FBQztDQUMzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxyXG4qIE5vdGUgdGhpcyB3YXMgdGFrZW4gZnJvbSBDdXJ0aXMgQnJhdHRvbidzIGNvZGU6IGh0dHA6Ly9ibC5vY2tzLm9yZy9icmF0dG9uYy81ZTVjZTliZWVlNDgzMjIwZTJmNlxyXG4qIEkgdXBncmFkZWQgdGhlIEQzIEFQSSBhbmQgbWFkZSBtaW5vciBtb2RpZmljYXRpb25zIGFsb25nIHRoZSB3YXkgYXMgSSBjb252ZXJ0ZWQgaXQgdG8gVHlwZXNjcmlwdCBmcm9tIEphdmFzY3JpcHQuXHJcbiogQWxsIGNyZWRpdHMgZ28gdG8gQ3VydGlzLlxyXG4qIERheW8gQWRldG95ZS4gMjAxOC4gaHR0cHM6Ly9naXRodWIuY29tL2FkZWRheW9cclxuKi9cclxuXHJcblxyXG5pbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XHJcblxyXG4vKiFcclxuICogQGxpY2Vuc2UgT3BlbiBzb3VyY2UgdW5kZXIgQlNEIDItY2xhdXNlIChodHRwOi8vY2hvb3NlYWxpY2Vuc2UuY29tL2xpY2Vuc2VzL2JzZC0yLWNsYXVzZS8pXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNSwgQ3VydGlzIEJyYXR0b25cclxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogTGlxdWlkIEZpbGwgR2F1Z2UgdjEuMVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxpcXVpZEZpbGxHYXVnZURlZmF1bHRTZXR0aW5ncygpIHtcclxuICByZXR1cm4ge1xyXG4gICAgbWluVmFsdWU6IDAsIC8vIFRoZSBnYXVnZSBtaW5pbXVtIHZhbHVlLlxyXG4gICAgbWF4VmFsdWU6IDEwMCwgLy8gVGhlIGdhdWdlIG1heGltdW0gdmFsdWUuXHJcbiAgICBjaXJjbGVUaGlja25lc3M6IDAuMDUsIC8vIFRoZSBvdXRlciBjaXJjbGUgdGhpY2tuZXNzIGFzIGEgcGVyY2VudGFnZSBvZiBpdCdzIHJhZGl1cy5cclxuICAgIGNpcmNsZUZpbGxHYXA6IDAuMDUsIC8vIFRoZSBzaXplIG9mIHRoZSBnYXAgYmV0d2VlbiB0aGUgb3V0ZXIgY2lyY2xlIGFuZCB3YXZlIGNpcmNsZSBhcyBhIHBlcmNlbnRhZ2Ugb2YgdGhlIG91dGVyIGNpcmNsZXMgcmFkaXVzLlxyXG4gICAgY2lyY2xlQ29sb3I6ICcjMTc4QkNBJywgLy8gVGhlIGNvbG9yIG9mIHRoZSBvdXRlciBjaXJjbGUuXHJcbiAgICB3YXZlSGVpZ2h0OiAwLjA1LCAvLyBUaGUgd2F2ZSBoZWlnaHQgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSByYWRpdXMgb2YgdGhlIHdhdmUgY2lyY2xlLlxyXG4gICAgd2F2ZUNvdW50OiAxLCAvLyBUaGUgbnVtYmVyIG9mIGZ1bGwgd2F2ZXMgcGVyIHdpZHRoIG9mIHRoZSB3YXZlIGNpcmNsZS5cclxuICAgIHdhdmVSaXNlVGltZTogMTAwMCwgLy8gVGhlIGFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlIHdhdmUgdG8gcmlzZSBmcm9tIDAgdG8gaXQncyBmaW5hbCBoZWlnaHQuXHJcbiAgICB3YXZlQW5pbWF0ZVRpbWU6IDE4MDAwLCAvLyBUaGUgYW1vdW50IG9mIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGZvciBhIGZ1bGwgd2F2ZSB0byBlbnRlciB0aGUgd2F2ZSBjaXJjbGUuXHJcbiAgICB3YXZlUmlzZTogdHJ1ZSwgLy8gQ29udHJvbCBpZiB0aGUgd2F2ZSBzaG91bGQgcmlzZSBmcm9tIDAgdG8gaXQncyBmdWxsIGhlaWdodCwgb3Igc3RhcnQgYXQgaXQncyBmdWxsIGhlaWdodC5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAgIHdhdmVIZWlnaHRTY2FsaW5nOiB0cnVlLCAvLyBDb250cm9scyB3YXZlIHNpemUgc2NhbGluZyBhdCBsb3cgYW5kIGhpZ2ggZmlsbCBwZXJjZW50YWdlcy4gV2hlbiB0cnVlLCB3YXZlIGhlaWdodCByZWFjaGVzIGl0J3MgbWF4aW11bSBhdCA1MCUgZmlsbCwgYW5kIG1pbmltdW0gYXQgMCUgYW5kIDEwMCUgZmlsbC4gVGhpcyBoZWxwcyB0byBwcmV2ZW50IHRoZSB3YXZlIGZyb20gbWFraW5nIHRoZSB3YXZlIGNpcmNsZSBmcm9tIGFwcGVhciB0b3RhbGx5IGZ1bGwgb3IgZW1wdHkgd2hlbiBuZWFyIGl0J3MgbWluaW11bSBvciBtYXhpbXVtIGZpbGwuXHJcbiAgICB3YXZlQW5pbWF0ZTogdHJ1ZSwgLy8gQ29udHJvbHMgaWYgdGhlIHdhdmUgc2Nyb2xscyBvciBpcyBzdGF0aWMuXHJcbiAgICB3YXZlQ29sb3I6ICcjMTc4QkNBJywgLy8gVGhlIGNvbG9yIG9mIHRoZSBmaWxsIHdhdmUuXHJcbiAgICB3YXZlT2Zmc2V0OiAwLCAvLyBUaGUgYW1vdW50IHRvIGluaXRpYWxseSBvZmZzZXQgdGhlIHdhdmUuIDAgPSBubyBvZmZzZXQuIDEgPSBvZmZzZXQgb2Ygb25lIGZ1bGwgd2F2ZS5cclxuICAgIHRleHRWZXJ0UG9zaXRpb246IC41LCAvLyBUaGUgaGVpZ2h0IGF0IHdoaWNoIHRvIGRpc3BsYXkgdGhlIHBlcmNlbnRhZ2UgdGV4dCB3aXRoaW5nIHRoZSB3YXZlIGNpcmNsZS4gMCA9IGJvdHRvbSwgMSA9IHRvcC5cclxuICAgIHRleHRTaXplOiAxLCAvLyBUaGUgcmVsYXRpdmUgaGVpZ2h0IG9mIHRoZSB0ZXh0IHRvIGRpc3BsYXkgaW4gdGhlIHdhdmUgY2lyY2xlLiAxID0gNTAlXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICB2YWx1ZUNvdW50VXA6IHRydWUsIC8vIElmIHRydWUsIHRoZSBkaXNwbGF5ZWQgdmFsdWUgY291bnRzIHVwIGZyb20gMCB0byBpdCdzIGZpbmFsIHZhbHVlIHVwb24gbG9hZGluZy4gSWYgZmFsc2UsIHRoZSBmaW5hbCB2YWx1ZSBpcyBkaXNwbGF5ZWQuXHJcbiAgICBkaXNwbGF5UGVyY2VudDogdHJ1ZSwgLy8gSWYgdHJ1ZSwgYSAlIHN5bWJvbCBpcyBkaXNwbGF5ZWQgYWZ0ZXIgdGhlIHZhbHVlLlxyXG5cclxuICAgIHRleHRDb2xvcjogJyMwNDU2ODEnLCAvLyBUaGUgY29sb3Igb2YgdGhlIHZhbHVlIHRleHQgd2hlbiB0aGUgd2F2ZSBkb2VzIG5vdCBvdmVybGFwIGl0LlxyXG4gICAgd2F2ZVRleHRDb2xvcjogJyNBNERCZjgnIC8vIFRoZSBjb2xvciBvZiB0aGUgdmFsdWUgdGV4dCB3aGVuIHRoZSB3YXZlIG92ZXJsYXBzIGl0LlxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkTGlxdWlkRmlsbEdhdWdlKGVsZW1lbnRJZCwgdmFsdWUsIGNvbmZpZykge1xyXG4gIGlmIChjb25maWcgPT0gbnVsbCkge1xyXG4gICAgY29uZmlnID0gbGlxdWlkRmlsbEdhdWdlRGVmYXVsdFNldHRpbmdzKCk7XHJcbiAgfVxyXG4gIGNvbnN0IGdhdWdlID0gZDMuc2VsZWN0KCcjJyArIGVsZW1lbnRJZCk7XHJcbiAgY29uc3QgcmFkaXVzID0gTWF0aC5taW4ocGFyc2VJbnQoZ2F1Z2Uuc3R5bGUoJ3dpZHRoJyksIDEwKSwgcGFyc2VJbnQoZ2F1Z2Uuc3R5bGUoJ2hlaWdodCcpLCAxMCkpIC8gMjtcclxuICBjb25zdCBsb2NhdGlvblggPSBwYXJzZUludChnYXVnZS5zdHlsZSgnd2lkdGgnKSwgMTApIC8gMiAtIHJhZGl1cztcclxuICBjb25zdCBsb2NhdGlvblkgPSBwYXJzZUludChnYXVnZS5zdHlsZSgnaGVpZ2h0JyksIDEwKSAvIDIgLSByYWRpdXM7XHJcbiAgbGV0IGZpbGxQZXJjZW50ID0gTWF0aC5tYXgoY29uZmlnLm1pblZhbHVlLCBNYXRoLm1pbihjb25maWcubWF4VmFsdWUsIHZhbHVlKSkgLyBjb25maWcubWF4VmFsdWU7XHJcblxyXG4gIGxldCB3YXZlSGVpZ2h0U2NhbGU7XHJcbiAgaWYgKGNvbmZpZy53YXZlSGVpZ2h0U2NhbGluZykge1xyXG4gICAgd2F2ZUhlaWdodFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgICAucmFuZ2UoWzAsIGNvbmZpZy53YXZlSGVpZ2h0LCAwXSlcclxuICAgICAgLmRvbWFpbihbMCwgNTAsIDEwMF0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB3YXZlSGVpZ2h0U2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgIC5yYW5nZShbY29uZmlnLndhdmVIZWlnaHQsIGNvbmZpZy53YXZlSGVpZ2h0XSlcclxuICAgICAgLmRvbWFpbihbMCwgMTAwXSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0ZXh0UGl4ZWxzID0gKGNvbmZpZy50ZXh0U2l6ZSAqIHJhZGl1cyAvIDIpO1xyXG4gIGNvbnN0IHRleHRGaW5hbFZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSkudG9GaXhlZCgyKTtcclxuICBjb25zdCB0ZXh0U3RhcnRWYWx1ZSA9IGNvbmZpZy52YWx1ZUNvdW50VXAgPyBjb25maWcubWluVmFsdWUgOiB0ZXh0RmluYWxWYWx1ZTtcclxuICBjb25zdCBwZXJjZW50VGV4dCA9IGNvbmZpZy5kaXNwbGF5UGVyY2VudCA/ICclJyA6ICcnO1xyXG4gIGNvbnN0IGNpcmNsZVRoaWNrbmVzcyA9IGNvbmZpZy5jaXJjbGVUaGlja25lc3MgKiByYWRpdXM7XHJcbiAgY29uc3QgY2lyY2xlRmlsbEdhcCA9IGNvbmZpZy5jaXJjbGVGaWxsR2FwICogcmFkaXVzO1xyXG4gIGNvbnN0IGZpbGxDaXJjbGVNYXJnaW4gPSBjaXJjbGVUaGlja25lc3MgKyBjaXJjbGVGaWxsR2FwO1xyXG4gIGNvbnN0IGZpbGxDaXJjbGVSYWRpdXMgPSByYWRpdXMgLSBmaWxsQ2lyY2xlTWFyZ2luO1xyXG4gIGxldCB3YXZlSGVpZ2h0ID0gZmlsbENpcmNsZVJhZGl1cyAqIHdhdmVIZWlnaHRTY2FsZShmaWxsUGVyY2VudCAqIDEwMCk7XHJcblxyXG4gIGNvbnN0IHdhdmVMZW5ndGggPSBmaWxsQ2lyY2xlUmFkaXVzICogMiAvIGNvbmZpZy53YXZlQ291bnQ7XHJcbiAgY29uc3Qgd2F2ZUNsaXBDb3VudCA9IDEgKyBjb25maWcud2F2ZUNvdW50O1xyXG4gIGNvbnN0IHdhdmVDbGlwV2lkdGggPSB3YXZlTGVuZ3RoICogd2F2ZUNsaXBDb3VudDtcclxuXHJcbiAgLy8gUm91bmRpbmcgZnVuY3Rpb25zIHNvIHRoYXQgdGhlIGNvcnJlY3QgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIGlzIGFsd2F5cyBkaXNwbGF5ZWQgYXMgdGhlIHZhbHVlIGNvdW50cyB1cC5cclxuICBsZXQgdGV4dFJvdW5kZXIgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICByZXR1cm4gJycgKyBNYXRoLnJvdW5kKHZhbCk7XHJcbiAgfTtcclxuICBpZiAocGFyc2VGbG9hdCh0ZXh0RmluYWxWYWx1ZSkgIT09IHBhcnNlRmxvYXQodGV4dFJvdW5kZXIodGV4dEZpbmFsVmFsdWUpKSkge1xyXG4gICAgdGV4dFJvdW5kZXIgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbCkudG9GaXhlZCgxKTtcclxuICAgIH07XHJcbiAgfVxyXG4gIGlmIChwYXJzZUZsb2F0KHRleHRGaW5hbFZhbHVlKSAhPT0gcGFyc2VGbG9hdCh0ZXh0Um91bmRlcih0ZXh0RmluYWxWYWx1ZSkpKSB7XHJcbiAgICB0ZXh0Um91bmRlciA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsKS50b0ZpeGVkKDIpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIERhdGEgZm9yIGJ1aWxkaW5nIHRoZSBjbGlwIHdhdmUgYXJlYS5cclxuICBjb25zdCBkYXRhID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gNDAgKiB3YXZlQ2xpcENvdW50OyBpKyspIHtcclxuICAgIGRhdGEucHVzaCh7XHJcbiAgICAgIHg6IGkgLyAoNDAgKiB3YXZlQ2xpcENvdW50KSxcclxuICAgICAgeTogKGkgLyAoNDApKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBTY2FsZXMgZm9yIGRyYXdpbmcgdGhlIG91dGVyIGNpcmNsZS5cclxuICBjb25zdCBnYXVnZUNpcmNsZVggPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFswLCAyICogTWF0aC5QSV0pLmRvbWFpbihbMCwgMV0pO1xyXG4gIGNvbnN0IGdhdWdlQ2lyY2xlWSA9IGQzLnNjYWxlTGluZWFyKCkucmFuZ2UoWzAsIHJhZGl1c10pLmRvbWFpbihbMCwgcmFkaXVzXSk7XHJcblxyXG4gIC8vIFNjYWxlcyBmb3IgY29udHJvbGxpbmcgdGhlIHNpemUgb2YgdGhlIGNsaXBwaW5nIHBhdGguXHJcbiAgbGV0IHdhdmVTY2FsZVggPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFswLCB3YXZlQ2xpcFdpZHRoXSkuZG9tYWluKFswLCAxXSk7XHJcbiAgbGV0IHdhdmVTY2FsZVkgPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFswLCB3YXZlSGVpZ2h0XSkuZG9tYWluKFswLCAxXSk7XHJcblxyXG4gIC8vIFNjYWxlcyBmb3IgY29udHJvbGxpbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSBjbGlwcGluZyBwYXRoLlxyXG4gIGxldCB3YXZlUmlzZVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgLy8gVGhlIGNsaXBwaW5nIGFyZWEgc2l6ZSBpcyB0aGUgaGVpZ2h0IG9mIHRoZSBmaWxsIGNpcmNsZSArIHRoZSB3YXZlIGhlaWdodCwgc28gd2UgcG9zaXRpb24gdGhlIGNsaXAgd2F2ZVxyXG4gICAgLy8gc3VjaCB0aGF0IHRoZSBpdCB3aWxsIG92ZXJsYXAgdGhlIGZpbGwgY2lyY2xlIGF0IGFsbCB3aGVuIGF0IDAlLCBhbmQgd2lsbCB0b3RhbGx5IGNvdmVyIHRoZSBmaWxsXHJcbiAgICAvLyBjaXJjbGUgYXQgMTAwJS5cclxuICAgIC5yYW5nZShbKGZpbGxDaXJjbGVNYXJnaW4gKyBmaWxsQ2lyY2xlUmFkaXVzICogMiArIHdhdmVIZWlnaHQpLCAoZmlsbENpcmNsZU1hcmdpbiAtIHdhdmVIZWlnaHQpXSlcclxuICAgIC5kb21haW4oWzAsIDFdKTtcclxuICBjb25zdCB3YXZlQW5pbWF0ZVNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgLnJhbmdlKFswLCB3YXZlQ2xpcFdpZHRoIC0gZmlsbENpcmNsZVJhZGl1cyAqIDJdKSAvLyBQdXNoIHRoZSBjbGlwIGFyZWEgb25lIGZ1bGwgd2F2ZSB0aGVuIHNuYXAgYmFjay5cclxuICAgIC5kb21haW4oWzAsIDFdKTtcclxuXHJcbiAgLy8gU2NhbGUgZm9yIGNvbnRyb2xsaW5nIHRoZSBwb3NpdGlvbiBvZiB0aGUgdGV4dCB3aXRoaW4gdGhlIGdhdWdlLlxyXG4gIGNvbnN0IHRleHRSaXNlU2NhbGVZID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gICAgLnJhbmdlKFtmaWxsQ2lyY2xlTWFyZ2luICsgZmlsbENpcmNsZVJhZGl1cyAqIDIsIChmaWxsQ2lyY2xlTWFyZ2luICsgdGV4dFBpeGVscyAqIDAuNyldKVxyXG4gICAgLmRvbWFpbihbMCwgMV0pO1xyXG5cclxuICAvLyBDZW50ZXIgdGhlIGdhdWdlIHdpdGhpbiB0aGUgcGFyZW50IFNWRy5cclxuICBjb25zdCBnYXVnZUdyb3VwID0gZ2F1Z2UuYXBwZW5kKCdnJylcclxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBsb2NhdGlvblggKyAnLCcgKyBsb2NhdGlvblkgKyAnKScpO1xyXG5cclxuICAvLyBEcmF3IHRoZSBvdXRlciBSZWN0YW5nbGUuXHJcbiAgdmFyIHJlY3Rwb2ludHMgPSBbe3g6IDAsIHk6IDB9LCB7eDogMCwgeTogcGFyc2VJbnQoZ2F1Z2Uuc3R5bGUoJ2hlaWdodCcpKX0sIHt4OiBwYXJzZUludChnYXVnZS5zdHlsZSgnd2lkdGgnKSwgMTApLCB5OiBwYXJzZUludChnYXVnZS5zdHlsZSgnaGVpZ2h0JykpfSwge3g6IHBhcnNlSW50KGdhdWdlLnN0eWxlKCd3aWR0aCcpLCAxMCksIHk6IDB9LCB7eDogMCwgeTogMH1dO1xyXG4gIHZhciBsaW5lRnVuYyA9IGQzLmxpbmUoKVxyXG4gICAgICAueChmdW5jdGlvbihkKSB7IHJldHVybiBkLnggfSlcclxuICAgICAgLnkoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC55IH0pO1xyXG4gIGdhdWdlR3JvdXAuYXBwZW5kKCdwYXRoJylcclxuICAgIC5hdHRyKCdkJywgbGluZUZ1bmMocmVjdHBvaW50cykpXHJcbiAgICAuYXR0cignc3Ryb2tlJywgY29uZmlnLmNpcmNsZUNvbG9yKVxyXG4gICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIGNpcmNsZVRoaWNrbmVzcylcclxuICAgIC5hdHRyKCdmaWxsJywgJ25vbmUnKTtcclxuXHJcbiAgLy8gVGV4dCB3aGVyZSB0aGUgd2F2ZSBkb2VzIG5vdCBvdmVybGFwLlxyXG4gIGNvbnN0IHRleHQxID0gZ2F1Z2VHcm91cC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgLnRleHQodGV4dFJvdW5kZXIodGV4dFN0YXJ0VmFsdWUpICsgcGVyY2VudFRleHQpXHJcbiAgICAuYXR0cignY2xhc3MnLCAnbGlxdWlkRmlsbEdhdWdlVGV4dCcpXHJcbiAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcclxuICAgIC5hdHRyKCdmb250LXNpemUnLCB0ZXh0UGl4ZWxzICsgJ3B4JylcclxuICAgIC5zdHlsZSgnZmlsbCcsIGNvbmZpZy50ZXh0Q29sb3IpXHJcbiAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgcmFkaXVzICsgJywnICsgdGV4dFJpc2VTY2FsZVkoY29uZmlnLnRleHRWZXJ0UG9zaXRpb24pICsgJyknKTtcclxuXHJcbiAgLy8gVGhlIGNsaXBwaW5nIHdhdmUgYXJlYS5cclxuICBjb25zdCBjbGlwQXJlYSA9IGQzLmFyZWEoKVxyXG4gICAgLngoZnVuY3Rpb24gKGQ6IGFueSkge1xyXG4gICAgICByZXR1cm4gd2F2ZVNjYWxlWChkLngpO1xyXG4gICAgfSlcclxuICAgIC55MChmdW5jdGlvbiAoZDogYW55KSB7XHJcbiAgICAgIHJldHVybiB3YXZlU2NhbGVZKE1hdGguc2luKE1hdGguUEkgKiAyICogY29uZmlnLndhdmVPZmZzZXQgKiAtMSArIE1hdGguUEkgKiAyICogKDEgLSBjb25maWcud2F2ZUNvdW50KSArIGQueSAqIDIgKiBNYXRoLlBJKSk7XHJcbiAgICB9KVxyXG4gICAgLnkxKGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgIHJldHVybiAoZmlsbENpcmNsZVJhZGl1cyAqIDIgKyB3YXZlSGVpZ2h0KTtcclxuICAgIH0pO1xyXG4gIGNvbnN0IHdhdmVHcm91cCA9IGdhdWdlR3JvdXAuYXBwZW5kKCdkZWZzJylcclxuICAgIC5hcHBlbmQoJ2NsaXBQYXRoJylcclxuICAgIC5hdHRyKCdpZCcsICdjbGlwV2F2ZScgKyBlbGVtZW50SWQpO1xyXG4gIGNvbnN0IHdhdmUgPSB3YXZlR3JvdXAuYXBwZW5kKCdwYXRoJylcclxuICAgIC5kYXR1bShkYXRhKVxyXG4gICAgLmF0dHIoJ2QnLCBjbGlwQXJlYSlcclxuICAgIC5hdHRyKCdUJywgMCk7XHJcblxyXG4gIC8vIFRoZSBpbm5lciBjaXJjbGUgd2l0aCB0aGUgY2xpcHBpbmcgd2F2ZSBhdHRhY2hlZC5cclxuICBjb25zdCBmaWxsQ2lyY2xlR3JvdXAgPSBnYXVnZUdyb3VwLmFwcGVuZCgnZycpXHJcbiAgICAuYXR0cignY2xpcC1wYXRoJywgJ3VybCgjY2xpcFdhdmUnICsgZWxlbWVudElkICsgJyknKTtcclxuICBmaWxsQ2lyY2xlR3JvdXAuYXBwZW5kKCdyZWN0JylcclxuICAgICAgICAuYXR0cigneCcsIChyYWRpdXMpIC0gZmlsbENpcmNsZVJhZGl1cylcclxuICAgICAgICAuYXR0cigneScsIHJhZGl1cyAtIGZpbGxDaXJjbGVSYWRpdXMpXHJcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgZmlsbENpcmNsZVJhZGl1cyoyKVxyXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBmaWxsQ2lyY2xlUmFkaXVzKjIpXHJcbiAgICAgICAgLnN0eWxlKCdmaWxsJywgY29uZmlnLndhdmVDb2xvcik7XHJcblxyXG4gIC8vIFRleHQgd2hlcmUgdGhlIHdhdmUgZG9lcyBvdmVybGFwLlxyXG4gIGNvbnN0IHRleHQyID0gZmlsbENpcmNsZUdyb3VwLmFwcGVuZCgndGV4dCcpXHJcbiAgICAudGV4dCh0ZXh0Um91bmRlcih0ZXh0U3RhcnRWYWx1ZSkgKyBwZXJjZW50VGV4dClcclxuICAgIC5hdHRyKCdjbGFzcycsICdsaXF1aWRGaWxsR2F1Z2VUZXh0JylcclxuICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxyXG4gICAgLmF0dHIoJ2ZvbnQtc2l6ZScsIHRleHRQaXhlbHMgKyAncHgnKVxyXG4gICAgLnN0eWxlKCdmaWxsJywgY29uZmlnLndhdmVUZXh0Q29sb3IpXHJcbiAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgcmFkaXVzICsgJywnICsgdGV4dFJpc2VTY2FsZVkoY29uZmlnLnRleHRWZXJ0UG9zaXRpb24pICsgJyknKTtcclxuXHJcbiAgLy8gTWFrZSB0aGUgdmFsdWUgY291bnQgdXAuXHJcbiAgaWYgKGNvbmZpZy52YWx1ZUNvdW50VXApIHtcclxuICAgIGNvbnN0IHRleHRUd2VlbiA9IGZ1bmN0aW9uIGcoKSB7XHJcbiAgICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZSh0aGlzLnRleHRDb250ZW50LCB0ZXh0RmluYWxWYWx1ZSk7XHJcbiAgICAgIHJldHVybiAodCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSB0ZXh0Um91bmRlcihpKHQpKSArIHBlcmNlbnRUZXh0O1xyXG4gICAgICB9O1xyXG4gICAgfTtcclxuICAgIHRleHQxLnRyYW5zaXRpb24oKVxyXG4gICAgICAuZHVyYXRpb24oY29uZmlnLndhdmVSaXNlVGltZSlcclxuICAgICAgLnR3ZWVuKCd0ZXh0JywgdGV4dFR3ZWVuKTtcclxuICAgIHRleHQyLnRyYW5zaXRpb24oKVxyXG4gICAgICAuZHVyYXRpb24oY29uZmlnLndhdmVSaXNlVGltZSlcclxuICAgICAgLnR3ZWVuKCd0ZXh0JywgdGV4dFR3ZWVuKTtcclxuICB9XHJcblxyXG4gIC8vIE1ha2UgdGhlIHdhdmUgcmlzZS4gd2F2ZSBhbmQgd2F2ZUdyb3VwIGFyZSBzZXBhcmF0ZSBzbyB0aGF0IGhvcml6b250YWwgYW5kIHZlcnRpY2FsIG1vdmVtZW50IGNhbiBiZSBjb250cm9sbGVkIGluZGVwZW5kZW50bHkuXHJcbiAgY29uc3Qgd2F2ZUdyb3VwWFBvc2l0aW9uID0gZmlsbENpcmNsZU1hcmdpbiArIGZpbGxDaXJjbGVSYWRpdXMgKiAyIC0gd2F2ZUNsaXBXaWR0aDtcclxuICBpZiAoY29uZmlnLndhdmVSaXNlKSB7XHJcblxyXG4gICAgd2F2ZUdyb3VwLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHdhdmVHcm91cFhQb3NpdGlvbiArICcsJyArIHdhdmVSaXNlU2NhbGUoMCkgKyAnKScpXHJcbiAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgLmR1cmF0aW9uKGNvbmZpZy53YXZlUmlzZVRpbWUpXHJcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB3YXZlR3JvdXBYUG9zaXRpb24gKyAnLCcgKyB3YXZlUmlzZVNjYWxlKGZpbGxQZXJjZW50KSArICcpJylcclxuICAgICAgLm9uKCdzdGFydCcsICgpID0+IHtcclxuICAgICAgICB3YXZlLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMSwwKScpO1xyXG4gICAgICB9KTsgLy8gVGhpcyB0cmFuc2Zvcm0gaXMgbmVjZXNzYXJ5IHRvIGdldCB0aGUgY2xpcCB3YXZlIHBvc2l0aW9uZWQgY29ycmVjdGx5IHdoZW4gd2F2ZVJpc2U9dHJ1ZSBhbmRcclxuICAgIC8vIHdhdmVBbmltYXRlPWZhbHNlLiBUaGUgd2F2ZSB3aWxsIG5vdCBwb3NpdGlvbiBjb3JyZWN0bHkgd2l0aG91dCB0aGlzLCBidXQgaXQncyBub3QgY2xlYXIgd2h5IHRoaXMgaXMgYWN0dWFsbHkgbmVjZXNzYXJ5LlxyXG4gIH0gZWxzZSB7XHJcbiAgICB3YXZlR3JvdXAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgd2F2ZUdyb3VwWFBvc2l0aW9uICsgJywnICsgd2F2ZVJpc2VTY2FsZShmaWxsUGVyY2VudCkgKyAnKScpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGNvbmZpZy53YXZlQW5pbWF0ZSkge1xyXG4gICAgYW5pbWF0ZVdhdmUoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFuaW1hdGVXYXZlKF8/OiBhbnkpIHtcclxuICAgIHdhdmUuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgd2F2ZUFuaW1hdGVTY2FsZSgrd2F2ZS5hdHRyKCdUJykpICsgJywwKScpO1xyXG4gICAgd2F2ZS50cmFuc2l0aW9uKClcclxuICAgICAgLmR1cmF0aW9uKGNvbmZpZy53YXZlQW5pbWF0ZVRpbWUgKiAoMSAtICt3YXZlLmF0dHIoJ1QnKSkpXHJcbiAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpXHJcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB3YXZlQW5pbWF0ZVNjYWxlKDEpICsgJywwKScpXHJcbiAgICAgIC5hdHRyKCdUJywgMSlcclxuICAgICAgLm9uKCdlbmQnLCAoKSA9PiB7XHJcbiAgICAgICAgd2F2ZS5hdHRyKCdUJywgMCk7XHJcbiAgICAgICAgYW5pbWF0ZVdhdmUoY29uZmlnLndhdmVBbmltYXRlVGltZSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gR2F1Z2VVcGRhdGVyKCkge1xyXG4gICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgIGNvbnN0IG5ld0ZpbmFsVmFsdWUgPSBwYXJzZUZsb2F0KHZhbCkudG9GaXhlZCgyKTtcclxuICAgICAgbGV0IHRleHRSb3VuZGVyVXBkYXRlciA9IGZ1bmN0aW9uICh2YWwyKSB7XHJcbiAgICAgICAgcmV0dXJuICcnICsgTWF0aC5yb3VuZCh2YWwyKTtcclxuICAgICAgfTtcclxuICAgICAgaWYgKHBhcnNlRmxvYXQobmV3RmluYWxWYWx1ZSkgIT09IHBhcnNlRmxvYXQodGV4dFJvdW5kZXJVcGRhdGVyKG5ld0ZpbmFsVmFsdWUpKSkge1xyXG4gICAgICAgIHRleHRSb3VuZGVyVXBkYXRlciA9IGZ1bmN0aW9uICh2YWwyKSB7XHJcbiAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWwyKS50b0ZpeGVkKDEpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHBhcnNlRmxvYXQobmV3RmluYWxWYWx1ZSkgIT09IHBhcnNlRmxvYXQodGV4dFJvdW5kZXJVcGRhdGVyKG5ld0ZpbmFsVmFsdWUpKSkge1xyXG4gICAgICAgIHRleHRSb3VuZGVyVXBkYXRlciA9IGZ1bmN0aW9uICh2YWwyKSB7XHJcbiAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWwyKS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHRleHRUd2VlbiA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUodGhpcy50ZXh0Q29udGVudCwgcGFyc2VGbG9hdCh2YWx1ZSkudG9GaXhlZCgyKSk7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gdGV4dFJvdW5kZXJVcGRhdGVyKGkodCkpICsgcGVyY2VudFRleHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRleHQxLnRyYW5zaXRpb24oKVxyXG4gICAgICAgIC5kdXJhdGlvbihjb25maWcud2F2ZVJpc2VUaW1lKVxyXG4gICAgICAgIC50d2VlbigndGV4dCcsIHRleHRUd2Vlbik7XHJcbiAgICAgIHRleHQyLnRyYW5zaXRpb24oKVxyXG4gICAgICAgIC5kdXJhdGlvbihjb25maWcud2F2ZVJpc2VUaW1lKVxyXG4gICAgICAgIC50d2VlbigndGV4dCcsIHRleHRUd2Vlbik7XHJcblxyXG4gICAgICBmaWxsUGVyY2VudCA9IE1hdGgubWF4KGNvbmZpZy5taW5WYWx1ZSwgTWF0aC5taW4oY29uZmlnLm1heFZhbHVlLCB2YWx1ZSkpIC8gY29uZmlnLm1heFZhbHVlO1xyXG4gICAgICB3YXZlSGVpZ2h0ID0gZmlsbENpcmNsZVJhZGl1cyAqIHdhdmVIZWlnaHRTY2FsZShmaWxsUGVyY2VudCAqIDEwMCk7XHJcbiAgICAgIHdhdmVSaXNlU2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXHJcbiAgICAgICAgLy8gVGhlIGNsaXBwaW5nIGFyZWEgc2l6ZSBpcyB0aGUgaGVpZ2h0IG9mIHRoZSBmaWxsIGNpcmNsZSArIHRoZSB3YXZlIGhlaWdodCwgc28gd2UgcG9zaXRpb24gdGhlIGNsaXAgd2F2ZVxyXG4gICAgICAgIC8vIHN1Y2ggdGhhdCB0aGUgaXQgd2lsbCBvdmVybGFwIHRoZSBmaWxsIGNpcmNsZSBhdCBhbGwgd2hlbiBhdCAwJSwgYW5kIHdpbGwgdG90YWxseSBjb3ZlciB0aGUgZmlsbFxyXG4gICAgICAgIC8vIGNpcmNsZSBhdCAxMDAlLlxyXG4gICAgICAgIC5yYW5nZShbKGZpbGxDaXJjbGVNYXJnaW4gKyBmaWxsQ2lyY2xlUmFkaXVzICogMiArIHdhdmVIZWlnaHQpLCAoZmlsbENpcmNsZU1hcmdpbiAtIHdhdmVIZWlnaHQpXSlcclxuICAgICAgICAuZG9tYWluKFswLCAxXSk7XHJcbiAgICAgIGNvbnN0IG5ld0hlaWdodCA9IHdhdmVSaXNlU2NhbGUoZmlsbFBlcmNlbnQpO1xyXG4gICAgICB3YXZlU2NhbGVYID0gZDMuc2NhbGVMaW5lYXIoKS5yYW5nZShbMCwgd2F2ZUNsaXBXaWR0aF0pLmRvbWFpbihbMCwgMV0pO1xyXG4gICAgICB3YXZlU2NhbGVZID0gZDMuc2NhbGVMaW5lYXIoKS5yYW5nZShbMCwgd2F2ZUhlaWdodF0pLmRvbWFpbihbMCwgMV0pO1xyXG4gICAgICBsZXQgbmV3Q2xpcEFyZWE7XHJcbiAgICAgIGlmIChjb25maWcud2F2ZUhlaWdodFNjYWxpbmcpIHtcclxuICAgICAgICBuZXdDbGlwQXJlYSA9IGQzLmFyZWEoKVxyXG4gICAgICAgICAgLngoKGQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gd2F2ZVNjYWxlWChkLngpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC55MCgoZDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB3YXZlU2NhbGVZKE1hdGguc2luKE1hdGguUEkgKiAyICogY29uZmlnLndhdmVPZmZzZXQgKiAtMSArIE1hdGguUEkgKiAyICogKDEgLSBjb25maWcud2F2ZUNvdW50KSArIGQueSAqIDIgKiBNYXRoLlBJKSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnkxKChkKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmlsbENpcmNsZVJhZGl1cyAqIDIgKyB3YXZlSGVpZ2h0KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5ld0NsaXBBcmVhID0gY2xpcEFyZWE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG5ld1dhdmVQb3NpdGlvbiA9IGNvbmZpZy53YXZlQW5pbWF0ZSA/IHdhdmVBbmltYXRlU2NhbGUoMSkgOiAwO1xyXG4gICAgICB3YXZlLnRyYW5zaXRpb24oKVxyXG4gICAgICAgIC5kdXJhdGlvbigwKVxyXG4gICAgICAgIC50cmFuc2l0aW9uKClcclxuICAgICAgICAuZHVyYXRpb24oY29uZmlnLndhdmVBbmltYXRlID8gKGNvbmZpZy53YXZlQW5pbWF0ZVRpbWUgKiAoMSAtICt3YXZlLmF0dHIoJ1QnKSkpIDogKGNvbmZpZy53YXZlUmlzZVRpbWUpKVxyXG4gICAgICAgIC5lYXNlKGQzLmVhc2VMaW5lYXIpXHJcbiAgICAgICAgLmF0dHIoJ2QnLCBuZXdDbGlwQXJlYSlcclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgbmV3V2F2ZVBvc2l0aW9uICsgJywwKScpXHJcbiAgICAgICAgLmF0dHIoJ1QnLCAnMScpXHJcbiAgICAgICAgLm9uKCdzdGFydCcsICgpID0+IHtcclxuICAgICAgICAgIGlmIChjb25maWcud2F2ZUFuaW1hdGUpIHtcclxuICAgICAgICAgICAgd2F2ZS5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB3YXZlQW5pbWF0ZVNjYWxlKDApICsgJywwKScpO1xyXG4gICAgICAgICAgICBhbmltYXRlV2F2ZShjb25maWcud2F2ZUFuaW1hdGVUaW1lKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgd2F2ZUdyb3VwLnRyYW5zaXRpb24oKVxyXG4gICAgICAgIC5kdXJhdGlvbihjb25maWcud2F2ZVJpc2VUaW1lKVxyXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB3YXZlR3JvdXBYUG9zaXRpb24gKyAnLCcgKyBuZXdIZWlnaHQgKyAnKScpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiBuZXcgR2F1Z2VVcGRhdGVyKCk7XHJcbn1cclxuIl19