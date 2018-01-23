(function() {
'use strict';
angular.module('App.Admin', [])
	.factory('jogoFactory', ['$rootScope', '$http', 'toastr', 'toastrConfig', 'localStorageService','AuthService', function($rootScope, $http, toastr, toastrConfig,  localStorageService, AuthService){

		toastrConfig.closeButton = true;
	
		return{

			update : function(oJogo, status)
			{
				var oUser = $rootScope.globals.currentUser;
				oJogo.status = status
				oJogo.user_id = oUser.id;
				AuthService.marcarJogo(new qat.model.jogo(oJogo),function(res)
				{ console.log(res)
					toastr.success('Jogo '+ status.toLowerCase() +' com sucesso!', 'Information');
				})
			},
			updateJogoPorData : function(oJogo, status, fncallBack)
			{
				var oUser = $rootScope.globals.currentUser;
				oJogo.status = status
				oJogo.user_id = oUser.id;
				AuthService.marcarJogoPorData(new qat.model.jogoPorData(oJogo),function(res)
				{ console.log(res)
					toastr.success('Jogo '+ status.toLowerCase() +' com sucesso!', 'Information');
				//	fncallBack(res);
				})
			}
		};
}]);

}).call(this);

