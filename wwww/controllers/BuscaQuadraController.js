/**
 * Created by Y.Kamesh on 4/13/2015.
 */

angular.module('App.Admin')
    .controller('BuscaQuadraController', ['$scope', '$rootScope', '$location', 'AuthService','$http','$interval', BuscaQuadraController])
function BuscaQuadraController($scope, $rootScope, $location, AuthService,localStorageService,toastr, $http, $interval) {
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
        console.log($rootScope.globals.currentUser);
        oUser = $rootScope.globals.currentUser
        jogo.status = "CONFIRMAR"
        jogo.usersJogo = [oUser];
        AuthService.marcarJogo(new qat.model.jogo(jogo),function(res){ console.log(res)})
    }

    $scope.orderByMe = function(x) {
        
        $scope.myOrderBy = x;
      }

      $scope.checkParentID = function(value, index) {
        
        return value.dia && ['DOMINGO','SEGUNDA'].indexOf(value.dia) !== -1;
      }

      $scope.myFilter = function (item) { 
        return 'DOMINGO'; 
    };
    
};