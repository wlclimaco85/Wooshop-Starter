/**
 * Created by Y.Kamesh on 4/13/2015.
 */

angular.module('App.Admin')
    .controller('HorarioController', ['$scope', '$rootScope', '$location', 'AuthService', HorarioController]).filter('filterStatus', function () {
        
           return function (input, price) {
         //      debuggerdebugger
               var output = [];
               var returns = [];
               $.each( $('#buscarStatus-container3 .badgebox'), function( key, value ) {
                // console.log( key + ": " + value );
               if($(this).is(":checked")){
                 console.log($(this).val());
                 output.push($(this).val())}
               })
               for(var x = 0 ; x < input.length;x++)
               {
                    if( $.inArray(input[x].status, output) !== -1 ){
                        returns.push(input[x]);
                    }
               }
          /*     
               returns.sort(function(a, b){
                   
                a = parseInt(a.dia);
                b = parseInt(b.dia);
                return a - b;
            });
*/ 

               return returns;
           }
       }).controller('MapDemoController', [
        '$scope', '$http', '$interval', function($scope, $http, $interval) {
          var i, markers;
          markers = [];
          i = 0;
          while (i < 8) {
            markers[i] = new google.maps.Marker({
              title: "Marker: " + i
            });
            i++;
          }
          $scope.GenerateMapMarkers = function() {
            var d, lat, lng, loc, numMarkers;
            d = new Date();
            $scope.date = d.toLocaleString();
            numMarkers = Math.floor(Math.random() * 4) + 4;
            i = 0;
            while (i < numMarkers) {
              lat = 40.7500000 + (Math.random() / 100);
              lng = -73.9800000 + (Math.random() / 100);
              loc = new google.maps.LatLng(lat, lng);
              markers[i].setPosition(loc);
              markers[i].setMap($scope.map);
              i++;
            }
          };
          $interval($scope.GenerateMapMarkers, 2000);
        }
      ])
function HorarioController($scope, $rootScope, $location, AuthService,localStorageService,toastr) {
    var vm = this;

    localStorage.setItem('empresa',"TESTE")
    vm.teste = 'DOMINGO';
    vm.horarioList = [];
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

    AuthService.fetchAllQuadraByEmpresa({id:1},function(res){ console.log(res);  vm.horarioList = res[0]});

    console.log(localStorage.getItem('empresa'))
    $scope.gravarHorario = function(jogo)
    {
     //   debugger
        jogo.status = "CONFIRMAR"
        jogo.userId = 3;
        AuthService.marcarJogo(new vm.jogo(jogo),function(res){ console.log(res)})
    }

    $scope.orderByMe = function(x) {
      //  debugger
        $scope.myOrderBy = x;
      }

      $scope.checkParentID = function(value, index) {
     //   debugger
        return value.dia && ['DOMINGO','SEGUNDA'].indexOf(value.dia) !== -1;
      }

      $scope.myFilter = function (item) { 
        return 'DOMINGO'; 
    };
};
