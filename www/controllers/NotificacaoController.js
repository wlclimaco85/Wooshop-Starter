(function() {
  angular.module('wdApp.apps.notificacao', []).controller('NotificacaoController', 
  ['$scope', 'jogoFactory', 'AuthService', '$rootScope', '$location', '$http', '$interval', 'SysMgmtData', 'toastr', 'toastrConfig','$uibModal',
	function($scope, jogoFactory, AuthService, $rootScope, $location,   $http, $interval, SysMgmtData, toastr, toastrConfig,$uibModal) {
	debugger
	
    var vm = this;

    var globals = JSON.parse(localStorage.getItem('globals'));
    var oUser = globals.currentUser;
    var oNotificacaoRequest = {userId : oUser.id,empresaId : 82,role : oUser.roles[0]};
    AuthService.fetchAllNotificacoes(oNotificacaoRequest, function (response) {
        vm.notificacoesList = response.result.notificacaoList;
        $scope.loading = false;
    });

    vm.lerNotificacao = function (oNotificacao) {
        $scope.loading = true;
        if(oNotificacao.status === 'NAOLIDO')
        {
            oNotificacao.status = 'LIDO'
            AuthService.updateNotificacoes(new qat.model.notificacao(oNotificacao, oUser.roles[0]), function (response) {
                AuthService.fetchAllNotificacoes(oNotificacaoRequest, function (responses) {
                    vm.notificacoesList = responses.notificacaoList;
                    $scope.loading = false;
            });
        });
        }
    }

    vm.deleteNotificacao = function (oNotificacao) {
        $scope.loading = true;
            AuthService.deleteNotificacoes(new qat.model.notificacao(oNotificacao, oUser.roles[0]), function (response) {
                AuthService.fetchAllNotificacoes(oNotificacaoRequest, function (responsess) {
                    vm.notificacoesList = responsess.notificacaoList;
                    $scope.loading = false;
            });
        });
    }
    
  ]);
}).call(this);
