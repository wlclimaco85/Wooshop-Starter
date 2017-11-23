/**
 * Created by Y.Kamesh on 4/13/2015.
 */
(function () {
angular.module('App')
    .controller('BuscaQuadraController', ['$scope', '$rootScope', '$location', 'AuthService', BuscaQuadraController])
function BuscaQuadraController($scope, $rootScope, $location, AuthService) {
    var vm = this;

    vm.teste = 'DOMINGO';
    vm.empresaList = [];
    $scope.empresaList =[]
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
}());