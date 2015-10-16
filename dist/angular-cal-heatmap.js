/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015, Hugo Freire <hfreire@exec.sh>.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';
angular.module('calHeatmap', [])

  .directive('calHeatmap', function () {

    function link(scope, el, attrs) {
      var element = el[0];

      var config = {};

      if (attrs.domain) {
        config.domain = attrs.domain;
      }

      if (attrs.subDomain) {
        config.subDomain = attrs.subDomain;
      }

      if (attrs.range) {
        config.range = parseInt(attrs.range);
      }

      if (attrs.cellSize) {
        config.cellSize = parseInt(attrs.cellSize);
      }

      if (attrs.calHeatmapTooltip) {
        config.tooltip = attrs.calHeatmapTooltip == 'true';
      }

      if (attrs.domainDynamicDimension) {
        config.domainDynamicDimension = attrs.domainDynamicDimension;
      }

      if (attrs.domainGutter) {
        config.domainGutter = parseInt(attrs.domainGutter);
      }

      if (attrs.displayLegend) {
        config.displayLegend = attrs.displayLegend == 'true';
      }

      if (attrs.legend) {
        config.legend = JSON.parse(attrs.legend);
      }

      if (attrs.itemName) {
        config.itemName = attrs.itemName;
      }

      if (attrs.subDomainTextFormat) {
        config.subDomainTextFormat = attrs.subDomainTextFormat;
      }

      if (attrs.start) {
        config.start = new Date(attrs.start);
      }

      if (attrs.minDate) {
        config.minDate = new Date(attrs.minDate);
      }

      if (attrs.maxDate) {
        config.maxDate = new Date(attrs.maxDate);
      }

      if (attrs.considerMissingDataAsZero) {
        config.considerMissingDataAsZero = attrs.considerMissingDataAsZero == 'true';
      }

      if (attrs.animationDuration) {
        config.animationDuration = parseInt(attrs.animationDuration);
      }

      if (attrs.itemNamespace) {
        config.itemNamespace = attrs.itemNamespace;
      }

      if (attrs.nextSelector) {
        config.nextSelector = attrs.nextSelector;
      }

      if (attrs.previousSelector) {
        config.previousSelector = attrs.previousSelector;
      }

      if (attrs.onClick) {
        config.onClick = function (date, value) {
          scope.onClick({
            date: date,
            value: value
          });
        };
      }

      if (attrs.afterLoad) {
        config.afterLoad = scope.afterLoad;
      }

      if (attrs.afterLoadNextDomain) {
        config.afterLoadNextDomain = function (date) {
          scope.afterLoadNextDomain({
            date: date
          });
        };
      }

      if (attrs.afterLoadPreviousDomain) {
        config.afterLoadPreviousDomain = function (date) {
          scope.afterLoadPreviousDomain({
            date: date
          });
        };
      }

      if (attrs.onComplete) {
        config.onComplete = scope.onComplete;
      }

      if (attrs.afterLoadData) {
        config.afterLoadData = function (data) {
          return scope.afterLoadData({
            data: data
          });
        };
      }

      if (attrs.onMinDomainReached) {
        config.onMinDomainReached = function (reached) {
          scope.onMinDomainReached({
            reached: reached
          });
        };
      }

      if (attrs.onMaxDomainReached) {
        config.onMaxDomainReached = function (reached) {
          scope.onMaxDomainReached({
            reached: reached
          });
        };
      }

      var defaultConfig = {
        itemSelector: element
      };
      config = angular.extend(defaultConfig, config);

      var cal = new CalHeatMap();
      cal.init(config);

      scope.$watch('data', function (data) {
        cal.update(data);
        cal.options.data = data;
      });

      scope.$watch('highlight', function (dates) {
        var _dates = [];
        angular.forEach(dates, function(date) {
          _dates.push(new Date(date));
        });
        cal.highlight(_dates);
      });
    }

    return {
      template: '<div class="cal-heatmap" 9config="config"></div>',
      restrict: 'E',
      link: link,
      scope: {

        // Presentation
        domain: '@',
        subDomain: '@',
        range: '@',
        cellSize: '@',
        calHeatmapTooltip: '@',
        domainDynamicDimension: '@',
        domainGutter: '@',

        // Legend
        displayLegend: '@',
        legend: '@',

        // i18n
        itemName: '@',
        subDomainTextFormat: '@',

        // Data
        data: '=',
        start: '@',
        minDate: '@',
        maxDate: '@',
        considerMissingDataAsZero: '@',
        highlight: '=',

        // Other
        animationDuration: '@',
        itemNamespace: '@',
        nextSelector: '@',
        previousSelector: '@',

        // Events
        onClick: '&',
        afterLoad: '&',
        afterLoadNextDomain: '&',
        afterLoadPreviousDomain: '&',
        onComplete: '&',
        afterLoadData: '&',
        onMinDomainReached: '&',
        onMaxDomainReached: '&'
      }
    };
  }
)
;
