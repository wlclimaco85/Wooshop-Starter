/**
 * Created by Y.Kamesh on 4/13/2015.
 */

angular.module('App.Admin')
    .controller('BuscaQuadraController', ['$scope', '$rootScope', '$location', 'AuthService', BuscaQuadraController])
function BuscaQuadraController($scope, $rootScope, $location, AuthService,localStorageService,toastr) {
    var vm = this;

    localStorage.setItem('empresa',"TESTE")
    vm.teste = 'DOMINGO';
 //   vm.empresaList = [];
 //   $scope.empresaList =[]
    $scope.myOrderBy = {dia : 'DOMINGO'};
      //  AuthService.fetchAllEmpresa(vm.empresa, function (response) {
      //      debugger
     //       vm.empresaList = response;
      //      $scope.empresaList = response;
        //    if (resp && resp.code==200) {
           //     AuthService.createJWTToken(resp.result.user, resp.result.token);
            //    AuthService.setCredentials();
             //   $location.path('/app');
          //   $scope.quadras = 
         
    //    });

    console.log(localStorage.getItem('empresa'))
    $scope.gravarHorario = function(jogo)
    {
        debugger
        jogo.status = "CONFIRMAR"
        jogo.user = [{id:8}];
        AuthService.marcarJogo(jogo,function(res){ console.log(res)})
    }

    $scope.orderByMe = function(x) {
        debugger
        $scope.myOrderBy = x;
      }

      $scope.checkParentID = function(value, index) {
        debugger
        return value.dia && ['DOMINGO','SEGUNDA'].indexOf(value.dia) !== -1;
      }

      $scope.myFilter = function (item) { 
        return 'DOMINGO'; 
    };
};
