/**
 * Created by Y.Kamesh on 4/13/2015.
 */

angular.module('App.Admin')
    .controller('MeusJogosController', ['$scope', '$rootScope', '$location', 'AuthService','$http','$interval', MeusJogosController])
function MeusJogosController($scope, $rootScope, $location, AuthService,localStorageService,toastr, $http, $interval) {
    var evm = this;				
	evm.combo = {};
			
	evm.combo.options = {
		tooltip : {
			trigger: 'axis'
		},
		toolbox: {
			show : true,
			feature : {
				dataView : {show: true, readOnly: false, title: "data",  lang:['Data View', 'close', 'refresh']},
				magicType: {show: true, type: ['line', 'bar'], title: { line : 'line', bar : 'bar'}},
				restore : {show: true, title: "restore"},
				saveAsImage : {show: true, title: "save as image"}
			}
		},
		calculable : true,
		legend: {
			data:['Evaporation', 'Precipitation', 'Average Temperature']
		},
		xAxis : [
			{
				type : 'category',
				data : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			}
		],
		yAxis : [
			{
				type : 'value',
				name : 'Water Volume',
				axisLabel : {
					formatter: '{value} ml'
				}
			},
			{
				type : 'value',
				name : 'Temperature',
				axisLabel : {
					formatter: '{value} °C'
				}
			}
		],
		series : [

			{
				name:'Evaporation',
				type:'bar',
				data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
			},
			{
				name:'Precipitation',
				type:'bar',
				data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
			},
			{
				name:'Average Temperature',
				type:'line',
				yAxisIndex: 1,
				data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
			}
		]
	};
	
	//===============================================================//
	$scope.oneAtATime = true;
	$scope.groups = [
		{
			title: "Dynamic Group Header - 1",
			content: "Dynamic Group Body - 1"
		}, {
			title: "Dynamic Group Header - 2",
			content: "Dynamic Group Body - 2"
		}, {
			title: "Dynamic Group Header - 3",
			content: "Dynamic Group Body - 3"
		}
	];
	$scope.items = ["Item 1", "Item 2", "Item 3"];

	$scope.status = {
		isFirstOpen: true,
		isFirstOpen1: true,
		isFirstOpen2: true,
		isFirstOpen3: true,
		isFirstOpen4: true,
		isFirstOpen5: true,
		isFirstOpen6: true
	};
	$scope.addItem = function() {
		var newItemNo;
		newItemNo = $scope.items.length + 1;
		$scope.items.push("Item " + newItemNo);
	};

};
