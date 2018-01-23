/**
 * Created by Y.Kamesh on 4/13/2015.
 */

angular.module('App.Admin')
    .controller('MeusJogosController', ['$scope', 'jogoFactory', '$rootScope', '$location', 'AuthService','$http','$interval', MeusJogosController])
function MeusJogosController($scope, jogoFactory, $rootScope, $location, AuthService,localStorageService,toastr, $http, $interval) {
    var evm = this;				
	evm.combo = {};

	$scope.myFilter = function (item) { 
		return item.status === 'ACONFIRMAR'; 
	};

	$scope.myFilter2 = function (item) { 
		return item.status === 'CONFIRMADO'; 
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

	

	var oUser = $rootScope.globals.currentUser;
	var fnCallback = function(oResp)
	{
		debugger 
		var odata = [];
		var oGols = [];
		var oNota = [];
		console.log(oResp);
		$scope.jogos = oResp;
		for(var x = 0;x < oResp.length;x++)
		{
			var pJogo = oResp[x];
			for(var y = 0;y < pJogo.jogos.length;y++)
			{
				var oJogoData = pJogo.jogos[y]; 
				odata.push(moment(oJogoData.data).format("DD/MM/YY") );
				oNota.push(oJogoData.nota ? parseInt(oJogoData.nota,10) : 0);
				oGols.push(oJogoData.qntGols ? oJogoData.qntGols : 0);
			}

		}
	//	evm.combo.options = {};
		evm.combo.options = {
			tooltip : {
				trigger: 'axis'
			},
			toolbox: {
				show : true,
				feature : {
				//	dataView : {show: true, readOnly: false, title: "data",  lang:['Data View', 'close', 'refresh']},
					magicType: {show: true, type: ['line', 'bar'], title: { line : 'line', bar : 'bar'}},
					restore : {show: true, title: "restore"},
				//	saveAsImage : {show: true, title: "save as image"}
				}
			},
			calculable : true,
			legend: {
				data:['Gols', 'Nota']
			},
			xAxis : [
				{
					type : 'category',
					data : odata//['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
				}
			],
			yAxis : [
				{
					type : 'value',
					name : 'Quantidade',
					axisLabel : {
						formatter: '{value}'
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
					name:'Gols',
					type:'bar',
					data:oGols
				},
				{
					name:'Nota',
					type:'bar',
					data:oNota
				}
			/*	,
				{
					name:'Average Temperature',
					type:'line',
					yAxisIndex: 1,
					data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
				} */
			]
		};

	}
	AuthService.fetchJogosByUserId(oUser, fnCallback);

	$scope.gravarHorario = function(oJogo, sStatus)
    {
        jogoFactory.updateJogoPorData(oJogo, sStatus, function(oResp){
			AuthService.fetchJogosByUserId(oUser, fnCallback)
		});
    }
};
