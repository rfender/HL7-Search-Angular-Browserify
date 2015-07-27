'use strict';

/**
 * This directive takes the data from the patient renderModel
 * and uses it to render some visualizations using HighCharts.
 */

exports.inject = function(app) {
	app.directive('patientVis', exports.directive);
	return exports.directive;
};

exports.directive = function($compile) {
	return {
		restrict: 'E',
    scope: '@', // just grab the parent scope (one-way binding)
    templateUrl: '../views/patientVis.html',
    compile: function(element, attributes) {

    	/**
    	 * Take just the integer out of the value string
    	 */
    	var stripValue = function(str) {
    		return str ? parseInt(str.substring(str.lastIndexOf(":")+1,str.lastIndexOf(" ")), 10) : 0;
    	}

    	var gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the axis with the values
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 200,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    	};

    	return {
    		pre: function(scope, element) {
    			var value = stripValue(scope.record.cholesterol);

    			$(element).highcharts(Highcharts.merge(gaugeOptions, {
		        yAxis: {
		            min: 0,
		            max: 400,
		            title: {
		                text: 'Overall Health'
		            }
		        },

		        credits: {
		            enabled: false
		        },

		        series: [{
		            name: 'Health',
		            data: [value],
		            dataLabels: {
		                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
		                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
		                       '<span style="font-size:12px;color:silver"></span></div>'
		            },
		            tooltip: {
		                valueSuffix: ' '
		            }
		        }]

		    	}));
    		},
    		post: function(scope, element) {
    			// no need to do anything here. Just using pre as the 'link'
    		}
    	}
    }
	}
};