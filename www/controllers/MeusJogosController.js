/**
 * Created by Y.Kamesh on 4/13/2015.
 */

angular.module('App.Admin')
	.controller('MeusJogosController', ['$scope', 'jogoFactory', '$rootScope', '$location', 'AuthService', '$http', '$interval', MeusJogosController])

function MeusJogosController($scope, jogoFactory, $rootScope, $location, AuthService, localStorageService, toastr, $http, $interval) {
	var evm = this;
	evm.combo = {};
	$scope.bUserJogoConfirm = false;
	$scope.bUserJogoAprovar = false;
	$scope.bUserJogoJogado = false;
	$scope.iQuantGols = 0;
	$scope.fMedia = 0;


	$scope.myFilter = function (item) {
		var globals = JSON.parse(localStorage.getItem('globals'));
    	var oUser = globals.currentUser;
		return ((item.status === 'ACONFIRMAR') && (item.data > ((new Date).getDate())) && (oUser.id === item.user_id));
	};

	$scope.myFilterUserJogo = function (item) {
		var globals = JSON.parse(localStorage.getItem('globals'));
    	var oUser = globals.currentUser;
		return ((item.status_user === 'SOLICITADO'));
	};

	$scope.myFilter2 = function (item) {

		return (item.status === 'CONFIRMADO' || item.status === 'NAOVO');
	};

	$scope.fnNameJogadorAprovar = function (item,jogoData) {

		var sName = "";

		for(var x = 0; x< item.usersJogo.length;x++)
		{
			if(jogoData.user_id === item.usersJogo[x].id)
			{
				sName = item.usersJogo[x].name +" "+ item.usersJogo[x].lastName + "(" + item.usersJogo[x].email + ")";
			}
		}
		
		return sName;
	};

	$scope.fnConfirm = function (usuariosConfirm, usuariosJogo) {
		var iReturn = 1;
		
		if (usuariosConfirm && usuariosConfirm.usersJogo2) {
			for (var x = 0; x < usuariosConfirm.usersJogo2.length;x++) {
				var jogos = usuariosConfirm.usersJogo2[x];
				if(jogos.user_id === usuariosJogo.id){
					if (jogos.status_user === "CONFIRMADO") {
						iReturn = 3;
						break
					} else if (jogos.status_user === "NAOVO") {
						iReturn = 2;
						break
					}
		
				}
			}
		}
		
		return iReturn;
	}

	//===============================================================//
	$scope.oneAtATime = true;
	$scope.groups = [{
		title: "Dynamic Group Header - 1",
		content: "Dynamic Group Body - 1"
	}, {
		title: "Dynamic Group Header - 2",
		content: "Dynamic Group Body - 2"
	}, {
		title: "Dynamic Group Header - 3",
		content: "Dynamic Group Body - 3"
	}];
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
	$scope.addItem = function () {
		var newItemNo;
		newItemNo = $scope.items.length + 1;
		$scope.items.push("Item " + newItemNo);
	};


	var fnCallback = function (oResp) {

		var odata = [];
		var oGols = [];
		var oNota = [];
		console.log(oResp);
		$scope.jogos = oResp;
		for (var x = 0; x < oResp.length; x++) {
			var pJogo = oResp[x];
			$scope.bUserJogoConfirm = pJogo.usersJogo.length > 0 ? true : false;
			$scope.bUserJogoAprovar = pJogo.usersJogo2.length > 0 ? true : false;
			$scope.bUserJogoJogado = pJogo.jogos.length > 0 ? true : false;
			for (var y = 0; y < pJogo.jogos.length; y++) {
				var oJogoData = pJogo.jogos[y];
				odata.push(moment(oJogoData.data).format("DD/MM/YY"));
				oNota.push(oJogoData.nota ? parseInt(oJogoData.nota, 10) : 0);
				oGols.push(oJogoData.qntGols ? oJogoData.qntGols : 0);
				$scope.iQuantGols = $scope.iQuantGols + oJogoData.qntGols;
				$scope.fMedia = $scope.fMedia + oJogoData.nota;
			}

		}
		//	evm.combo.options = {};
		evm.combo.options = {
			tooltip: {
				trigger: 'axis'
			},
			toolbox: {
				show: true,
				feature: {
					//	dataView : {show: true, readOnly: false, title: "data",  lang:['Data View', 'close', 'refresh']},
					magicType: {
						show: true,
						type: ['line', 'bar'],
						title: {
							line: 'line',
							bar: 'bar'
						}
					},
					restore: {
						show: true,
						title: "restore"
					},
					//	saveAsImage : {show: true, title: "save as image"}
				}
			},
			calculable: true,
			legend: {
				data: ['Gols', 'Nota']
			},
			xAxis: [{
				type: 'category',
				data: odata //['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			}],
			yAxis: [{
					type: 'value',
					name: 'Quantidade',
					axisLabel: {
						formatter: '{value}'
					}
				},
				{
					type: 'value',
					name: 'Temperature',
					axisLabel: {
						formatter: '{value} °C'
					}
				}
			],
			series: [

				{
					name: 'Gols',
					type: 'bar',
					data: oGols
				},
				{
					name: 'Nota',
					type: 'bar',
					data: oNota
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

	var globals = JSON.parse(localStorage.getItem('globals'));
	var oUser = globals.currentUser;
	
	AuthService.fetchJogosByUserId(oUser, fnCallback);

	$scope.gravarHorario = function (oJogo, sStatus) {
		jogoFactory.updateJogoPorData(oJogo, sStatus, function (oResp) {
			AuthService.fetchJogosByUserId(oUser, fnCallback)
		});
	}

	$scope.aprovarJogador = function (oJogo, sStatus) {
		oJogo.aprovadoPor = oUser.id;
		jogoFactory.aprovarJogador(oJogo, sStatus, function (oResp) {
			AuthService.fetchJogosByUserId(oUser, fnCallback)
		});
	}


};