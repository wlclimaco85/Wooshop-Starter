(function() {
'use strict';
angular.module('App.Admin', [])
	.factory('jogoFactory', ['$rootScope', '$http', 'toastr', 'toastrConfig', 'localStorageService','AuthService', function($rootScope, $http, toastr, toastrConfig,  localStorageService, AuthService){

		toastrConfig.closeButton = true;
	
		return{

			update : function(oJogo, status)
			{debugger
				var oUser = $rootScope.globals.currentUser;
				oJogo.status = status
				oJogo.user_id = oUser.id;
				AuthService.marcarJogo(new qat.model.jogo(oJogo),function(res)
				{ console.log(res)
					toastr.success('Jogo '+ status.toLowerCase() +' com sucesso!', 'Information');
				})
			}
		};
}]);

}).call(this);

