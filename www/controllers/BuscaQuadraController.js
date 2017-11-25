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

    vm.jogo = function(oJogo)
    {
        this.id = oJogo.id ;
        this.userId = oJogo.userId ;
        this.nome = oJogo.nome ;
        this.descricao = oJogo.descricao ;
        this.user = oJogo.user ;
        this.aceitaExterno = oJogo.aceitaExterno ;
        this.confirmacao = oJogo.confirmacao ;
        this.quadraId = oJogo.quadraId ;
        this.horaInicial = oJogo.horaInicial ;
        this.horaFinal = oJogo.horaFinal ;
        this.dia = oJogo.dia ;
        this.status = oJogo.status ;

    }

    console.log(localStorage.getItem('empresa'))
    $scope.gravarHorario = function(jogo)
    {

        jogo.status = "CONFIRMAR"
        jogo.userId = 3;
        AuthService.marcarJogo(new vm.jogo(jogo),function(res){ console.log(res)})
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
